import React , {useState} from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => { 

  const [pickupLocation, setPickupLocation] = useState("")
 
  const {pickupDate, setPickupDate,returnDate,setReturnDate,navigate}=useAppContext()
  const handleSearch=(e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation='+pickupLocation+'&pickupDate='+pickupDate+'&returnDate='+returnDate)
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light
    text-center'>
      <h1 className='text-4xl md:text-5xl font-semibold'>Luxuary Cars On Rent</h1>

      <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-1g md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[Opx_8px_20px_rgba(0,0,0,0.1)]'>

<div className='flex flex-col md:flex-row items-start md:items:center gap-10 min-md:ml-8'>

<div className='flex flex-col items-start gap-2'>

  <select required value={pickupLocation} onChange ={(e)=>setPickupLocation(e.target.value)} >
    <option value=" ">pickup Location</option>
    {cityList.map((city)=><option key={city} value={city}>{city}</option>)}
  </select>
 <p className='px-1 text-sm text-gray-500'>{pickupLocation? pickupLocation:'Please select location'}</p>

</div>
<div className='flex flex-col items-start gap-2'>
<label htmlFor="Pickup-date">Pick-up Date</label>
<input value = {pickupDate} onChange ={e=>setPickupDate(e.target.value)}type="date" id="Pickup-date" min ={new Date().toISOString().split('T')[0] }className='text-sm text-gray-500'  required/>
</div>
<div className='flex flex-col items-start gap-2'>
<label htmlFor="Return-date">Return Date</label>
<input value = {returnDate} onChange ={e=>setReturnDate(e.target.value)} type="date" id="Return-date" className='text-sm text-gray-500'  required/>
</div>


</div>

<button className='flex items-center justify-center gap-1 px-8 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'> 
  <img src={assets.search_icon} alt="Search"
  className='brightness-300' />
  Search
</button>
      </form>
      <img src={assets.main_car} alt="car" className='max-h-74' />
    </div>
  )
}

export default Hero
