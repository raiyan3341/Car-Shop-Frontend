import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
 // Assuming you will create these
import Footer from '../../components/Footer'; // Assuming you will create these
import { Toaster } from 'react-hot-toast'; // Toast/SweetAlert Requirement
import Navbar from '../../components/Navbar';

const Root = () => {
    const location = useLocation();

    useEffect(() => {
       
        window.scrollTo(0, 0); 
    }, [location.pathname]);
    // Condition to hide Navbar/Footer on 404/Error page (Requirement)
    const isErrorPage = location.pathname === "/404" || location.pathname.includes('error'); 

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            
            {/* Navbar and Footer are conditional */}
            {!isErrorPage && <Navbar />} 
            
            <main className="min-h-[calc(100vh-250px)]">
                <Outlet />
            </main>
            
            {!isErrorPage && <Footer />}
        </div>
    );
};

export default Root;