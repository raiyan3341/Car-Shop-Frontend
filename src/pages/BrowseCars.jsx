// BrowseCars.jsx (প্রতিটি কার্ডের জন্য আলাদা স্ক্রল অ্যানিমেশন)

import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import CarCard from '../components/CarCard';
import toast from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';
import AnimatedSection from '../components/AnimatedSection'; // ✅ ব্যবহৃত হবে

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
            <h1 className="text-3xl font-extrabold text-green-500 text-center mt-5 mb-20">Browse All Cars ({cars.length})</h1>
             
            {/* ✅ অ্যানিমেটেড সেকশনটি এখান থেকে সরানো হয়েছে */}
            
            {cars.length === 0 ? (
                <div className="text-center p-10 border rounded-xl bg-gray-50">
                    <p className="text-xl text-gray-600">No car listings are available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car, index) => ( // ✅ index ব্যবহার করা হয়েছে delay এর জন্য
                        <AnimatedSection key={car._id} delay={index * 0.1}> {/* ✅ প্রতিটি কার্ডকে র‍্যাপ করা হয়েছে */}
                            <CarCard car={car} />
                        </AnimatedSection>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseCars;