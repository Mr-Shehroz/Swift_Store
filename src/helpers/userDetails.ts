import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getLoggedInUser(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    let user = null;
    if (token) {
        try {
            user = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            console.error('Invalid token', error);
        }
    }
    return user;
}
