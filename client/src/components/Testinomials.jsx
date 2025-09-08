import React from 'react'
import Title from './Title'
import { assets } from "../assets/assets";

const Testimonials = () => {
  const [tooltip, setTooltip] = React.useState({ visible: false, x: 0, y: 0, text: '' });
  const cardRefs = React.useRef([]);

  const handleMouseMove = (e, index) => {
    const bounds = cardRefs.current[index].getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: testimonials[index].name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const testimonials = [
    {
      name: 'Prateek Pal',
      title: 'Gandu',
      image: assets.testimonial_image_1,
      testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: 'Vishesh',
      title: 'Bhavi Adhikari',
      image: assets.testimonial_image_2,
      testimonial: "Easy navigation, flexible rental options, and excellent customer service. The car was spotless and comfortable. Will definitely rent again!",
    },
    {
      name: 'Yash Pratap Singh',
      title: 'Lieutenent Colonel',
      image: assets.testimonial_image_3,
      testimonial: "Great experience! Instant confirmation, variety of vehicles, and reliable support. The app saved me time and stress during travel.",
    }
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title 
        title="What Our Customers Say" 
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world." 
      />

      {/* Container with flex or grid */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            className="relative border border-gray-200 rounded-lg overflow-hidden w-80 hover:shadow-lg transition-shadow duration-300"
          >
            {tooltip.visible && tooltip.text === testimonial.name && (
              <span 
                className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                style={{ top: tooltip.y + 8, left: tooltip.x + 8 }}
              >
                {tooltip.text}
              </span>
            )}

            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-gray-500">
                <h3 className="text-lg font-semibold text-gray-900">Very easy to integrate</h3>
                <p className="my-4 text-sm line-clamp-3">{testimonial.testimonial}</p>
              </div>
              <div className="flex items-center justify-center">
                <img className="rounded-full w-9 h-9"
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                />
                <div className="space-y-0.5 font-medium text-left ml-3">
                  <p>{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
