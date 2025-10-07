// Important!
// SSR: Use fetch in server components. Axios is not optimized for server components
// CSR: Use axios instance in client components

"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
  timeout: Number(process.env.NEXT_API_TIMEOUT!),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request
  .use
  // Todo: get access and session Bearer token and save as a cookie or to localStorage?
  ();

// Global error handeling and logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = error?.response?.status;
    let userMessage = "";
    // Handle HTTP response errors
    if (!error.response) {
      console.log("Network error: ", error.message || error);
      // Handle backend not reachable errors
      if (
        error.code === "ERR_NETWORK" ||
        error.code === "ERR_CONNECTION_REFUSED"
      ) {
        userMessage =
          "Unable to connect to server. Check your connection or firewall or try again later";
      } else if (error.code === "ECONNABORTED") {
        userMessage = "Request timeout. Please try again";
      } else {
        userMessage = "Unexpected error occurred. Please try again later";
      }
    } else {
      switch (apiError) {
        case 400:
          console.log("Bad Request: ", error.response.data);
          break;
        case 401:
        case 403:
          // Todo: If we have a login page with roles. Clear tokens and redirect to login when we have a 401 or 403 errors
          console.log("Unauthorized: ", error.response.data);
          break;
        case 404:
          console.log("Not Found: ", error.response.data);
          break;
        case 500:
        case 502:
          console.log("Server Error: ", error.response.data);
          userMessage = "Internal server error. Please try again later";
          break;
        default:
          console.log("Unexpected error: ", error.response.data);
          userMessage = `Unexpected error (${apiError})`;
      }
    }
    error.userMessage = userMessage || "Something went wrong";

    return Promise.reject(error);
  }
);

export default axiosInstance;
