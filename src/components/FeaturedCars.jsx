import React from 'react';
import CarCard from './CarCard';


const FeaturedCars = ({ cars, searchQuery }) => {
    return (
        <section>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
                {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Cars"}
            </h2>
            <p className="text-center text-gray-500 mb-10">
                {searchQuery ? `${cars.length} result(s) found.` : "Explore the 6 newest cars added to our fleet."}
            </p>

            {cars.length === 0 && !searchQuery ? (
                <p className='text-center text-lg text-gray-600'>No featured cars available right now.</p>
            ) : cars.length === 0 && searchQuery ? (
                <p className='text-center text-lg text-gray-600'>No cars matched your search criteria.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedCars;