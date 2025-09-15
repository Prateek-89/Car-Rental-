import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/Owner/Title';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const ManageCar = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [car, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/car');
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { CarId: carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?');
      if (!confirm) return;

      const { data } = await axios.post('/api/owner/delete-car', { CarId: carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title="Manage Cars"
        subtitle="View all listed cars, update their details, or remove them from the booking platform."
      />
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {car.map((carItem, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={carItem.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{carItem.brand} {carItem.model}</p>
                    <p className='text-xs text-gray-500'>{carItem.seating_capacity} {carItem.fuel_type}</p>
                  </div>
                </td>
                <td className='p-3 max-md:hidden'>{carItem.category}</td>
                <td className='p-3'>{currency}{carItem.pricePerDay}/day</td>
                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${carItem.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    {carItem.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className='flex items-center p-3'>
                  <img onClick={() => toggleAvailability(carItem._id)} src={carItem.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer' />
                  <img onClick={() => deleteCar(carItem._id)} src={assets.delete_icon} alt="" className='cursor-pointer ml-2' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCar;
