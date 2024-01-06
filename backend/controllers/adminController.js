import { AdminModel } from '../models/AdminModel';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expires in 24 hours
    });
};

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
