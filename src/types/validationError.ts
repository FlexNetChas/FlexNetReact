export type FluentValidationError = {
  type?: string;
  title: string;
  status: number;
  errors?: Record<string, string[]>;
  traceId?: string;
};

export type ProblemDetails = {
  title: string;
  detail: string;
  status: number;
};
