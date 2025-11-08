import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';
import { FaDollarSign, FaMapMarkerAlt, FaUser, FaEnvelope, FaCalendarCheck } from 'react-icons/fa';
import BookingConfirmationModal from '../components/BookingConfirmationModal'; // Will be created next

const CarDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // --- 1. Fetch Single Car Data ---
    useEffect(() => {
        setLoading(true);
        axiosSecure.get(`/cars/${id}`)
            .then(res => {
                setCar(res.data);
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
                toast.error("Failed to load car details. Car might not exist.");
                navigate('/browse');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, axiosSecure, navigate]);

    // --- 2. Handle Booking (Booking Management Challenge) ---
    const handleBookNow = () => {
        if (car.status !== 'Available') {
            return toast.error("This car is already booked and unavailable.");
        }
        
        // Prevent booking own car (Good UX practice)
        if (user.email === car.providerEmail) {
            return toast.error("You cannot book your own car listing.");
        }
        
        setIsModalOpen(true);
    };
    
    const confirmBooking = async () => {
        const bookingData = {
            carId: car._id,
            carName: car.carName,
            userEmail: user.email, // Logged in user's email
            userName: user.displayName, // Logged in user's name
            rentPrice: car.rentPrice,
            // You might add date range selection in a more complex version
        };
        
        try {
            const res = await axiosSecure.post('/book', bookingData);
            
            if (res.data.success) {
                toast.success('Booking Confirmed! Enjoy your ride.'); // Show confirmation toast (Requirement)
                setCar(prev => ({ ...prev, status: 'Booked' })); // Update UI status instantly
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Booking failed:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Booking failed due to an error.");
            setIsModalOpen(false);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }
    
    if (!car) return null; // Should be handled by navigation above

    const isAvailable = car.status === 'Available';
    const statusColor = isAvailable ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="relative h-96">
                    <img src={car.hostedImageURL} alt={car.carName} className="w-full h-full object-cover" />
                    
                    {/* Status Badge (Requirement) */}
                    <div className={`absolute top-4 right-4 px-4 py-2 text-lg font-bold text-white rounded-full shadow-lg ${statusColor}`}>
                        {car.status}
                    </div>
                </div>
                
                <div className="p-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{car.carName}</h1>
                    <div className="flex items-center space-x-6 mb-6 text-xl">
                        <span className="flex items-center text-primary font-bold">
                            <FaDollarSign className="mr-1" /> {car.rentPrice} / Day
                        </span>
                        <span className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-1" /> {car.location}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-8 leading-relaxed border-b pb-6">
                        {car.description}
                    </p>

                    {/* Provider Info */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Provider Information</h2>
                    <div className="space-y-2 mb-8">
                        <p className="flex items-center text-gray-600">
                            <FaUser className="mr-2 text-primary" /> 
                            <span className='font-semibold'>{car.providerName}</span>
                        </p>
                        <p className="flex items-center text-gray-600">
                            <FaEnvelope className="mr-2 text-primary" /> {car.providerEmail}
                        </p>
                    </div>
                    
                    {/* Booking Button */}
                    <div className="mt-8">
                        <button 
                            onClick={handleBookNow} 
                            className="btn btn-primary btn-lg w-full"
                            disabled={!isAvailable || user.email === car.providerEmail} // Disable if booked or if owner
                        >
                            <FaCalendarCheck className="text-xl mr-2" /> 
                            {car.status === 'Booked' ? 'Unavailable' : (user.email === car.providerEmail ? 'Your Listing' : 'Book Now')}
                        </button>
                        {!isAvailable && <p className='text-red-500 text-center mt-2'>This car is currently unavailable for booking.</p>}
                    </div>
                </div>
            </div>
            
            {/* Booking Confirmation Modal */}
            <BookingConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmBooking}
                car={car}
            />
        </div>
    );
};

export default CarDetails;