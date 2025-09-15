import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets.js';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';  // ✅ import toast

const Cars = () => {
  // Getting search params from URL
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickLocation');
  const returnDate = searchParams.get('returnDate');
  const pickupDate = searchParams.get('pickupDate');

  const { cars, axios, currency } = useAppContext();

  const [input, setInput] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  // Function to search car availability based on dates and location
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast('No cars available');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilteredCars(cars); // show all cars if no search filter
    }
  }, [isSearchData, cars]);

  // Apply text input filter
  const applyFilter = () => {
    if (!filteredCars || !Array.isArray(filteredCars)) return [];
    return filteredCars.filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="py-20 bg-light max-md:px-4 flex flex-col items-center">
        <Title
          title="Available Cars"
          subtitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="search" className="w-4.5 h-4.5 mr-2" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="filter" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {applyFilter().length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {applyFilter().map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
