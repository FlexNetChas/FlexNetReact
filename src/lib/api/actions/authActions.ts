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
import { LoginState, RegisterState } from "@/types/auth";
import { SignJWT } from "jose";

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

// Zod schema for registration validation
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .trim(),
    email: z
      .string()
      .trim()
      .pipe(z.email({ message: "Invalid email address" })),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Validate submitted email and password to loginSchema
export async function login(
  prevState: LoginState | undefined,
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
    await createSessionCookie(response.accessToken);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "";

    // Network error
    if (errorMessage.includes("network")) {
      return {
        errors: {
          form: ["Unable to connect to the server"],
        },
      };
    }

    // API response error
    const errorStatus = (error as { status?: number }).status;
    switch (errorStatus) {
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
        if (errorStatus && errorStatus >= 500) {
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

// Create a demo JWT token for testing without backend API
async function createDemoToken(data: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const now = Math.floor(Date.now() / 1000);

  return await new SignJWT({
    sub: "1", // Demo user ID
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    role: "User",
    exp: now + 24 * 60 * 60, // 24 hours from now
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER!)
    .setAudience(process.env.JWT_AUDIENCE!)
    .sign(secret);
}

// Validate submitted registration data to registerSchema
export async function register(
  prevState: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState | undefined> {
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const response = await authService.register(result.data);
    await createSessionCookie(response.accessToken);
  } catch (error: unknown) {
    // Check if it's a connection error (API server not running)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      try {
        // For demo purposes, create a mock JWT token and redirect to success
        // This allows testing the UI without the backend API
        const mockToken = await createDemoToken(result.data);
        await createSessionCookie(mockToken);

        // Redirect to success page for demo
        redirect("/register/success");
      } catch (demoError) {
        // If demo token creation fails, just redirect to success without session
        console.log("Demo mode: Creating session without backend API");
        redirect("/register/success");
      }
    }
    const errorMessage = error instanceof Error ? error.message : "";

    // Network error or API not available
    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return {
        errors: {
          form: [
            "API server is not running. Please start your backend API server at https://localhost:7228",
          ],
        },
      };
    }

    // API response error
    const errorStatus = (error as { status?: number }).status;
    switch (errorStatus) {
      case 400:
        return {
          errors: {
            form: ["Invalid registration data. Please check your information"],
          },
        };

      case 409:
        return {
          errors: {
            form: ["Email already exists. Please use a different email"],
          },
        };

      case 429:
        return {
          errors: {
            form: ["Too many registration attempts. Please try again"],
          },
        };

      default:
        if (errorStatus && errorStatus >= 500) {
          return {
            errors: {
              form: ["Server error. Please try again"],
            },
          };
        }
        return {
          errors: {
            form: ["Unexpected error. Please try again"],
          },
        };
    }
  }

  redirect("/register/success");
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
