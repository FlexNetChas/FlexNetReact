export type UserDescription = {
  id: number;
  age: number;
  gender: string | null;
  education: string;
  purpose: string;
};

export type PatchUserDescriptionRequest = {
  age?: number;
  gender?: string | null;
  education?: string;
  purpose?: string;
};

export type UserDescriptionState = {
  errors?: {
    age?: string[];
    gender?: string[];
    education?: string[];
    purpose?: string[];
    form?: string[];
  };
  success?: boolean;
};
