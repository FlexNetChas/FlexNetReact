import { z } from "zod";

// Zod validation follows same rules as backend validation for consistency. Always cross-check with backend validation
export const userDescriptionSchema = z.object({
  gender: z.string().max(20, "Gender cannot exceed 20 characters").optional(),
  education: z
    .string()
    .max(50, "Education cannot exceed 50 characters")
    .optional(),
  age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .min(0, "Age must be between 0 and 100")
      .max(100, "Age must be between 0 and 100")
      .optional(),
  ),
  purpose: z.string().max(50, "Purpose cannot exceed 50 characters").optional(),
});

export type UserDescriptionInput = z.infer<typeof userDescriptionSchema>;
