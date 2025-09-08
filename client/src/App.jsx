import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from '/Users/prateekkumar/Desktop/coding/car rental/client/src/components/login.jsx'

import Home from "./pages/Home.jsx";


import CarDetails from "./pages/CarDetails.jsx";
import Cars from "./pages/Cars.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Footer from "./components/footer.jsx";
import Layout from "./pages/Owner/Layout.jsx";
import Dashboard from "./pages/Owner/Dashboard.jsx";
import Addcar from "./pages/Owner/Addcar.jsx";
import ManageCar from "./pages/Owner/ManageCar.jsx";
import ManageBookings from "./pages/Owner/ManageBookings.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerpath = useLocation().pathname.startsWith("/owner");

  return (
    <>
    {showLogin &&  <Login setShowLogin={setShowLogin}/>}
     
      {!isOwnerpath && <Navbar setShowLogin={setShowLogin} />}

    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/car-details/:id" element={<CarDetails />} />
  <Route path="/cars" element={<Cars />} />
  <Route path="/my-bookings" element={<MyBookings />} />

  {/* Owner routes */}
  <Route path="/owner" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="add-car" element={<Addcar />} />
    <Route path="manage-cars" element={<ManageCar />} />
    <Route path="manage-bookings" element={<ManageBookings />} />
  </Route>
</Routes>

      {!isOwnerpath && <Footer/> }
    
    </>
  );
};

export default App;
