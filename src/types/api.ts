export interface BackendErrorResponse {
  errors?: Record<string, string[]>;
  detail?: string;
  title?: string;
}
