import { User } from "@/models/user";
import connectDB from "@/lib/dbconnect/dbconnect";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {
    await connectDB();
    const { username, email, password } = await request.json();
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response("User already exists", { status: 400, statusText: "Bad Request" });
        }
        const newUser = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;

         const savedUser = await newUser.save();
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        return new Response("User created successfully", { status: 201, statusText: "Created" });

    } catch (error) {
        console.error(error);
        return new Response("Error creating user", { status: 500, statusText: "Internal Server Error" });

    }
}