import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Footer Requirement: Logo, Contact Info, Terms, Social Media
    return (
        <footer className="bg-gray-800 text-white p-10 mt-10">
            <div className="container mx-auto">
                <div className="footer grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
                    {/* Logo and Website Name */}
                    <nav>
                        <header className="footer-title text-xl font-bold text-primary">
                            🚗 CarRentalsPro
                        </header>
                        <p className="text-gray-400 mt-2">
                            Your trusted partner for hassle-free car rentals.
                        </p>
                    </nav>

                    {/* Contact Info */}
                    <nav>
                        <header className="footer-title">Contact Info</header>
                        <p className="flex items-center text-gray-400">
                            <FaPhone className="mr-2 text-primary" /> +880 123 456789
                        </p>
                        <p className="flex items-center text-gray-400">
                            <FaEnvelope className="mr-2 text-primary" /> info@carrentalspro.com
                        </p>
                        <address className="text-gray-400 mt-2">
                            123, Car Lane, Dhaka, Bangladesh
                        </address>
                    </nav>

                    {/* Quick Links */}
                    <nav>
                        <header className="footer-title">Company</header>
                        <Link to="/" className="link link-hover">About Us</Link>
                        <Link to="/" className="link link-hover">Careers</Link>
                        <Link to="/" className="link link-hover">Terms & Conditions</Link>
                        <Link to="/" className="link link-hover">Privacy Policy</Link>
                    </nav>

                    {/* Social Media Links */}
                    <nav>
                        <header className="footer-title">Social Media</header>
                        <div className="grid grid-flow-col gap-4">
                            <a href="#" aria-label="Facebook" className="text-2xl hover:text-primary"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter" className="text-2xl hover:text-primary"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram" className="text-2xl hover:text-primary"><FaInstagram /></a>
                        </div>
                    </nav>
                </div>
                <div className="footer-center mt-8 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} CarRentalsPro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;