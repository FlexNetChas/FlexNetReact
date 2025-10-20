import { SessionUser } from "./user";

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
    email?: string[];
    password?: string[];
    form?: string[];
  };
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
