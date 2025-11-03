import { z } from "zod";

// Zod validation follows same rules as backend validation for consistency. Always cross-check with backend validation
export const loginSchema = z.object({
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
});

export type LoginInput = z.infer<typeof loginSchema>;
