"server-only";

import { cookies } from "next/headers";

export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = (await cookies()).get("session")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
