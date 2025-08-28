import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
    fogotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);