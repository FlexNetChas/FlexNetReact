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
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
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
