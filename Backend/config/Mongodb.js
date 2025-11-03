import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const mongodbURL = process.env.MONGODB_URI;
const databaseName = "institute";
const mongodb = async ()=>{
    try{
        await mongoose.connect(mongodbURL,{
            dbName: databaseName,
        })
        console.log('✅ MongoDB Connected Successfully')
    }catch (error){
        console.error("❌ MongoDB Connection Failed:", error.message)
        process.exit(1)
    }
};

export default mongodb;