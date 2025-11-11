"server-only";

import { cookies } from "next/headers";
import { SessionCookiePayload, JWTClaims } from "@/types/cookie";
// JavaScript Object Signing and Encryption (JOSE)
import { jwtVerify } from "jose";

// Encode HS256 secret key
const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const secret = new TextEncoder().encode(JWT_SECRET);

// Convert decrypted expiration time to a Date object
const getExpirationDate = (exp: number): Date => new Date(exp * 1000);

export async function createSessionCookie(accessToken: string) {
  const tokenPayload = await verifyToken(accessToken);
  if (!tokenPayload) {
    throw new Error("Invalid token");
  }

  const expiresAt = getExpirationDate(tokenPayload.exp);

  (await cookies()).set("session", accessToken, {
    httpOnly: true, // Cannot be accessed by JS on the client
    secure: true,
    expires: expiresAt,
    // For "lax" our backend needs to be on same domain. Ex: api.flexnet.com or api.flexnet.azurewebsites.net
    sameSite: "none",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
  (await cookies()).delete("refreshToken");
}

export async function getSession(): Promise<SessionCookiePayload | null> {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const verifiedTokenPayload = await verifyToken(cookie);
  if (!verifiedTokenPayload) return null;

  // Split the name into first and last names
  const splitName = verifiedTokenPayload.name.split(" ");
  const firstName = splitName[0] || "";
  const lastName = splitName.slice(1).join(" ") || "";

  return {
    user: {
      id: parseInt(verifiedTokenPayload.sub, 10),
      firstName,
      lastName,
      email: verifiedTokenPayload.email,
      role: verifiedTokenPayload.role,
    },
    expiresAt: getExpirationDate(verifiedTokenPayload.exp),
  };
}

export async function createRefreshCookie(refreshToken: string) {
  const expiresAt = new Date();

  // Check if we're in testing mode
  if (process.env.NEXT_PUBLIC_TESTING_MODE === "true") {
    const expiryMinutes = parseInt(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_MINUTES || "2"
    );
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
  } else {
    const expiryDays = parseInt(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS || "7"
    );
    expiresAt.setDate(expiresAt.getDate() + expiryDays);
  }

  (await cookies()).set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "none",
    path: "/",
  });
}

export async function getRefreshtoken(): Promise<string | null> {
  const cookie = (await cookies()).get("refreshToken")?.value;
  return cookie || null;
}

export async function verifyToken(
  accessToken: string
): Promise<JWTClaims | null> {
  try {
    // Verify the JWT token using the secret key with JOSE
    const { payload } = await jwtVerify(accessToken, secret, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });

    return payload as JWTClaims;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Helper function to check expiration of token

export function isTokenExpiringSoon(
  expiresAt: Date,
  bufferHours: number = 1
): boolean {
  const now = new Date();
  const bufferHs = bufferHours * 60 * 60 * 1000;
  const expirationWithBuffer = new Date(expiresAt.getTime() - bufferHs);

  return now >= expirationWithBuffer;
}
