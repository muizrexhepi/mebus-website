import ContactReplyTemplate from "@/components/contact-reply-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY! || "");

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY environment variable" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get subject display text for emails
    const getSubjectText = (subjectKey: string) => {
      const subjects = {
        booking: "Booking Inquiry",
        refund: "Refund Request",
        complaint: "Complaint",
        feedback: "Feedback",
        other: "Other",
      };
      return subjects[subjectKey as keyof typeof subjects] || subjectKey;
    };

    const subjectText = getSubjectText(subject);

    try {
      // Send automatic reply to user
      const userEmailResponse = await resend.emails.send({
        from: "GoBusly Support <support@gobusly.com>",
        to: email,
        subject: `We Received Your Message - GoBusly Support`,
        react: ContactReplyTemplate({
          name: firstName || name,
          email,
          message,
          subject: subjectText,
        }),
      });

      console.log("User email sent:", userEmailResponse);
    } catch (emailError) {
      console.error("Error sending user email:", emailError);
      // Continue with internal notification even if user email fails
    }

    try {
      // Send notification to internal team
      const supportNotification = await resend.emails.send({
        from: "GoBusly Contact Form <contact@gobusly.com>",
        to: "gobuslyinternal@gmail.com",
        subject: `New Contact Form: ${subjectText}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #FF4B6E; padding-bottom: 10px;">
              New Contact Form Submission
            </h1>
            
            <div style="background-color: #FFF5F6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF4B6E;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF4B6E;">${email}</a></p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subjectText}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #fff; border-left: 4px solid #FF4B6E; padding: 15px; border-radius: 4px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
              <p>This message was sent from the GoBusly contact form.</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

      console.log("Internal notification sent:", supportNotification);
    } catch (notificationError) {
      console.error("Error sending internal notification:", notificationError);
      // Don't fail the request if internal notification fails
    }

    return NextResponse.json(
      {
        message:
          "Thank you for contacting us! We've received your message and will get back to you within 24 hours.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        error:
          "Sorry, there was an error processing your message. Please try again or contact us directly at support@gobusly.com",
      },
      { status: 500 }
    );
  }
}
