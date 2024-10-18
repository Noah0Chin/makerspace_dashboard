import { NextRequest, NextResponse } from "next/server";

// Function to get organization printers using session
export async function getOrganizationPrinters(session: string) {
  const printerUrl =
    "https://cloud.3dprinteros.com/apiglobal/get_organization_printers_list";

  const response = await fetch(printerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      session: session,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch printers");
  }

  return data.message;
}

// GET request handler
export async function GET(request: NextRequest) {
  try {
    const session = request.headers.get("x-printer-session");
    if (!session) {
      throw new Error("Session is not provided");
    }

    const printers = await getOrganizationPrinters(session);
    return NextResponse.json(printers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
