import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/utils/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${backendUrl}/api/account/organization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error:", text);
      return new NextResponse(text, { status: response.status });
    }

    return new NextResponse(null, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to change organization" },
      { status: 500 }
    );
  }
}
