import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';

// Use a single component for both Add and Update operations
const AddCar = ({ isUpdate = false }) => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { id } = useParams(); // For update operation
    const navigate = useNavigate();
    
    const [carData, setCarData] = useState({
        carName: '',
        description: '',
        category: 'Sedan',
        rentPrice: '',
        location: '',
        hostedImageURL: '',
        providerName: user.displayName || '', // Read-only from Auth (Requirement)
        providerEmail: user.email || '', // Read-only from Auth (Requirement)
    });
    const [loading, setLoading] = useState(false);
    
    // Car Category Options (Dropdown Requirement)
    const categories = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric'];

    // --- Fetch Car Data for Update ---
    useEffect(() => {
        if (isUpdate && id) {
            setLoading(true);
            axiosSecure.get(`/cars/${id}`)
                .then(res => {
                    // Fill form with existing data
                    const fetchedCar = res.data;
                    setCarData({
                        carName: fetchedCar.carName,
                        description: fetchedCar.description,
                        category: fetchedCar.category,
                        rentPrice: fetchedCar.rentPrice,
                        location: fetchedCar.location,
                        hostedImageURL: fetchedCar.hostedImageURL,
                        providerName: fetchedCar.providerName,
                        providerEmail: fetchedCar.providerEmail,
                    });
                })
                .catch(error => {
                    console.error("Error fetching car for update:", error);
                    toast.error("Failed to load car data for update.");
                    navigate('/my-listings');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isUpdate, id, axiosSecure, navigate]);


    // --- Form Submission Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const finalData = { 
            ...carData, 
            rentPrice: parseFloat(carData.rentPrice) // Ensure price is a number
        };
        
        try {
            if (isUpdate) {
                // PATCH request for Update Car
                await axiosSecure.patch(`/cars/${id}`, finalData);
                toast.success('Car Listing Updated Successfully!');
                navigate('/my-listings');
            } else {
                // POST request for Add Car
                await axiosSecure.post('/cars', finalData);
                toast.success('Car Added Successfully!');
                e.target.reset(); // Clear form after successful submission
                setCarData(prev => ({...prev, carName: '', description: '', rentPrice: '', location: '', hostedImageURL: ''})) // Reset form state
            }
        } catch (error) {
            console.error(`${isUpdate ? 'Update' : 'Add'} failed:`, error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || `Failed to ${isUpdate ? 'update' : 'add'} car.`);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && isUpdate) { // Show loading only for update fetch
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }
    
    const pageTitle = isUpdate ? 'Update Car Listing' : 'Add New Car';

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">{pageTitle}</h1>
            
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
                
                {/* Provider Info (Read-only Requirement) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="label font-semibold text-gray-700">Provider Name (Read Only)</label>
                        <input type="text" value={carData.providerName} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="label font-semibold text-gray-700">Provider Email (Read Only)</label>
                        <input type="email" value={carData.providerEmail} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car Name */}
                    <div>
                        <label className="label font-semibold text-gray-700">Car Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g., Toyota Camry" 
                            required 
                            value={carData.carName}
                            onChange={(e) => setCarData({...carData, carName: e.target.value})}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="label font-semibold text-gray-700">Category</label>
                        <select 
                            required
                            value={carData.category}
                            onChange={(e) => setCarData({...carData, category: e.target.value})}
                            className="select select-bordered w-full"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    {/* Rent Price */}
                    <div>
                        <label className="label font-semibold text-gray-700">Rent Price (Per Day)</label>
                        <input 
                            type="number" 
                            placeholder="Enter price in Taka" 
                            required 
                            min="1"
                            value={carData.rentPrice}
                            onChange={(e) => setCarData({...carData, rentPrice: e.target.value})}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="label font-semibold text-gray-700">Location</label>
                        <input 
                            type="text" 
                            placeholder="City, Area" 
                            required 
                            value={carData.location}
                            onChange={(e) => setCarData({...carData, location: e.target.value})}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                
                {/* Hosted Image URL */}
                <div className="mt-6">
                    <label className="label font-semibold text-gray-700">Hosted Image URL</label>
                    <input 
                        type="url" 
                        placeholder="Image URL (from Unsplash/Google)" 
                        required 
                        value={carData.hostedImageURL}
                        onChange={(e) => setCarData({...carData, hostedImageURL: e.target.value})}
                        className="input input-bordered w-full"
                    />
                </div>
                
                {/* Description */}
                <div className="mt-6">
                    <label className="label font-semibold text-gray-700">Description</label>
                    <textarea 
                        placeholder="Provide a detailed description of the car..." 
                        required 
                        value={carData.description}
                        onChange={(e) => setCarData({...carData, description: e.target.value})}
                        className="textarea textarea-bordered w-full h-32"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-8" disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : (isUpdate ? 'Save Changes' : 'Add Car')}
                </button>
            </form>
        </div>
    );
};

export default AddCar;