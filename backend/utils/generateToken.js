// Imports the jsonwebtoken module, which is used to create, sign, and verify JWTs.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Generates a JWT token using the user ID and the JWT secret stored in the .env file.
const generateAccessToken = (userId) => {
  // The generateToken function takes in the response object and the user ID as arguments.
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
  
  // Returns the generated token.
  return accessToken;
};

const generateRefreshToken = (userId) => {
  try {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JTW_SECRET);
    return refreshToken;
    
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
}

export {generateAccessToken, generateRefreshToken}