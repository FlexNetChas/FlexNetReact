"server-only";

import {
  UserDescription,
  PatchUserDescriptionRequest,
} from "@/types/userDescription";

export const userDescriptionService = {
  get: async (userId: number): Promise<UserDescription> => {
    const response = await fetch(
      `${process.env.NEXT_API_BASE_URL}/UserDescription/user/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
