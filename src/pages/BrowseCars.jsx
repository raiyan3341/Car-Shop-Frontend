import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import CarCard from '../components/CarCard';
import toast from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';

const BrowseCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios();

    useEffect(() => {
        setLoading(true);
        // Fetch ALL cars from the public route (no limit)
        axiosSecure.get('/cars') 
            .then(res => {
                setCars(res.data);
            })
            .catch(error => {
                console.error("Error fetching all cars:", error);
                toast.error("Failed to load car listings.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Browse All Cars ({cars.length})</h1>

            {cars.length === 0 ? (
                <div className="text-center p-10 border rounded-xl bg-gray-50">
                    <p className="text-xl text-gray-600">No car listings are available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseCars;