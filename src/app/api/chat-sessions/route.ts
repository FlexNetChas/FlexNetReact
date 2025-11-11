import { NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/api/getAuthHeaders";
import {
  CompleteChatSessionResponseDto,
  CreateChatSessionRequestDto,
  UpdateChatSessionsRequestDto,
} from "@/types/chatSession";

export async function GET() {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ChatSession`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch chat sessions" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const newSession: CreateChatSessionRequestDto = await request.json();
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ChatSession`,
    {
      method: "POST",
      headers,
      cache: "no-store",
      body: JSON.stringify(newSession),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const newSession: UpdateChatSessionsRequestDto = await request.json();
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ChatSession`,
    {
      method: "PATCH",
      headers,
      cache: "no-store",
      body: JSON.stringify(newSession),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
