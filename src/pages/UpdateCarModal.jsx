import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';

const UpdateCarModal = ({ isOpen, onClose, car }) => {
    const axiosSecure = useAxios();
    const [formData, setFormData] = useState(car);
    const [loading, setLoading] = useState(false);
    
    // Reset form data when car prop changes
    useEffect(() => {
        if (car) {
            setFormData(car);
        }
    }, [car]);

    if (!isOpen || !car) return null;
    
    const categories = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const finalData = { 
            ...formData, 
            rentPrice: parseFloat(formData.rentPrice) // Ensure price is a number
        };
        
        try {
            // PATCH request to update
            const res = await axiosSecure.patch(`/cars/${car._id}`, finalData);
            
            if (res.data.matchedCount > 0) {
                toast.success('Car Updated Successfully!');
                // Close modal and pass updated data back to refresh MyListings UI
                onClose(finalData); 
            } else {
                 toast.error('Update failed. Not authorized or no changes made.');
            }
        } catch (error) {
            console.error("Update failed:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to update car.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[100]">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl mx-4 shadow-2xl shadow-green-600/90">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Update Car: {car.carName}</h2>
                <form onSubmit={handleUpdateSubmit}>
                    
                    {/* Editable Fields */}
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-3">
                        
                        {/* Car Name */}
                        <div>
                            <label className="label font-semibold">Car Name</label>
                            <input type="text" name="carName" required value={formData.carName} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        {/* Category */}
                        <div>
                            <label className="label font-semibold">Category</label>
                            <select name="category" required value={formData.category} onChange={handleChange} className="select select-bordered w-full">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        {/* Rent Price */}
                        <div>
                            <label className="label font-semibold">Rent Price (Per Day)</label>
                            <input type="number" name="rentPrice" required min="1" value={formData.rentPrice} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                         {/* Location */}
                        <div>
                            <label className="label font-semibold">Location</label>
                            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        {/* Hosted Image URL */}
                        <div>
                            <label className="label font-semibold">Hosted Image URL</label>
                            <input type="url" name="hostedImageURL" required value={formData.hostedImageURL} onChange={handleChange} className="input input-bordered w-full" />
                        </div>
                        {/* Description */}
                        <div>
                            <label className="label font-semibold">Description</label>
                            <textarea name="description" required value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full h-24"></textarea>
                        </div>
                        
                        {/* Non-Editable Fields */}
                        <div className="text-sm text-gray-500 pt-2 border-t mt-4">
                            <p>Provider: {car.providerName} ({car.providerEmail})</p>
                        </div>
                        
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={() => onClose(null)} className="btn btn-ghost">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCarModal;