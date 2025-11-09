// src/pages/MyBookings/MyBookings.jsx

import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { RiseLoader } from 'react-spinners';


const MyBookings = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxios();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Bookings
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axiosSecure.get('/my-bookings')
                .then(res => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching bookings:", err);
                    setLoading(false);
                    toast.error("Failed to load bookings.");
                });
        }
    }, [user, axiosSecure]);
    
    // --- NEW: Handle Cancellation Logic ---
    const handleCancelBooking = (bookingId, carName) => {
        Swal.fire({
            title: `Confirm Cancellation?`,
            text: `Do you want to cancel the booking for ${carName}? The car will become available immediately.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Call the new DELETE API route
                    const res = await axiosSecure.delete(`/booking/${bookingId}`); 

                    if (res.data.success) {
                        toast.success(`Booking for ${carName} has been cancelled. Car is now Available.`);
                        
                        // Remove the cancelled booking from the UI state
                        setBookings(prevBookings => prevBookings.filter(b => b._id !== bookingId));
                    }
                } catch (error) {
                    console.error("Cancellation failed:", error);
                    toast.error(error.response?.data?.message || "Cancellation failed due to an error.");
                }
            }
        });
    };
    // ------------------------------------

    if (loading || authLoading) {
        return (
            <div className='min-h-[calc(100vh-300px)] flex justify-center items-center'>
                <RiseLoader color="#10b981" />
            </div>
        );
    }
    
    if (bookings.length === 0) {
        return (
            <div className='min-h-[calc(100vh-300px)] flex justify-center items-center'>
                <p className='text-2xl font-semibold text-gray-600'>You have no active car bookings yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Helmet>
                <title>My Bookings - Car Rental</title>
            </Helmet>
            <h1 className="text-3xl font-extrabold text-green-500 text-center mb-10">
                My Booked Cars ({bookings.length})
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings.map(booking => (
                    <div key={booking._id} className="card bg-white shadow-2xl shadow-blue-600/90 border border-primary/10 transition duration-300 hover:shadow-xl">
                        <figure>
                            <img 
                                src={booking.carDetails?.hostedImageURL || 'https://via.placeholder.com/600x400?text=Car+Image'} 
                                alt={booking.carDetails?.carName || 'Booked Car'} 
                                className='h-52 w-full object-cover'
                            />
                        </figure>
                        <div className="card-body p-5">
                            <h2 className="card-title text-xl font-bold text-primary">
                                {booking.carDetails?.carName || booking.carName || 'Unknown Car'}
                                <div className="badge badge-error text-white font-medium">BOOKED</div>
                            </h2>
                            <p className='text-gray-600'>
                                <span className='font-semibold'>Location:</span> {booking.carDetails?.location || 'N/A'}
                            </p>
                            <p className='text-gray-600'>
                                <span className='font-semibold'>Price:</span> ৳{booking.carDetails?.rentPrice || 'N/A'} / day
                            </p>
                            <p className='text-gray-600 text-sm italic'>
                                Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                            
                            <div className="card-actions justify-end mt-4">
                                <button 
                                    onClick={() => handleCancelBooking(booking._id, booking.carDetails?.carName || 'This Car')} 
                                    className="btn btn-error btn-sm text-white hover:bg-red-700 transition duration-200"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default MyBookings;