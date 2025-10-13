import { JWTPayload } from "jose";
import { SessionUser } from "./user";

export type SessionCookiePayload = {
  user: SessionUser;
  expiresAt: Date;
};

// Extend JWTPayload to include custom claims
export type JWTClaims = JWTPayload & {
  sub: string;
  email: string;
  name: string;
  role: string;
  exp: number;
};
