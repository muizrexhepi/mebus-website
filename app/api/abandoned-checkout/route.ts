import { type NextRequest, NextResponse } from "next/server";
import { saveAbandonedCheckout } from "@/lib/appwrite-abandoned-checkout";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await saveAbandonedCheckout(data);

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      console.error("❌ Failed to save abandoned checkout:", result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
