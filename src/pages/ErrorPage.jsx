import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/animation_404.json'; // Assume another Lottie JSON file for 404

// NOTE: Please install lottie-react and place a suitable Lottie JSON file for 404 in src/assets/animation_404.json
// If Lottie is not used, you can use a simple image or CSS design.

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            
            <div className="mx-auto w-64 h-64 mb-6">
                {/* Lottie or Simple Image/SVG for 404 */}
                {/* <Lottie animationData={errorAnimation} loop={true} autoplay={true} /> */}
                <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
            </div>
            
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-red-500 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            
            <Link to="/" className="btn btn-primary btn-lg">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;