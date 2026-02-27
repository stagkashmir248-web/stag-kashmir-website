import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

// The specific email explicitly allowed to access the admin dashbord
const ADMIN_EMAIL = "stagkashmir248@gmail.com";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isLoginPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // 1. Allow NextAuth API routes to function normally
    if (isAuthRoute) {
        return null;
    }

    // 2. If trying to access the login page
    if (isLoginPage) {
        // If they are logged in AND they are the admin, send them to the dashboard
        if (isLoggedIn && req.auth?.user?.email === ADMIN_EMAIL) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        }
        // If they are logged in but NOT the admin, let them see the login page 
        // so they can see the "Access Denied" error message and have the option to return home.
        return null;
    }

    // 3. If trying to access the protected admin routes
    if (isAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }

        // Validate if the logged in user is actually the admin
        if (req.auth?.user?.email !== ADMIN_EMAIL) {
            return NextResponse.redirect(new URL('/login?error=AccessDenied', req.nextUrl));
        }
    }

    return null;
})

export const config = {
    // Matches all routes except api, static files, and Next.js internals
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
