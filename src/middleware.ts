import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  getSession,
  getRefreshtoken,
  isTokenExpiringSoon,
  createRefreshCookie,
  createSessionCookie,
} from "@/lib/api/session";
import { authService } from "./lib/api/services/authService";

async function attemptTokenRefresh(
  refreshToken: string,
  attempt: number = 1
): Promise<boolean> {
  try {
    console.log(`Refresh attempt ${attempt}/2`);
    const newTokens = await authService.refresh(refreshToken);

    await createSessionCookie(newTokens.accessToken);
    await createRefreshCookie(newTokens.refreshToken);

    console.log("token refreshed successfully");
    return true;
  } catch (error) {
    console.error(`Refresh attempt ${attempt} failed`);
    if (attempt < 2) {
      return attemptTokenRefresh(refreshToken, attempt + 1);
    }
    return false;
  }
}

// Middleware to protect all routes except publicRoutes
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = (await cookies()).get("session")?.value;

  const publicRoutes = ["/", "/login", "/register", "/testpage"];
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
      response.cookies.delete("refreshToken");

      if (isProtectedRoute) return response;
    }
  }

  if (cookie && isValidToken) {
    const session = await getSession();
    if (session && isTokenExpiringSoon(session.expiresAt, 1)) {
      console.log("Token expiring soon, attempting refresh...");
      const refreshToken = await getRefreshtoken();

      if (refreshToken) {
        const refreshed = await attemptTokenRefresh(refreshToken);
        if (!refreshed) {
          const response = NextResponse.redirect(
            new URL("/login", req.nextUrl)
          );
          response.cookies.delete("session");
          response.cookies.delete("refreshToken");
          return response;
        }
      }
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webm|hdr|glb|mp4)$).*)",
  ],
};
