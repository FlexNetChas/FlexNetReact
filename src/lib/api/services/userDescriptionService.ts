"server-only";

import {
  UserDescription,
  PatchUserDescriptionRequest,
} from "@/types/userDescription";
import { getAuthHeaders } from "../getAuthHeaders";

export const userDescriptionService = {
  get: async (userId: number): Promise<UserDescription> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/UserDescription/user/${userId}`,
      {
        method: "GET",
        headers: {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw body;
    }

    return body;
  },

  patch: async (
    userId: number,
    data: PatchUserDescriptionRequest
  ): Promise<UserDescription> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/UserDescription/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw body;
    }

    return body;
  },
};
