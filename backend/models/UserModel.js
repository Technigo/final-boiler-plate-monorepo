import mongoose from "mongoose";
import crypto from "crypto";

const { Schema } = mongoose;

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex')
    }
},
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model('user', userSchema)