import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { 
  addCar, 
  changeRoleToOwner, 
  deleteCar, 
  getDashboardData, 
  getOwnerCars, 
  toggleCarAvailable, 
  updateUserImage 
} from "../controllers/ownerController.js";

const ownerRouter = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, upload.single("image"), addCar);
ownerRouter.get("/car", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailable);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-image", protect, upload.single("image"), updateUserImage);

export default ownerRouter;
