import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Navigation Links (Requirement)
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/browse">Browse Cars</NavLink></li>
            {/* Private Routes are conditional only for display here, protection is via PrivateRoute component */}
            {user && (
                <>
                    <li><NavLink to="/add-car">Add Car</NavLink></li>
                    <li><NavLink to="/my-listings">My Listings</NavLink></li>
                    <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
                </>
            )}
        </>
    );
    
    // Handle Logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Successfully Logged Out!');
                setIsDropdownOpen(false); // Close dropdown after logout
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout Failed.');
            });
    };

    return (
        <header className="shadow-md bg-white sticky top-0 z-50">
            <div className="navbar container mx-auto px-4">
                {/* Mobile Menu / Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 gap-3.5 p-2 shadow-2xl shadow-blue-600/90 bg-base-100 rounded-box w-52 h-60">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl font-bold text-primary">
                        🚗 CarRentalsPro
                    </Link>
                </div>
                
                {/* Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                {/* Login / User Profile */}
                <div className="navbar-end">
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL || 'default_profile.png'} 
                                alt={user.displayName || 'User'}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary object-cover"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            />
                            {/* Dropdown Menu (Requirement) */}
                            {isDropdownOpen && (
                                <ul className="absolute right-0 mt-3 w-80 h-40 p-2 shadow-2xl shadow-blue-600/90 bg-base-100 rounded-box z-50 text-sm">
                                    <li className="p-2 font-bold">{user.displayName || 'User'}</li>
                                    <li className="p-2 text-gray-500 break-all">{user.email}</li>
                                    <div className="divider my-1"></div>
                                    <li><button onClick={handleLogout} className="btn btn-sm btn-block btn-ghost text-red-500">Log Out</button></li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login / Signup
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;