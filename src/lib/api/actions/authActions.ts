"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import {
  createSessionCookie,
  deleteSession,
  getSession,
} from "@/lib/api/session";
import { authService } from "@/lib/api/services/authService";
import { cache } from "react";
import { SessionUser } from "@/types/user";
import { LoginState } from "@/types/auth";

// Zod library validate user input (email and password). Reduce API calls, injection attacks etc
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "Invalid email address" })),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

// Validate submitted email and password to loginSchema
export async function login(
  prevState: any,
  formData: FormData
): Promise<LoginState | undefined> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const response = await authService.login(result.data);
    await createSessionCookie(response.token);
  } catch (error: any) {
    // Network error
    if (error.message?.includes("network")) {
      return {
        errors: {
          form: ["Unable to connect to the server"],
        },
      };
    }
    // API response error
    switch (error.status) {
      case 401:
        return {
          errors: {
            form: ["Invalid email or password"],
          },
        };

      case 429:
        return {
          errors: {
            form: ["Too many login attempts. Please try again"],
          },
        };

      default:
        if (error.status >= 500) {
          return {
            errors: {
              form: ["Server error. Please try again"],
            },
          };
        }
        return {
          errors: {
            form: ["Unexspected error. Please try"],
          },
        };
    }
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const session = await getSession();
  return session?.user ?? null;
});

export async function requireRole(role: string): Promise<SessionUser> {
  const session = await getSession();

  if (!session || session.user.role !== role) {
    redirect("/unauthorized");
  }

  return session.user;
}

export async function adminRoleAction() {
  await requireRole("Admin");
  console.log("User is admin");
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
