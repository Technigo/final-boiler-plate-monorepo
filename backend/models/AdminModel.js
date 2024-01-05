import mongoose from 'mongoose';
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

const adminSchema = new mongoose.Schema({
    username: {
        type: String, // Specifies that 'username' should be a string
        required: true, // Indicates that 'username' is a required field
        unique: true, // Ensures that 'username' values are unique
        minlength: 5, // Sets a minimum length of 2 characters for 'username'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: 'admin',
    },
    // Additional fields like 'permissions', 'lastLogin', 'isActive', etc. can be added
}, {
    timestamps: true,
});

export const AdminModel = mongoose.model('Admin', adminSchema);
