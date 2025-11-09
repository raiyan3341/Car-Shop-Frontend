import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    { quote: "The booking process was incredibly smooth, and the car was immaculate. Highly recommend CarRentalsPro!", name: "Aisha M.", car: "Luxury Sedan" },
    { quote: "Affordable pricing and excellent service. Pick-up and drop-off were hassle-free. Five stars!", name: "Karim H.", car: "Family SUV" },
    { quote: "Found the perfect electric car for my road trip. Their selection is fantastic and the support team is great.", name: "Nabil C.", car: "Electric Hatchback" },
];

const TestimonialCard = ({ quote, name, car }) => (
    <div className="p-8 transition transform hover:scale-110 duration-500 border border-primary/20 
             shadow-2xl shadow-green-500/60 hover:shadow-2xl hover:shadow-green-500/90 rounded-2xl">
        <FaQuoteLeft className="text-3xl text-primary mb-4" />
        <p className="italic text-gray-700 mb-4">"{quote}"</p>
        <div className="font-bold text-gray-800">{name}</div>
        <div className="text-sm text-gray-500">Rented: {car}</div>
    </div>
);

const Testimonials = () => {
    return (
        <section className="bg-white py-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-500 mb-12">
                What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, index) => (
                    <TestimonialCard key={index} {...t} />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;