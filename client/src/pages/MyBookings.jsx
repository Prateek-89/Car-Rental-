import React, { useEffect, useState } from 'react';
import { dummyMyBookingsData, assets } from '../assets/assets';
import Title from '../components/Title';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY || '$';

  const fetchBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto">
      <Title
        title="My Bookings"
        subtitle="View and manage all your car bookings"
        align="left"
      />

      <div className="mt-8 space-y-6">
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image and Info */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>
              <p className="text-gray-500">
                {booking.car.year} · {booking.car.category} · {booking.car.location}
              </p>
            </div>

            {/* Booking Details */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-light rounded">Booking #{index + 1}</p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed'
                      ? 'bg-green-400/15 text-green-600'
                      : 'bg-red-400/15 text-red-600'
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              {/* Rental Period */}
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.calendar_icon_colored}
                  alt="Calendar"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-gray-500">Rental Period</p>
                  <p>
                    {booking.pickupDate?.split('T')[0] ?? 'N/A'} To{' '}
                    {booking.returnDate?.split('T')[0] ?? 'N/A'}
                  </p>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex items-start gap-2 mt-3">
                <img src={assets.location_icon} alt="Location" className="w-4 h-4 mt-1" />
                <div>
                  <p className="text-gray-500">Pickup Location</p>
                  <p>{booking.car.location ?? 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-1 flex flex-col justify-start items-end space-y-2">
              <p className="text-sm text-gray-500">Total Price</p>
              <h1 className="text-2xl font-semibold text-primary">
                {currency}{booking.price ?? '0'}
              </h1>
              <p>Booked On {booking.createdAt?.split('T')[0] ?? 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
