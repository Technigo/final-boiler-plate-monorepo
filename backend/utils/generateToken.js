// Imports the jsonwebtoken module, which is used to create, sign, and verify JWTs.
import jwt from "jsonwebtoken";

// Generates a JWT token using the user ID and the JWT secret stored in the .env file.
export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Sets the token to expire in 1 hour and user has to login again.
    expiresIn: "1h",
  });
//   // Sets the token as an HTTP-Only cookie.
//   res.cookie("jwt", token, {
//     // Sets the cookie to be accessible only by the web server.
//     httpOnly: true,
//     // Sets the cookie to be accessible only via HTTPS.
//     secure: process.env.NODE_ENV != "development",
//     // Sets the cookie to be accessible only on the same site.
//     sameSite: "strict",
//     // Sets the cookie to expire in 30 days.
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   });

  // Returns the generated token.
  return token;
};
