import React from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const CarCard = ({ car }) => {
    const { _id, carName, rentPrice, category, providerName, hostedImageURL, location, status } = car;
    const isAvailable = status === 'Available';
    const statusColor = isAvailable ? 'bg-green-500' : 'bg-red-500';
    const statusText = isAvailable ? 'Available' : 'Booked';

    return (
        <div className="card w-full bg-base-100 transition transform hover:scale-112 duration-500 border border-primary/20 
             shadow-2xl shadow-blue-600/60 hover:shadow-2xl hover:shadow-blue-600/100">
            <figure className="relative h-60">
                <img src={hostedImageURL} alt={carName} className="object-cover w-full h-full" />
                <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white rounded-full ${statusColor}`}>
                    {statusText}
                </div>
            </figure>
            
            <div className="card-body p-4">
                <h2 className="card-title text-xl font-bold mb-2">{carName}</h2>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaMapMarkerAlt className="mr-2 text-primary" /> {location || 'N/A'}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FaUser className="mr-2 text-primary" /> Provided by {providerName}
                </div>

                <div className="flex justify-between items-center border-t pt-3">
                    <p className="text-2xl font-extrabold text-primary flex items-center">
                        <FaDollarSign className="text-xl mr-1" />{rentPrice} 
                        <span className="text-sm font-normal text-gray-500">/day</span>
                    </p>
                    <Link to={`/car/${_id}`} className="btn btn-sm btn-primary"> View Details</Link>
                </div>
            </div>
        </div>
        
    );
};

export default CarCard;