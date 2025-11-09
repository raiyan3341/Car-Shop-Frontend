// Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Will be created next
import FeaturedCars from '../components/FeaturedCars';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import useAxios from '../hooks/useAxios';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection'; // ✅ ইম্পোর্ট করা আছে

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
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
            <AnimatedSection>
            {/* Hero Section টিকে সাধারণত অ্যানিমেট করার দরকার হয় না, কারণ এটি প্রথমে স্ক্রিনে থাকে */}
            <Hero setSearchQuery={setSearchQuery} /> 
            </AnimatedSection>
            <div className="container mx-auto px-4 py-12 space-y-20">
                
                {/* 2. Featured Cars Section */}
                {/* এটি প্রথম অ্যানিমেটেড সেকশন, তাই delay 0.1s */}
                <AnimatedSection delay={0.1}> 
                    <FeaturedCars cars={cars} loading={loading} searchQuery={searchQuery} />
                </AnimatedSection>

                {/* ✅ Show More বাটন: এটিকেও একটি অ্যানিমেশন সেকশনের মধ্যে রাখুন */}
                {!searchQuery && (
                    <AnimatedSection delay={0.2}>
                        <div className="text-center mt-12">
                            <Link 
                                to="/browse" // আপনার Browse Cars পেজের রুট
                                className="btn btn-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition duration-300"
                            >
                                Show More Cars
                            </Link>
                        </div>
                    </AnimatedSection>
                )}
                
                {/* 3. Why Rent With Us section (static) */}
                <AnimatedSection delay={0.3}>
                    <WhyUs />
                </AnimatedSection>
                
                {/* 4. Extra Sections (2) */}
                <AnimatedSection delay={0.4}>
                    <Testimonials />
                </AnimatedSection>
                {/* Example of another section (e.g., Top Rated) */}
                {/* <TopRatedCars /> */} 
                
            </div>
        </div>
    );
};

export default Home;