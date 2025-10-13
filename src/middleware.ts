import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/api/session";

// Middleware to protect all routes except publicRoutes
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = (await cookies()).get("session")?.value;

  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = !isPublicRoute;

  // Validate jwt token if cookie exists
  let isValidToken = false;
  if (cookie) {
    const tokenPayload = await verifyToken(cookie);
    isValidToken = tokenPayload !== null;

    // Remove invalid cookie/token and redirect to login if on protected route
    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));
      response.cookies.delete("session");

      if (isProtectedRoute) return response;
    }
  }

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && cookie && isValidToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

/**
 * Exclude static files from middleware to avoid causing "Unexpected token '<'" errors.
 * See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
