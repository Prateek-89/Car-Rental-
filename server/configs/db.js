import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Set up connection event handlers BEFORE connecting
        mongoose.connection.on('connected', () => console.log("✅ Database Connected"));
        mongoose.connection.on('error', (err) => console.error("❌ Database connection error:", err));
        mongoose.connection.on('disconnected', () => console.log("⚠️ Database disconnected"));

        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        // Connection options to handle timeouts and improve reliability
        const connectionOptions = {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            connectTimeoutMS: 30000, // 30 seconds connection timeout
            maxPoolSize: 10, // Maximum number of connections
            retryWrites: true,
            w: 'majority'
        };

        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const fullURI = `${mongoURI}/car-rental`;
        
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(fullURI, connectionOptions);
        console.log("✅ Successfully connected to MongoDB");
        
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        console.error("Full error:", error);
        // Exit process if database connection fails
        process.exit(1);
    }
};

export default connectDB;