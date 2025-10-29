"server-only";

import { CompactChatSessionResponseDto } from "@/types/chatSession";
import { getAuthHeaders } from "../getAuthHeaders";
const API_BASE_URL = process.env.NEXT_API_BASE_URL;

export const chatSessionSerice = {
  getAllSessionsCompact: async (): Promise<CompactChatSessionResponseDto[]> => {
    try {
      const path: string = `${API_BASE_URL}/ChatSession`;
      console.log("This is the path being used in service: " + path);

      const response = await fetch(`https://localhost:7228/api/ChatSession`, {
        method: "GET",
        headers: await getAuthHeaders(),
        cache: "no-store",
        credentials: "include",
      });

      //   if (!response.ok) {
      //     const error = new Error("Failed to fetch chat sessions.") as Error & {
      //       status: number;
      //     };
      //     error.status = response.status;
      //     console.log(response);
      //     throw error;
      //   }
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response URL:", response.url);
      console.log("Response ok:", response.ok);
      console.log(response);
      return await response.json();
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      throw error;
    }
  },
};
