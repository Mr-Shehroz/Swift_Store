import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/', '/login', '/signup'];

    if (!token && !isPublicPath.includes(path)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (token && isPublicPath.includes(path)) {
        return NextResponse.redirect(new URL('/my-account', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/my-account',
    '/login',
    '/signup',
  ],
}