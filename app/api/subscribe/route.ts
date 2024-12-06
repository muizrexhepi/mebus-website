import WelcomeEmail from '@/components/email-subscribe-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Client, Databases, Query, ID } from 'node-appwrite';

const resend = new Resend(process.env.RESEND_API_KEY);

const COMPANY_NAME = 'GoBusly';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY)

const databases = new Databases(client);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const existingSubscribers = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_NEWSLETTER_SUBSCRIBERS_COLLECTION_ID!,
      [Query.equal('email', email)]
    );

    if (existingSubscribers.total > 0) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 400 });
    }

    const subscriber = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_NEWSLETTER_SUBSCRIBERS_COLLECTION_ID!,
      ID.unique(),
      { email }
    );
    console.log({subscriber})

    await resend.emails.send({
      from: `${COMPANY_NAME} <newsletter@gobusly.com>`,
      to: email,
      subject: `Welcome to ${COMPANY_NAME}'s Newsletter!`,
      react: WelcomeEmail(),
    });

    return NextResponse.json({ message: 'Subscribed successfully', subscriber }, { status: 200 });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Error subscribing' }, { status: 500 });
  }
}
