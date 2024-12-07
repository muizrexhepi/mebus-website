import EmailTemplate from '@/components/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY! || "");

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  try {
    const body = await request.json();
    const { email, companyName, contactName } = body;

    const data = await resend.emails.send({
      from: 'GoBusly <noreply@gobusly.com>', 
      to: email,
      subject: 'Application Received',
      react: EmailTemplate({ companyName, contactName }),
    });

    const teamNotification = await resend.emails.send({
      from: 'Partner Applications <applications@gobusly.com>', 
      to: '007lazi@gmail.com', 
      subject: 'New Partner Application',
      react: EmailTemplate({ companyName, contactName }),
    });

    return NextResponse.json({ message: "Emails sent successfully", data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return NextResponse.json({ error: 'Error processing application' }, { status: 500 });
  }
}