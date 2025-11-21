import { getAuthHeaders } from "@/lib/api/getAuthHeaders";
import { ChatMessageResponseDto } from "@/types/chatMessage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const chatService = {
  sendMessage: async (
    message: string,
    chatSessionId: string | null,
  ): Promise<ChatMessageResponseDto> => {
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
  streamMessage: async (
    message: string,
    chatSessionId: string | null,
  ): Promise<Response> => {
    const headers = await getAuthHeaders();

    // Build URL with query params
    const url = new URL(`${API_BASE_URL}/Counsellor/message/stream`);
    url.searchParams.set("message", message);
    if (chatSessionId) {
      url.searchParams.set("chatSessionId", chatSessionId);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Stream failed: ${response.statusText}`);
    }

    return response; // Return raw response with SSE stream
  },
};
