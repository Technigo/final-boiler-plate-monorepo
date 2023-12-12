
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
  
    const conn = await mongoose.connect(process.env.MONGO_URL , { useNewUrlParser: true,
      useUnifiedTopology: true,});

    
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
   
    console.log(error);

    process.exit(1);
  }
};


