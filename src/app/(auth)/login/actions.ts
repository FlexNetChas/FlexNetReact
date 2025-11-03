"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createRefreshCookie, createSessionCookie } from "@/lib/api/session";
import { authService } from "@/lib/api/services/authService";
import { LoginState } from "@/types/auth";
import { loginSchema } from "@/lib/validations/loginValidators";
import { extractBackendErrors } from "@/lib/api/errors";

export async function login(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState | undefined> {
  /* Validate client input in frontend before sending a API request to backend. This will reduce API calls */
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  /* If client validation surpasses zod schema. Proceed to login.
   * Backend will validate again, both i application and infrastructure layer */
  try {
    const response = await authService.login(result.data);

    await createSessionCookie(response.accessToken);
    await createRefreshCookie(response.refreshToken);
  } catch (backendBody: unknown) {
    // If backend returns an error code/message. Pass the error Title and Message to frontend
    const errorMessages = extractBackendErrors(backendBody);
    return { errors: { form: errorMessages } };
  }

  redirect("/dashboard");
}
