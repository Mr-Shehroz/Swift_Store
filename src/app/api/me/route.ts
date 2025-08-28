import { NextRequest } from 'next/server';
import { getLoggedInUser } from '@/helpers/userDetails';

export async function GET(request: NextRequest) {
  try {
    // Example: get user from cookie or JWT
    const user = getLoggedInUser(request); // ← implement this
    if (!user) {
      return new Response(JSON.stringify({ user: null }), { status: 401 });
    }
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ user: null }), { status: 500 });
  }
}