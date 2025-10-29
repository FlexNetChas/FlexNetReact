import { NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/api/getAuthHeaders";

export async function GET() {
  const headers = await getAuthHeaders();

  const response = await fetch(`${process.env.NEXT_API_BASE_URL}/ChatSession`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch chat sessions" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
