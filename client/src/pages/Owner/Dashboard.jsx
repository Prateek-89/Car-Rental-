import React, { useEffect, useState } from 'react'
import { dummyDashboardData, assets } from '../../assets/assets'
import Title from '../../components/Owner/Title.jsx'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    ComplatedBookings: 0,
    pendingBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  useEffect(() => {
    setData(dummyDashboardData)
  }, [])

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pendings", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.ComplatedBookings, icon: assets.listIconColored }
  ]

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Dashboard Cards */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>  
              <p className='text-lg font-semibold'>{card.value}</p>  
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
              <img src={card.icon} alt={card.title} className='w-4 h-4' />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Monthly Revenue */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Recent Bookings */}
        <div className='flex-1 p-4 md:p-6 border border-borderColor rounded-md md:max-w-1/2' >
          <h2 className='text-lg font-medium mb-2'>Recent Bookings</h2>
          <p className='text-gray-500 mb-4'>Latest Customer Bookings</p>

          {data.recentBookings.length === 0 && (
            <p className='text-gray-400'>No recent bookings</p>
          )}

          {data.recentBookings.map((booking, index) => (
            <div key={index} className='mt-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                  <img src={assets.listIconColored} alt="" className='h-5 w-5' />
                </div>
                <div>
                  <p>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>
              <div className='flex items-center gap-2 font-medium'>
                <p className='text-sm text-gray-500'>{currency}{booking.price}</p>
                <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className='p-4 md:p-6 mb-18 border border-borderColor rounded-md w-full md:max-w-1/4' >
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
