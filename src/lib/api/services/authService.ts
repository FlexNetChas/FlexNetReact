"server-only";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshResponse,
} from "@/types/auth";
import { getAuthHeaders } from "../getAuthHeaders";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type DeleteUserResponse = {
  message: string;
};

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
      credentials: "include",
    });

    const body = await response.json();

    if (!response.ok) {
      throw body;
    }

    return body;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const body = await response.json();

    if (!response.ok) {
      throw body;
    }

    return body;
  },

  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await fetch(`${API_BASE_URL}/Auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = new Error("Refresh token invalid or expired") as Error & {
        status: number;
      };
      error.status = response.status;
      throw error;
    }
    const responseBody = await response.text();
    return JSON.parse(responseBody);
  },

  deleteUser: async (userId: number): Promise<DeleteUserResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/user/${userId}`,
      {
        method: "DELETE",
        headers: {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },
};
