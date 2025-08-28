import { NextResponse } from "next/server";
import connectDB from "@/lib/dbconnect/dbconnect";
import { User } from "@/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB()

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const user = await User.findOne({ email })

        if (!user) {
            return new Response("User not found", { status: 400, statusText: "Bad Request" });
        }
        const validpassword = await bcryptjs.compare(password, user.password)

        if (!validpassword) {
            return new Response("Invalid password", { status: 400, statusText: "Bad Request" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

        response.cookies.set("token", token, { httpOnly: true });
        return response;


    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500, statusText: "Internal Server Error" });
    }
}