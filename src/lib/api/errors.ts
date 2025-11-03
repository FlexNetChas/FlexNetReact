import { BackendErrorResponse } from "@/types/api";

export function extractBackendErrors(error: unknown): string[] {
  const messages: string[] = [];
  const fallback = ["Unknown error occurred"];

  if (typeof error !== "object" || error === null) return fallback;

  const responseError = error as BackendErrorResponse;

  /* Get backend exceptions or fluent validation error messages from api response body. Always display detail.
   * If multiple errors, display all. Fallback to Title if no detail provided
   * This will ensure that we always pass correct error message without dublicated code between BE -> FE */
  if (responseError.errors) {
    for (const key in responseError.errors)
      messages.push(...responseError.errors[key]);
  } else if (responseError.detail) {
    messages.push(responseError.detail);
  } else if (responseError.title) {
    messages.push(responseError.title);
  } else {
    return fallback;
  }

  return messages;
}
