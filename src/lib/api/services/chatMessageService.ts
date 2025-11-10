import { getAuthHeaders } from "@/lib/api/getAuthHeaders";

const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export const chatService = {
  sendMessage: async (
    message: string,
    chatSessionId: string | null
  ): Promise<any> => {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/Counsellor/message`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, chatSessionId }),
      cache: "no-store",
    });

    const body = await response.json();

    if (!response.ok) {
      throw body;
    }

    return body;
  },
};
