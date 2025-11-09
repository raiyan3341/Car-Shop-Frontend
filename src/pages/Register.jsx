import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const { createUser, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        return null;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photoURL = form.get('photoURL');
        const password = form.get('password');

        const validationError = validatePassword(password);
        if (validationError) {
            return toast.error(validationError);
        }

        createUser(email, password, name, photoURL)
            .then(() => {
                toast.success('Registration Successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Google Registration Successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl shadow-blue-600/90">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"> Create your account</h2>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <input
                            name="name"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Full Name"/>
                        <input
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Email address"/>
                        <input
                            name="photoURL"
                            type="url"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Photo URL (Optional)"/>
                        <input
                            name="password"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Password (Min 6 chars, Upper, Lower)"/>
                    </div>
                    
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Register
                    </button>
                </form>

                <div className="flex items-center justify-between">
                    <span className="w-full border-b dark:border-gray-600"></span>
                    <span className="px-3 text-xs uppercase dark:text-gray-400">Or</span>
                    <span className="w-full border-b dark:border-gray-600"></span>
                </div>
                
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
                </button>

                <div className="text-sm text-center">Already have an account? 
                    <Link to="/login" className="font-medium text-primary hover:text-primary-dark ml-1">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;