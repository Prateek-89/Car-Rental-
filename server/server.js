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

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

const ensureDatabaseConnection = async () => {
  await connectDB();
};

const handler = async (req, res) => {
  await ensureDatabaseConnection();
  return app(req, res);
};

export default handler;

const isServerless = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";

if (!isServerless && !isProduction) {
  const PORT = process.env.PORT || 3000;
  ensureDatabaseConnection()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
      process.exit(1);
    });
}
