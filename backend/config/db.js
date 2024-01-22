import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";

export const connectDB = asyncHandler(async () => {
    try {
        const conn = await mongoose.connect(
            process.env.ATLAS_URL
        )
        console.log(`Mongo DB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})