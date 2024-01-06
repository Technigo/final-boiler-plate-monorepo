// Imports the jsonwebtoken module, which is used to create, sign, and verify JWTs.
import jwt from "jsonwebtoken";

// Generates a JWT token using the user ID and the JWT secret stored in the .env file.
export const generateToken = (res, userId) => {
  // The generateToken function takes in the response object and the user ID as arguments.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Signs the JWT using the user ID and the JWT secret stored in the .env file.
    // The token expires in 1 hour. User will have to log in again after it expires.
    expiresIn: "1h",
  });

  // Set JWT as an HTTP-Only Cookie.
  res.cookie("jwt", token, {
    // The cookie is named "jwt". The value of the cookie is the generated token. The cookie is set with the following options: httpOnly, secure, sameSite, and maxAge.
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie. This is to prevent XSS attacks.
    secure: process.env.NODE_ENV !== "development", // If secure is set to true, the cookie will only be sent over HTTPS. If secure is set to false, the cookie will be sent over HTTP in development. This is to prevent the cookie from being sent over an unencrypted connection.
    sameSite: "strict", // The cookie is sent only to the same site as the request. This prevents the cookie from being sent when making cross-origin requests. This is to prevent CSRF attacks.
    maxAge: 3600000, // The cookie expires in 1 hour. User will have to log in again after it expires.
  });

  // Returns the generated token.
  return token;
};
