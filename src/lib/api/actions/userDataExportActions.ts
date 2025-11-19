"use server";

import { userDataExportService } from "@/lib/api/services/dataExportService";

export type ExportDataState = {
  errors?: {
    form?: string[];
  };
  success?: boolean;
};

export async function exportUserData(): Promise<{
  success: boolean;
  data?: Blob;
  error?: string;
}> {
  try {
    const blob = await userDataExportService.exportUserData();

    return {
      success: true,
      data: blob,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "";

    // Network error
    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return {
        success: false,
        error:
          "API server is not running. Please start your backend API server at https://localhost:7228",
      };
    }

    // API response error
    const errorStatus = (error as { status?: number }).status;
    switch (errorStatus) {
      case 404:
        return {
          success: false,
          error: "User data not found",
        };
      case 401:
        return {
          success: false,
          error: "Unauthorized. Please log in again",
        };
      case 429:
        return {
          success: false,
          error: "Too many requests. Please try again later",
        };
      default:
        if (errorStatus && errorStatus >= 500) {
          return { success: false, error: "Server error. Please try again" };
        }
        return { success: false, error: "Unexpected error. Please try again" };
    }
  }
}
