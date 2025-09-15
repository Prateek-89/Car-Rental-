import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/login.jsx"; 

import Home from "./pages/Home.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import Cars from "./pages/Cars.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Footer from "./components/Footer.jsx";

import Layout from "./pages/Owner/Layout.jsx";
import Dashboard from "./pages/Owner/Dashboard.jsx";
import Addcar from "./pages/Owner/Addcar.jsx";
import ManageCar from "./pages/Owner/ManageCar.jsx";
import ManageBookings from "./pages/Owner/ManageBookings.jsx";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx"; 

const App = () => {
  const { showLogin } = useAppContext(); 
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      <Toaster />
      {showLogin && <Login />} 
      {!isOwnerPath && <Navbar />} 
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

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
