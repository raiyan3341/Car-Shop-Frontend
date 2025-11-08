import React, { useState, useEffect } from 'react';
 // Will be created next
import FeaturedCars from '../components/FeaturedCars'; // Will be created next
import WhyUs from '../components/WhyUs'; // Will be created next
import Testimonials from '../components/Testimonials'; // Will be created next
import useAxios from '../hooks/useAxios';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Hero from '../components/Hero';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search (Challenge)
    const axiosSecure = useAxios();

    // Fetch 6 newest cars (Featured Cars Requirement)
    useEffect(() => {
        setLoading(true);
        
        // Apply search query to the API call (Challenge)
        const fetchUrl = searchQuery ? `/cars?search=${searchQuery}` : '/cars?limit=6';
        
        axiosSecure.get(fetchUrl)
            .then(res => {
                setCars(res.data);
            })
            .catch(error => {
                console.error("Error fetching featured cars:", error);
                toast.error("Failed to load featured cars.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [axiosSecure, searchQuery]);
    
    // Loading Spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <div>
            <Hero setSearchQuery={setSearchQuery} /> {/* Pass search state to Hero (for input) */}
            
            <div className="container mx-auto px-4 py-12 space-y-20">
                {/* 2. Featured Cars Section */}
                <FeaturedCars cars={cars} loading={loading} searchQuery={searchQuery} />

                {/* 3. Why Rent With Us section (static) */}
                <WhyUs />
                
                {/* 4. Extra Sections (2) */}
                <Testimonials />
                {/* Example of another section (e.g., Top Rated) */}
                {/* <TopRatedCars /> */} 
                
            </div>
        </div>
    );
};

export default Home;