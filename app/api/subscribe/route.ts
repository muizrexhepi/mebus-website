import WelcomeEmail from '@/components/email-subscribe-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Client, Databases, ID } from 'node-appwrite';

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_NAME = 'Busly';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); 

const databases = new Databases(client);



export async function POST(request: NextRequest) {
  console.log({collectionid:process.env.APPWRITE_COLLECTION_ID!,dbid:process.env.APPWRITE_DATABASE_ID!})
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subscriber = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!,
      ID.unique(),
      { email }
    );

    console.log({subscriber})

    await resend.emails.send({
      from: `${COMPANY_NAME} <newsletter@portal.insylink.com>`,
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