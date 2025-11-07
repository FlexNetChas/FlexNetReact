import { SessionUser } from "./user";
import type { FluentValidationError, ProblemDetails } from "./validationError";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
};

export type LoginState = {
  errors?: {
    form?: string[];
    email?: string[];
    password?: string[];
  };
  backend?: FluentValidationError | ProblemDetails;
  success?: boolean;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // Not needed in backend, only for frontend validation
  // confirmPassword: string;
};

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
};

export type RegisterState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    // Sense backend dosn't have a field for confirmPassword will confirmPassword be handle in frontend only.
    // Filtration of confirmPassword errors is handle by register actions.ts. Needed for zod validation
    confirmPassword?: string[];
    form?: string[];
  };
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshRequest = {
  refreshToken: string;
};
