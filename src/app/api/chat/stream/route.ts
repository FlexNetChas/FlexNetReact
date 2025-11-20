import { NextResponse } from "next/server";
import { chatService } from "@/lib/api/services/chatMessageService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");
  const chatSessionId = searchParams.get("chatSessionId");

  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  try {
    const response = await chatService.streamMessage(message, chatSessionId);

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
