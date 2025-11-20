import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// ✅ FIXED: Matches your .env file now
const mongodbURL = process.env.MONGO_URL; 

const mongodb = async () => {
    try {
        await mongoose.connect(mongodbURL, {
            // Removed explicit dbName so it uses the one in your connection string (instituteDB)
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default mongodb;