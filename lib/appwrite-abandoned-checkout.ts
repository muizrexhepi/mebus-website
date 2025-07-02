"use server";

import { Client, Databases, ID, Query } from "node-appwrite";

// Add validation for environment variables
const validateEnvVars = () => {
  const required = [
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    "NEXT_PUBLIC_APPWRITE_PROJECT",
    "NEXT_APPWRITE_KEY",
    "APPWRITE_DATABASE_ID",
    "NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing);
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("✅ All environment variables present:", {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    hasKey: !!process.env.NEXT_APPWRITE_KEY,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    collectionId:
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID,
  });
};

// Validate on module load
validateEnvVars();

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.NEXT_APPWRITE_KEY!);

const databases = new Databases(client);

export interface AbandonedCheckoutData {
  email: string;
  passengers: string; // JSON stringified
  outboundTicket: string; // JSON stringified
  returnTicket?: string; // JSON stringified
  selectedFlex: string;
  flexPrice: number;
  totalPrice: number;
  departureDate: string;
  returnDate?: string;
  fromCity: string;
  toCity: string;
  sessionId: string;
  createdAt: string;
  emailsSent: number;
  lastEmailSent?: string;
  completed: boolean;
}

export async function saveAbandonedCheckout(
  data: Omit<AbandonedCheckoutData, "createdAt" | "emailsSent" | "completed">
) {
  try {
    console.log("🔧 Saving abandoned checkout with data:", {
      email: data.email,
      sessionId: data.sessionId,
      totalPrice: data.totalPrice,
      databaseId: process.env.APPWRITE_DATABASE_ID,
      collectionId:
        process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID,
    });

    // Check if this session already exists to prevent duplicates
    // Fixed: Use Query.equal() instead of string interpolation
    const existingDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
      [Query.equal("sessionId", data.sessionId)]
    );

    if (existingDocs.documents.length > 0) {
      console.log("⚠️ Session already exists, skipping save:", data.sessionId);
      return { success: true, data: existingDocs.documents[0] };
    }

    const document = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
      ID.unique(),
      {
        ...data,
        passengers:
          typeof data.passengers === "string"
            ? data.passengers
            : JSON.stringify(data.passengers),
        outboundTicket:
          typeof data.outboundTicket === "string"
            ? data.outboundTicket
            : JSON.stringify(data.outboundTicket),
        returnTicket: data.returnTicket
          ? typeof data.returnTicket === "string"
            ? data.returnTicket
            : JSON.stringify(data.returnTicket)
          : undefined,
        createdAt: new Date().toISOString(),
        emailsSent: 0,
        completed: false,
      }
    );

    console.log("✅ Document created successfully:", document.$id);
    return { success: true, data: document };
  } catch (error) {
    console.error("❌ Error saving abandoned checkout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getAbandonedCheckouts(
  timeRange: "recent" | "day" = "recent"
) {
  try {
    const now = new Date();
    const timeThreshold =
      timeRange === "recent"
        ? new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
        : new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    // Fixed: Use Query helper functions instead of string interpolation
    const documents = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
      [
        Query.greaterThanEqual("createdAt", timeThreshold.toISOString()),
        Query.equal("completed", false),
      ]
    );
    return { success: true, data: documents.documents };
  } catch (error) {
    console.error("Error fetching abandoned checkouts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function markCheckoutCompleted(sessionId: string) {
  try {
    // Fixed: Use Query.equal() instead of string interpolation
    const documents = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
      [Query.equal("sessionId", sessionId)]
    );

    if (documents.documents.length > 0) {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
        documents.documents[0].$id,
        { completed: true }
      );
    }
    return { success: true };
  } catch (error) {
    console.error("Error marking checkout completed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function updateEmailSent(documentId: string, emailCount: number) {
  try {
    await databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID!,
      documentId,
      {
        emailsSent: emailCount,
        lastEmailSent: new Date().toISOString(),
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating email sent:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
