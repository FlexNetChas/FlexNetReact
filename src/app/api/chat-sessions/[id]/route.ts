import { NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/api/getAuthHeaders";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const headers = await getAuthHeaders();
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_API_BASE_URL}/ChatSession/${id}`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch chat session" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
