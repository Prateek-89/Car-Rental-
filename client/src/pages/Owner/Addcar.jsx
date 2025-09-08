import React, { useEffect, useState } from 'react'
import Title from '../../components/Owner/Title'
import { assets } from '../../assets/assets'

const Addcar = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'

const [image,SetImage]= useState()
const [car,SetCar]=useState({
  brand :'',
  model :'',
  year :0,
  PricePerDay :0,
  Category :'',
  transmission :'',
  fuel_type :'',
  seating_capacity :'',
  location :'',
  descryption :'',
 
  
})
const onSubmitHandler = async (e)=>{
    e.preventDefault()}

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/> 

<form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500
text-sm mt-6 max-w-xl'>
{/* Car Image */}
<div className='flex items-center gap-2 w-full'>
  <label htmlFor="car-Image">
  <img src={image ? URL.createObjectURL(image):assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
  <input type = "file" id="car-Image" accept ="image/*" hidden onChange={e=>SetImage(e.target.files [0])}/>
  </label>
  <p className='text-sm text-gray-500'>Upload a picture of your car</p>
  </div>
{/* car brand and model */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <div className='flex flex-col w-full'>
    <label> Brand</label>
    <input type="text" placeholder="e•g• IBMW, Mercedes, Audi..." required className='px-3 py-2 mt-1 border border-borderColor rounded-d outline-none' value={car.brand} onChange={e=>SetCar({...car,brand:e.target.value})} />
     </div>
     <div className='flex flex-col w-full'>
    <label> Model</label>
    <input type="text" placeholder="e•g• X5,E-class , M4" required className='px-3 py-2 mt-1 border border-borderColor rounded-d outline-none' value={car.brand} onChange={e=>SetCar({...car,brand:e.target.value})} />
     </div>
  
</div>
{/* car,year, category,price */}

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
 <div className='flex flex-col w-full'>
    <label> Year</label>
    <input type="number" placeholder="e•g• 2025 " required className='px-3 py-2 mt-1 border border-borderColor rounded-d outline-none' value={car.year} onChange={e=>SetCar({...car,year:e.target.value})} />
     </div>
 <div className='flex flex-col w-full'>
    <label> Daily Price({currency})</label>
    <input type="number" placeholder="e•g• 100 " required className='px-3 py-2 mt-1 border porder-borderColor rounded-d outline-none' value={car.PricePerDay} onChange={e=>SetCar({...car,PricePerDay:                  e.target.value})} />
     </div>
 <div className='flex flex-col w-full'>
    <label> Category </label>
    <select onChange={e=>SetCar({... car, category: e. target.value})} value={car.Category} className='px-3 py-2 rift-1 border border-borderColor rounded-md outline-none' >
      <option value="">Select a category</option>
      <option value="Sedan">Sedan</option>
      <option value="SUV">SUV</option>
      <option value="Van">Van</option>
    </select>
     </div>

</div>
{/* car Transimmsion , Fuel Type, Seating Capacity */}
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
  
<div className='flex flex-col w-full'>
    <label> Tranmission </label>
    <select onChange={e=>SetCar({... car, category: e. target.value})} value={car.transmission} className='px-3 py-2 rift-1 border border-borderColor rounded-md outline-none' >
      <option value="">Select a transmission</option>
      <option value="Mannual">mannual</option>
      <option value="Automatic">Automatic</option>
      <option value="Semi-Automatic">Semi-Automatic</option>
    </select>
     </div>
<div className='flex flex-col w-full'>
    <label> Fuel Type </label>
    <select onChange={e=>SetCar({... car, category: e. target.value})} value={car.fuel_type} className='px-3 py-2 rift-1 border border-borderColor rounded-md outline-none' >
      <option value="">Select a Fuel Type</option>
      <option value="Petrol">Petrol</option>
      <option value="Diesel">Diesel</option>
      <option value="Diesel">Diesel</option>
      <option value="Gas">Gas</option>
      <option value="Hybrid">Hybrid</option>
    </select>
     </div>
  <div className='flex flex-col w-full'>
    <label> seating_capacity</label>
    <input type="number" placeholder="e•g• 4 " required className='px-3 py-2 mt-1 border border-borderColor rounded-d outline-none' value={car.seating_capacity} onChange={e=>SetCar({...car,seating_capacity:e.target.value})} />
     </div>
</div>
{/* Car Location */}

<div className='flex flex-col w-full'>
   <label> Location </label>
    <select onChange={e=>SetCar({... car,location: e. target.value})} value={car.location} className='px-3 py-2 rift-1 border border-borderColor rounded-md outline-none' >
      <option value="">Select a location</option>
      <option value="Chhibramau">Chhibramau</option>
      <option value="Jhansi">Jhansi</option>
      <option value="Kanpur">Kanpur</option>
      <option value="Lucknow">Lucknow</option>
      <option value="Prayagraj">Prayagraj</option>
    </select>
</div>
{/* Car Description */}
<div className='flex flex-col w-full'>
    <label> Description</label>
    <textarea rows={5} placeholder="e•g• A luxurious SUV with a spacious interior and a powerful engine" required className='px-3 py-2 mt-1 border porder-borderColor rounded-d outline-none' value={car.descryption} onChange={e=>SetCar({...car,descryption:e.target.value})}></textarea >
     </div>
     <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer' >
      <img src={assets.tick_icon} alt="" /> List Your Car
     </button>
</form>
    </div>
  )
}

export default Addcar
