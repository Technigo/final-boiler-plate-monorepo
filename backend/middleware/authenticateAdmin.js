import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/AdminModel'; // Replace with your Admin model path
import dotenv from 'dotenv';
dotenv.config();

export const authenticateAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await AdminModel.findById(decoded.id).select('-password'); // Assuming AdminModel is your model for admins

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Token is not valid' });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied: requires admin role' });
        }

        req.admin = admin;
        next();
    } catch (e) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

/*
//TECHNIGO CODE//
import { AdminModel } from '../models/AdminModel';

// Middleware to authenticate an admin based on the access token
export const authenticateAdmin = async (req, res, next) => {
    // Retrieve the access token from the request header
    const accessToken = req.header("Authorization");
    try {
        // Find an admin in the database using the provided access token
        const admin = await AdminModel.findOne({ accessToken: accessToken });
        if (admin) {
            // Check if the user has the 'admin' role
            if (admin.role === 'admin') {
                req.admin = admin; // Add the admin object to the request
                next(); // Admin is authenticated and has the 'admin' role, proceed to the next middleware
            } else {
                // Admin found but does not have 'admin' role
                res.status(403).json({ success: false, response: "Access denied: Admin role required" });
            }
        } else {
            // No admin found with the provided access token
            res.status(401).json({ success: false, response: "Please log in" });
        }
    } catch (e) {
        // Handle any errors during the authentication process
        res.status(500).json({ success: false, response: e.message });
    }
};
*/


