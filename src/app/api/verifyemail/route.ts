import connectDB from "@/lib/dbconnect/dbconnect";
import { User } from "@/models/user";
import { NextRequest } from "next/server";





connectDB()
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return new Response("Invalid or expired token", { status: 400, statusText: "Bad Request" });
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return new Response("Email verified successfully", { status: 200, statusText: "OK" });
        
        
        
    } catch (error) {
        console.error("Error verifying email:", error);
        return new Response("Internal Server Error", { status: 500, statusText: "Internal Server Error" });
        
    }
}