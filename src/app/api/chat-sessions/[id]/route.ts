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
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  console.log("FETCHING SESSION WITH ID:", id);
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch chat session" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const headers = await getAuthHeaders();
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_API_BASE_URL}/ChatSession/${id}`,
    {
      headers,
      method: "DELETE",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch chat session" },
      { status: response.status }
    );
  }
  return NextResponse.json({ response }, { status: response.status });
  const data = await response.json();
  return data;
}
