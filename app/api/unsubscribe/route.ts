import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, Query } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const subscribers = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!,
      [Query.equal('email', email)]
    );

    if (subscribers.total === 0) {
      return NextResponse.json(
        { error: 'Email not found in subscription list' },
        { status: 404 }
      );
    }

    // Delete the subscriber document
    await databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_COLLECTION_ID!,
      subscribers.documents[0].$id
    );

    return NextResponse.json(
      { message: 'Successfully unsubscribed from newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Error processing unsubscribe request' },
      { status: 500 }
    );
  }
}