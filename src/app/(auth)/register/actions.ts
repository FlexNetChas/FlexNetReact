"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createRefreshCookie, createSessionCookie } from "@/lib/api/session";
import { authService } from "@/lib/api/services/authService";
import { RegisterState } from "@/types/auth";
import { registerSchema } from "@/lib/validations/registerValidators";
import { extractBackendErrors } from "@/lib/api/errors";

export async function register(
  prevState: RegisterState | undefined,
  formData: FormData,
): Promise<RegisterState | undefined> {
  const result = registerSchema.safeParse(Object.fromEntries(formData));

  /* Validate client input in frontend before sending a API request to backend. This will reduce API calls */
  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  /* If client validation surpasses zod schema. Proceed to login.
   * Backend will validate again, both i application and infrastructure layer */
  try {
    const dataToSend = {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      password: result.data.password,
    };

    const response = await authService.register(dataToSend);

    await createSessionCookie(response.accessToken);
    await createRefreshCookie(response.refreshToken);
  } catch (backendBody: unknown) {
    // If backend returns an error code/message. Pass the error Title and Message to frontend
    const errorMessages = extractBackendErrors(backendBody);
    return { errors: { form: errorMessages } };
  }

  redirect("/register/success");
}
