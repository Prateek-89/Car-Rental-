import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB immediately
connectDB();

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

// Render requires this:
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
