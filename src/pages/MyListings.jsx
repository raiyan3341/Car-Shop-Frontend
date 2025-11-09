import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'; // SweetAlert Requirement
import { ScaleLoader } from 'react-spinners';
import UpdateCarModal from '../pages/UpdateCarModal'; // Will be created next

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carToUpdate, setCarToUpdate] = useState(null);
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    // --- 1. Fetch My Listings ---
    const fetchListings = () => {
        setLoading(true);
        axiosSecure.get('/my-listings')
            .then(res => {
                setListings(res.data);
            })
            .catch(error => {
                console.error("Error fetching listings:", error);
                toast.error("Failed to load your listings.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchListings();
    }, [axiosSecure]);


    // --- 2. Delete Operation (Requirement: Confirmation, DB Removal, UI Update) ---
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cars/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your car listing has been deleted.',
                                'success'
                            );
                            // Instantly update UI (Requirement)
                            setListings(listings.filter(car => car._id !== id));
                        } else {
                            toast.error("Deletion failed. Not authorized or car not found.");
                        }
                    })
                    .catch(error => {
                        console.error("Delete failed:", error);
                        toast.error("Failed to delete the listing.");
                    });
            }
        });
    };
    
    // --- 3. Update Operation (Using Modal - Optional Requirement) ---
    const handleUpdate = (car) => {
        setCarToUpdate(car);
        setIsModalOpen(true);
    };
    
    // Function to close modal and potentially re-fetch data
    const closeModalAndRefresh = (updatedCar = null) => {
        setIsModalOpen(false);
        setCarToUpdate(null);
        
        if (updatedCar) {
            // Optimistically update UI
            setListings(listings.map(car => 
                car._id === updatedCar._id ? updatedCar : car
            ));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold text-green-500 text-center mb-10">My Car Listings</h1>

            {listings.length === 0 ? (
                <div className="text-center p-10 border rounded-xl bg-gray-50">
                    <p className="text-xl text-gray-600 mb-4">You have no cars listed yet.</p>
                    <button onClick={() => navigate('/add-car')} className="btn btn-primary">Add Your First Car</button>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl shadow-blue-600/60 rounded-lg">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th>Car Name</th>
                                <th>Category</th>
                                <th>Rent Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map(car => (
                                <tr key={car._id}>
                                    <td className="font-semibold">{car.carName}</td>
                                    <td>{car.category}</td>
                                    <td>৳{car.rentPrice}/day</td>
                                    <td>
                                        <span className={`badge ${car.status === 'Available' ? 'badge-success' : 'badge-error'} text-white`}>
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <button onClick={() => handleUpdate(car)} className="btn btn-sm btn-info text-white">
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(car._id)} className="btn btn-sm btn-error text-white">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Update Modal */}
            {carToUpdate && (
                <UpdateCarModal 
                    isOpen={isModalOpen} 
                    onClose={closeModalAndRefresh} 
                    car={carToUpdate}
                />
            )}
        </div>
    );
};

export default MyListings;