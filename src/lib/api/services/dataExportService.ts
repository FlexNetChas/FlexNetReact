"server-only";

import { getAuthHeaders } from "../getAuthHeaders";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userDataExportService = {
  /**
   * GDPR Article 20 - Right to Data Portability
   * Downloads all user data as JSON file
   */
  exportUserData: async (): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/UserData/export`, {
      method: "GET",
      headers: {
        ...(await getAuthHeaders()),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    // Return blob for file download
    return await response.blob();
  },
};
