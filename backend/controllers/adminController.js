import { AdminModel } from '../models/AdminModel';
import { UserModel } from '../models/UserModel'; // For upgrading users to admin
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expires in 24 hours
    });
};

// Register Admin
export const registerAdminController = asyncHandler(async (req, res) => {
    const adminRole = req.admin.role;

    // Check if the role is 'admin'
    if (adminRole !== 'admin') {
        // If not an admin, return a 403 Forbidden response
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const { username, password, email } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        const existingAdmin = await AdminModel.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            res.status(400);
            throw new Error(`Admin with ${existingAdmin.username === username ? "username" : "email"} already exists`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newAdmin = new AdminModel({
            username,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        const token = generateToken(newAdmin._id);

        res.status(201).json({
            success: true,
            response: {
                username: newAdmin.username,
                email: newAdmin.email,
                id: newAdmin._id,
                token
            },
        });
    } catch (e) {
        res.status(500).json({ success: false, response: e.message });
    }
});

// Admin login
export const loginAdminController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            return res.status(401).json({ success: false, response: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, response: "Incorrect password" });
        }

        const token = generateToken(admin._id);

        res.status(200).json({
            success: true,
            response: {
                username: admin.username,
                id: admin._id,
                token,
                role: admin.role
            },
        });
    } catch (e) {
        res.status(500).json({ success: false, response: e.message });
    }
});

// List all users
export const listUsersController = asyncHandler(async (req, res) => {
    const adminRole = req.admin.role;

    // Check if the role is 'admin'
    if (adminRole !== 'admin') {
        // If not an admin, return a 403 Forbidden response
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    try {
        const users = await UserModel.find({}).select('-password'); // Excludes passwords from the result
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, response: error.message });
    }
});

// Upgrade a user to an admin
export const upgradeUserController = asyncHandler(async (req, res) => {
    const adminRole = req.admin.role;

    // Check if the role is 'admin'
    if (adminRole !== 'admin') {
        // If not an admin, return a 403 Forbidden response
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const { userId } = req.body; // Get user ID from the request body

    // Validate userId - Check if it's provided and a valid MongoDB ObjectId
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: 'Invalid or missing userId' });
    }

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.role = 'admin'; // Update the user's role to 'admin'
        await user.save();

        res.status(200).json({ success: true, message: "User upgraded to admin successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
