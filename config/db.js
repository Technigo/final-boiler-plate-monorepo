import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

// This asynchronous function connects to the MongoDB database. It uses the MONGO_URL (connection url) stored in the .env-file.
export const connectDB = async () => {
  try {

    // Description: Create a connection between the Node.js application and the MongoDB database.
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`Mongo DB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)

    // Exit the Node.js process. Send exit code 1 which indicates an error
    process.exit(1)
  }
}
