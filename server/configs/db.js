import mongoose from "mongoose";

let connectionPromise;
let listenersRegistered = false;

const registerConnectionListeners = () => {
    if (listenersRegistered) return;
    mongoose.connection.on("connected", () => console.log("✅ Database Connected"));
    mongoose.connection.on("error", (err) => console.error("❌ Database connection error:", err));
    mongoose.connection.on("disconnected", () => console.log("⚠️ Database disconnected"));
    listenersRegistered = true;
};

const connectDB = async () => {
    registerConnectionListeners();

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    const connectionOptions = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        maxPoolSize: 10,
        retryWrites: true,
        w: "majority",
    };

    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const fullURI = `${mongoURI}/car-rental`;

    console.log("🔄 Connecting to MongoDB...");

    connectionPromise = mongoose
        .connect(fullURI, connectionOptions)
        .then(() => {
            console.log("✅ Successfully connected to MongoDB");
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = null;
            console.error("❌ Database connection failed:", error.message);
            throw error;
        });

    return connectionPromise;
};

export default connectDB;