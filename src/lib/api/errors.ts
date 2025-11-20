import { BackendErrorResponse } from "@/types/api";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export class NetworkError extends Error {
  constructor(
    message: string = "Network connection failed. Please check your internet connection",
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

export class BackendUnavailableError extends Error {
  constructor(message: string = "The service is temporarily unavailable") {
    super(message);
    this.name = "BackendUnavailableError";
  }
}

export function extractBackendErrors(error: unknown): string[] {
  // Backend unavailable
  if (error instanceof BackendUnavailableError) {
    return [error.message];
  }

  // Network errors
  if (error instanceof NetworkError) {
    return [error.message];
  }

  // API errors with detailed validation messages
  if (error instanceof ApiError) {
    if (error.errors) {
      const messages: string[] = [];
      for (const key in error.errors) {
        messages.push(...error.errors[key]);
      }
      return messages;
    }
    return [error.message];
  }

  // Handle fetch failures
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return ["Server is temporarily unavailable. Please try again in a moment"];
  }

  const messages: string[] = [];
  const fallback = ["An unexpected error occurred. Please try again"];

  if (typeof error !== "object" || error === null) return fallback;

  const responseError = error as BackendErrorResponse;

  /* Get backend exceptions or fluent validation error messages from api response body. Always display detail.
   * If multiple errors, display all. Fallback to Title if no detail provided
   * This will ensure that we always pass correct error message without dublicated code between BE -> FE */
  if (responseError.errors) {
    for (const key in responseError.errors) {
      messages.push(...responseError.errors[key]);
    }
  } else if (responseError.detail) {
    messages.push(responseError.detail);
  } else if (responseError.title) {
    messages.push(responseError.title);
  } else {
    return fallback;
  }

  return messages;
}
