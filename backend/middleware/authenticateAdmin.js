import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/AdminModel';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await AdminModel.findById(decoded.id).select('-password');

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

