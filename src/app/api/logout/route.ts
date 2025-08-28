import connectDB from "@/lib/dbconnect/dbconnect";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500, statusText: "Internal Server Error" });

    }
}