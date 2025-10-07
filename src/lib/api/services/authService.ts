import axiosInstance from "@/lib/api/config/axios";

export const authService = {
  login: (data: { email: string; password: string }) =>
    axiosInstance.post("Auth/login", data),

  logout: () => axiosInstance.post("Auth/logout"),
};
