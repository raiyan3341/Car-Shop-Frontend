import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar';

const Root = () => {
    const location = useLocation();

    useEffect(() => {   
        window.scrollTo(0, 0); 
    }, [location.pathname]);
    const isErrorPage = location.pathname === "/404" || location.pathname.includes('error'); 

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            {!isErrorPage && <Navbar />} 
            
            <main className="min-h-[calc(100vh-250px)]">
                <Outlet />
            </main>
            {!isErrorPage && <Footer />}
        </div>
    );
};

export default Root;