import User from "../models/user.js";
import Car from "../models/car.js";
import ImageKit from "imagekit";
import booking from "../models/booking.js";
import fs from "fs";

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.status(200).json({ success: true, message: "You are now an owner. You can list cars." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!req.file) return res.status(400).json({ success: false, message: "Car image is required." });
    if (!req.body.carData) return res.status(400).json({ success: false, message: "Car data is required." });

    const carData = JSON.parse(req.body.carData);

    // Convert types
    carData.year = Number(carData.year);
    carData.seating_capacity = Number(carData.seating_capacity);
    carData.pricePerDay = Number(carData.pricePerDay);
    carData.isAvailable = carData.isAvailable !== undefined ? Boolean(carData.isAvailable) : true;

    if (isNaN(carData.year) || isNaN(carData.seating_capacity) || isNaN(carData.pricePerDay)) {
      return res.status(400).json({ success: false, message: "year, seating_capacity, and pricePerDay must be numbers" });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/car",
    });

    const optimizedImageURL = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [{ width: "1280" }, { quality: "auto" }, { format: "webp" }],
    });

    await Car.create({
      ...carData,
      owner: _id,
      image: optimizedImageURL,
    });

    res.status(201).json({ success: true, message: "Car added successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Car Availability
export const toggleCarAvailable = async (req, res) => {
  try {
    const { _id } = req.user;
    const { CarId } = req.body;
    const car = await Car.findById(CarId);

    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.status(200).json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { CarId } = req.body;
    const car = await Car.findById(CarId);

    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Car.findByIdAndDelete(CarId);

    res.status(200).json({ success: true, message: "Car removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });

    const bookings = await booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });

    const pendingBookings = bookings.filter((b) => b.status === "pending");
    const completedBookings = bookings.filter((b) => b.status === "confirmed");

    const monthlyRevenue = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((acc, b) => acc + b.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!req.file) return res.status(400).json({ success: false, message: "Image is required." });

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // use buffer if multer is in memory storage
      fileName: req.file.originalname,
      folder: "/users",
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [{ width: "400" }, { quality: "auto" }, { format: "webp" }],
    });

    await User.findByIdAndUpdate(_id, { image: optimizedImageUrl });

    res.status(200).json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
