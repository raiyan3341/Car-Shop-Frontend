import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCars from '../components/FeaturedCars';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import useAxios from '../hooks/useAxios';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxios();

    useEffect(() => {
        setLoading(true);
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
            <Hero setSearchQuery={setSearchQuery} /> 
            </AnimatedSection>
            <div className="container mx-auto px-4 py-12 space-y-20">
                
                <AnimatedSection delay={0.1}> 
                    <FeaturedCars cars={cars} loading={loading} searchQuery={searchQuery} />
                </AnimatedSection>
                {!searchQuery && (
                    <AnimatedSection delay={0.2}>
                        <div className="text-center mt-12">
                            <Link to="/browse" className="btn btn-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition duration-300">Show More Cars</Link>
                        </div>
                    </AnimatedSection>
                )}
                <AnimatedSection delay={0.3}>
                    <WhyUs />
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                    <Testimonials />
                </AnimatedSection>
            </div>
        </div>
    );
};

export default Home;