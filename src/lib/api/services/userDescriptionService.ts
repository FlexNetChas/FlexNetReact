"server-only";

import {
  UserDescription,
  PatchUserDescriptionRequest,
} from "@/types/userDescription";
import { getAuthHeaders } from "../getAuthHeaders";

export const userDescriptionService = {
  get: async (userId: number): Promise<UserDescription> => {
    const response = await fetch(
      `${process.env.NEXT_API_BASE_URL}/UserDescription/user/${userId}`,
      {
        method: "GET",
        headers: await getAuthHeaders(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user description: ${response.statusText}`
      );
    }

    return response.json();
  },

  patch: async (
    userId: number,
    data: PatchUserDescriptionRequest
  ): Promise<UserDescription> => {
    const response = await fetch(
      `${process.env.NEXT_API_BASE_URL}/UserDescription/user/${userId}`,
      {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update user description: ${response.statusText}`
      );
    }

    return response.json();
  },
};
