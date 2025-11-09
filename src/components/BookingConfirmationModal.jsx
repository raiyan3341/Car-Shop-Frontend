import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
 // Assume a Lottie JSON file is placed here
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

// NOTE: Please ensure you install lottie-react and place a suitable Lottie JSON file 
// (e.g., a checkmark or confirmation animation) in src/assets/animation_confirm.json
// npm install lottie-react

const BookingConfirmationModal = ({ isOpen, onClose, onConfirm, car }) => {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-[110] ">
            <div className="bg-white p-8 rounded-xl w-full max-w-md mx-4 shadow-2xl shadow-green-600/90 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Confirm Your Booking</h2>
                
                {/* Lottie Animation (Optional Requirement) */}
                {/* <div className="mx-auto w-32 h-32 mb-4">
                    <Lottie animationData={animationData} loop={false} autoplay={true} />
                </div> */}
                
                <h3 className='text-xl font-semibold mb-2'>{car.carName}</h3>
                <p className="flex justify-center items-center text-2xl font-extrabold text-primary mb-4">
                    <FaDollarSign className="text-xl mr-1" /> {car.rentPrice} 
                    <span className="text-base font-normal text-gray-500">/day</span>
                </p>
                <p className='flex justify-center items-center text-gray-500 mb-6'>
                    <FaMapMarkerAlt className="mr-1" /> {car.location}
                </p>

                <p className='text-md text-gray-700 mb-6'>
                    By clicking "Confirm Booking", you agree to rent this car.
                </p>
                
                <div className="flex justify-center space-x-4">
                    <button onClick={onClose} className="btn btn-ghost">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="btn btn-success text-white">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationModal;