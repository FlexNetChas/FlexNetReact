// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { chatService } from "@/lib/api/services/chatMessageService";

export async function POST(req: Request) {
  const { message, chatSessionId = null } = await req.json();

  try {
    const data = await chatService.sendMessage(message, chatSessionId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
