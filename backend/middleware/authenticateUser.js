
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Token is not valid' });
    }

    if (user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'Access denied: requires user role' });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};


// SUMMARY

//In this code, we have a function called authenticateUser that is used as middleware in a Node.js application. This middleware is responsible for checking the authorization header of an incoming request, searching for a user with the provided access token in the database using the UserModel, and adding the user object to the request if found. If no user is found or if there are any errors during the process, appropriate responses are sent back to the client. In summary, this code is handling user authentication by checking the access token in the request header and verifying it against the database to grant access to protected routes or endpoints.
