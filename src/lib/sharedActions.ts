"use server";

import { cache } from "react";
import { redirect } from "next/navigation";
import { deleteSession, getSession } from "@/lib/api/session";
import { SessionUser } from "@/types/user";

/* This file contains server-side actions that could be shared cross different server components/pages
 * Specific actions related to certain pages/components should be placed in their respective action files */

/* Logout user by deleting session/refreshToken cookies and redirect to index/home */
export async function logout() {
  await deleteSession();
  redirect("/");
}

/* Get the current authenticated user from session cookie
 * Cache the result to optimize performance within the same request */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const session = await getSession();
  return session?.user ?? null;
});

/* Require user to have specific role. If not, redirect to unauthorized page */
export async function requireRole(role: string): Promise<SessionUser> {
  const session = await getSession();

  if (!session || session.user.role !== role) {
    redirect("/unauthorized");
  }

  return session.user;
}

// Not in use currently
export async function adminRoleAction() {
  await requireRole("Admin");
  console.log("User is admin");
}

// Require authentication for a page. Redirects to login if user is not authenticated
export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
