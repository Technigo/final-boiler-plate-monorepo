//Create an admin registration function, which is either protected by an existing admin token or performed manually through scripts or directly in the database. - HOW?

// Admin Registration Endpoint
import { AdminModel } from '../models/AdminModel';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expires in 24 hours
    });
};

export const registerAdminController = asyncHandler(async (req, res) => {
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
                token
            },
        });
    } catch (e) {
        res.status(500).json({ success: false, response: e.message });
    }
});
