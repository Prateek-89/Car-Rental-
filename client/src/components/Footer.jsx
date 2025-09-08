import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Browse Cars", "Offers & Deals", "About Us", "Contact Us"]
        },
        {
            title: "Customer Support",
            links: ["Rental Policies", "Return & Refunds", "Payment Options", "Track Booking", "FAQs"]
        },
        {
            title: "Connect With Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 text-sm text-gray-500">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="h-8 md:h-9" src={assets.logo} alt="logo" />
                    <p className="max-w-80 mt-3">
                        Drive in style with our premium car rental services. 
                        Choose from a wide range of luxury, SUV, and budget-friendly vehicles—perfect for business trips, vacations, or everyday rides.
                    </p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                © {new Date().getFullYear()} Car Rentals. All rights reserved.
            </p>
        </div>
    )
}

export default Footer
