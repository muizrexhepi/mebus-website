import ContactReplyTemplate from '@/components/contact-reply-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY! || "");

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY environment variable" }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userEmailResponse = await resend.emails.send({
      from: 'GoBusly Support <support@gobusly.com>', 
      to: email,
      subject: 'We Received Your Message - GoBusly Support',
      react: ContactReplyTemplate({ name, email, message }),
    });

    const supportNotification = await resend.emails.send({
      from: 'GoBusly Contact Form <contact@gobusly.com>', 
      to: 'gobuslyinternal@gmail.com', 
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ 
      message: "Contact form submission processed successfully", 
    }, { status: 200 });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ 
      error: 'Error processing contact form submission' 
    }, { status: 500 });
  }
}