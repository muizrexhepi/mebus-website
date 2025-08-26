import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, contactName } = body;

    await resend.emails.send({
      from: "GoBusly <noreply@yourcompany.com>",
      to: email,
      subject: "Application Received",
      html: `
        <h1>Thank you for your application, ${contactName}!</h1>
        <p>We have received your partner application for ${companyName}.</p>
        <p>We will review your information and get back to you soon.</p>
      `,
    });

    await resend.emails.send({
      from: "Partner Applications <noreply@yourcompany.com>",
      to: ["gobuslyinternal@gmail.com"],
      subject: "New Partner Application",
      html: `
        <h1>New Partner Application Received</h1>
        <p>Company: ${companyName}</p>
        <p>Contact: ${contactName}</p>
        <p>Email: ${email}</p>
        <p>Please review the application in the admin panel.</p>
      `,
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing application" },
      { status: 500 }
    );
  }
}
