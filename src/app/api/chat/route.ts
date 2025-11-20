import { NextResponse } from "next/server";
import { chatService } from "@/lib/api/services/chatMessageService";

export async function POST(req: Request) {
  const { message, chatSessionId = null } = await req.json();

  try {
    const data = await chatService.sendMessage(message, chatSessionId);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
