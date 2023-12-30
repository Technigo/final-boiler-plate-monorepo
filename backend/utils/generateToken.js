// Imports the jsonwebtoken module, which is used to create, sign, and verify JWTs.
import jwt from "jsonwebtoken";

// Generates a JWT token using the user ID and the JWT secret stored in the .env file.
export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Sets the token to expire in 1 hour and user has to login again.
    expiresIn: "1h",
  });

  // Set JWT as an HTTP-Only Cookie.
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 3600000,
  });

  // Returns the generated token.
  return token;
};
