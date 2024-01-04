// Import the 'dotenv' library to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
};
