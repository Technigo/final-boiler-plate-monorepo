import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import asyncHandler from "./asyncHandler.js";

// USER AUTHENTICATION
const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the "jwt" cookie.
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

// ADMIN AUTHORIZATION
const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticateUser, authorizedAdmin };
