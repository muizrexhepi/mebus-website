import  WelcomeEmail  from '@/components/email-subscribe-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_NAME = 'Busly'; 

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await resend.emails.send({
      from: `${COMPANY_NAME} <onboarding@portal.insylink.com>`,
      to: email,
      subject: `Welcome to ${COMPANY_NAME}'s Newsletter!`,
      react: WelcomeEmail(),
    });

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Error subscribing' }, { status: 500 });
  }
}