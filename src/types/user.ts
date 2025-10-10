export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
};

// Session = contains fields from JWT token
export type SessionUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
