import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaSearch } from 'react-icons/fa';
import slideImage1 from '../assets/1000_F_647492977_BqqDnIZdRjA3jLCWl8WPGO3Eb8B6HYy1.jpg'; 
import slideImage2 from '../assets/1000_F_650496188_zQs58xDQwXilm23Al5UVAwkiH6jG5z7L.jpg'; 
import slideImage3 from '../assets/1000_F_910998153_tOayMd30RZjpx2kzh9baGdcLBDXwMj00.jpg'; 

const slides = [
    {
        title: "Drive Your Dreams Today",
        subtitle: "Unbeatable deals on luxury cars.",
        image: slideImage1 
    },
    {
        title: "Easy Booking, Fast Pickup",
        subtitle: "Rent a car in just 3 minutes.",
        image: slideImage2
    },
    {
        title: "Trusted Providers, 24/7 Support",
        subtitle: "The safest way to travel.",
        image: slideImage3
    },
];

const Hero = ({ setSearchQuery }) => {
    
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchQuery(query);
    };

    return (
        <div className="carousel w-full h-[60vh] md:h-[80vh] relative">
            {slides.map((slide, index) => (
                <div id={`slide${index + 1}`} key={index} className="carousel-item relative w-full">
                    <img src={slide.image} className="w-full object-cover" alt={slide.title} /> 
                    <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-green-500 mb-4">
                            <Typewriter words={[slide.title]} loop={1} cursor  cursorStyle='|'  typeSpeed={70} deleteSpeed={50}
                                delaySpeed={1000}/>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">{slide.subtitle}</p>
                        {index === 0 && (
                            <form onSubmit={handleSearch} className="w-full max-w-lg flex shadow-2xl rounded-lg overflow-hidden">
                                <input 
                                    type="text" 
                                    name="search"
                                    placeholder="Search cars by name..." 
                                    className="p-4 w-full text-lg text-white border focus:bg-amber-50 focus:text-black"
                                    required
                                />
                                <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-4 flex items-center justify-center">
                                    <FaSearch className="text-2xl" />
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${index === 0 ? slides.length : index}`} className="btn btn-circle">❮</a> 
                        <a href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero;