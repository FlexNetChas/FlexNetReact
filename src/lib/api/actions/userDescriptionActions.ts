"use server";

import { z } from "zod";
import { userDescriptionService } from "@/lib/api/services/userDescriptionService";
import { cache } from "react";
import { UserDescription, UserDescriptionState } from "@/types/userDescription";

const userDescriptionSchema = z.object({
  age: z.coerce.number().optional(),
  gender: z.string().optional(),
  education: z.string().optional(),
  purpose: z.string().optional(),
});

export const getUserDescription = cache(
  async (userId: number): Promise<UserDescription | null> => {
    try {
      return await userDescriptionService.get(userId);
    } catch (error) {
      console.error("Failed to fetch user description:", error);
      return null;
    }
  }
);

export async function patchUserDescription(
  userId: number,
  prevState: UserDescriptionState | undefined,
  formData: FormData
): Promise<UserDescriptionState | undefined> {
  const formDataObject = Object.fromEntries(formData);
  const result = userDescriptionSchema.safeParse(formDataObject);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await userDescriptionService.patch(userId, result.data);
    return { success: true };
  } catch (error: unknown) {
    return {
      errors: {
        form: ["Kunde inte spara. Försök igen senare."],
      },
    };
  }
}
