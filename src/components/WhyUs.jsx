import React from 'react';
import { FaCalendarCheck, FaTags, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const WhyUsCard = ({ icon, title, description }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-primary">
        <div className="text-4xl text-primary mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </div>
);

const WhyUs = () => {
    const benefits = [
        { icon: <FaCalendarCheck />, title: "Easy Booking", description: "Book your favorite car seamlessly online in just a few clicks." },
        { icon: <FaTags />, title: "Affordable Rates", description: "We offer the most competitive and transparent pricing in the market." },
        { icon: <FaShieldAlt />, title: "Trusted Providers", description: "Only verified and reliable car providers are listed on our platform." },
        { icon: <FaHeadset />, title: "24/7 Support", description: "Our dedicated customer support team is always available to help you." },
    ];

    return (
        <section>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
                Why Rent With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                    <WhyUsCard key={index} {...benefit} />
                ))}
            </div>
        </section>
    );
};

export default WhyUs;