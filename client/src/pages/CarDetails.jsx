import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCarData, assets } from '../assets/assets';
import Loader from '../components/Loader';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const handleSubmit =async (e) => {
    e.preventDefault();}

  useEffect(() => {
    // Use _id (string) instead of id
    const foundCar = dummyCarData.find(car => car._id === id);
    setCar(foundCar);
  }, [id]);

  // Show loader while car is not found
  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="Arrow" className="rotate-180 opacity-65" />
        Back To All Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <div className="lg:col-span-2">
          <img
            src={car?.image} // fixed
            alt={`${car?.brand} ${car?.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">
            {/* Car Title */}
            <div>
              <h1 className="text-3xl font-bold">
                {car?.brand} {car?.model}
              </h1>
              <p className="text-gray-500 text-lg">{car?.category} · {car?.year}</p>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Car Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car?.seating_capacity} seats` },
                { icon: assets.fuel_icon, text: car?.fuel_type },
                { icon: assets.car_icon, text: car?.transmission },
                { icon: assets.location_icon, text: car?.location },
              ].map(({ icon, text }) => (
                <div key={text} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
                  <img src={icon} alt="" className="h-5 mb-2" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500">{car?.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-medium mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="Check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
<div>
  <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl shadow-md space-y-4">
    {/* Price */}
    <p className="text-lg font-bold text-gray-700">
      Price: ${car?.pricePerDay} / day
    </p>

    {/* Pickup Date */}
    <label className="block text-gray-600">Pickup Date</label>
    <input
      type="date"
      className="w-full p-2 border border-gray-300 rounded-lg"
    />

    {/* Return Date */}
    <label className="block text-gray-600">Return Date</label>
    <input
      type="date"
      className="w-full p-2 border border-gray-300 rounded-lg"
    />

    {/* Book Now button */}
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
      Book Now
    </button>

    {/* Message below the button */}
    <p className="text-sm text-gray-500 text-center mt-2">
      No credit card required to book this car
    </p>
  </form>
</div>

      </div>
    </div>
  );
};

export default CarDetails;
