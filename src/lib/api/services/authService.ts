"server-only";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      const error = new Error("Invalid email or password") as Error & {
        status: number;
      };
      error.status = response.status;
      throw error;
    }

    const responseBody = await response.text();
    return JSON.parse(responseBody);
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = new Error("Registration failed") as Error & {
        status: number;
      };
      error.status = response.status;
      throw error;
    }

    const responseBody = await response.text();
    return JSON.parse(responseBody);
  },
};
