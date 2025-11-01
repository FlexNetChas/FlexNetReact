import { z } from "zod";

// Zod validation follows same rules as backend validation for consistency. Always cross-check with backend validation
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(50, { message: "First name cannot exceed 50 characters" }),

    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name cannot exceed 50 characters" }),

    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .max(100, { message: "Email cannot exceed 100 characters" })
      .pipe(z.email({ message: "Email must be a valid email address" })),

    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).+$/, {
        message:
          "Password must contain at least one uppercase letter and one lowercase letter",
      }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
