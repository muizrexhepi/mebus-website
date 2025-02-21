import WelcomeEmail from "@/components/email-subscribe-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY! || "");
const COMPANY_NAME = "GoBusly";

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable" },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
      // Send welcome email
      const emailResult = await resend.emails.send({
        from: "GoBusly Newsletter <newsletter@gobusly.com>",
        to: email,
        subject: `Welcome to ${COMPANY_NAME}'s Newsletter!`,
        react: WelcomeEmail(),
      });

      console.log(
        "Newsletter subscription email sent successfully with ID:",
        emailResult.id
      );

      return NextResponse.json(
        { message: "Subscribed successfully", emailId: emailResult.id },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error("Newsletter email sending error:", emailError);
      return NextResponse.json(
        {
          error: "Error sending welcome email",
          details: emailError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Newsletter subscription request parsing error:", error);
    return NextResponse.json(
      {
        error: "Invalid subscription request",
        details: error.message,
      },
      { status: 400 }
    );
  }
}
