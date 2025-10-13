import { SessionUser } from "./user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: SessionUser;
};

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    form?: string[];
  };
};
