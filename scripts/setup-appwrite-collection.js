import { Client, Databases, ID } from "node-appwrite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66ccea4d0006b240505c")
  .setKey(
    "df9835b268e3a1f9f64f604b906b92097ac4c982ed68a2b92b2144541abb1c1f84b357c79adf6ee328a9bdcb92711b5ac96a87d3079f712a139034fd35dce5661419bb86c7590ce2d20925e090f88ce0acb8160eb24e22458771c0edba3c87b14a3ed383f9081a494a2972ae9ca79005c34a8de6aab321140383fee7611ca036"
  );

const databases = new Databases(client);

async function createAbandonedCheckoutCollection() {
  try {
    console.log("🚀 Setting up Appwrite collection...");
    console.log("Database ID:", "6713c3b200311fa89467");

    if (!"6713c3b200311fa89467") {
      throw new Error(
        "APPWRITE_DATABASE_ID is not set in environment variables"
      );
    }
    console.log("Endpoint:", "https://cloud.appwrite.io/v1");

    // Create the collection
    const collectionId = ID.unique();
    const collection = await databases.createCollection(
      "6713c3b200311fa89467",
      collectionId,
      "abandoned_checkouts",
      undefined, // permissions - will use default
      false, // documentSecurity
      true // enabled
    );

    console.log("✅ Collection created:", collection.$id);

    // Create all attributes at once
    const attributes = [
      { key: "email", type: "string", size: 255, required: true },
      { key: "passengers", type: "string", size: 5000, required: true },
      { key: "outboundTicket", type: "string", size: 5000, required: true },
      { key: "returnTicket", type: "string", size: 5000, required: false },
      { key: "selectedFlex", type: "string", size: 50, required: true },
      { key: "flexPrice", type: "double", required: true },
      { key: "totalPrice", type: "double", required: true },
      { key: "departureDate", type: "string", size: 100, required: true },
      { key: "returnDate", type: "string", size: 100, required: false },
      { key: "fromCity", type: "string", size: 100, required: true },
      { key: "toCity", type: "string", size: 100, required: true },
      { key: "sessionId", type: "string", size: 255, required: true },
      { key: "createdAt", type: "string", size: 100, required: true },
      { key: "emailsSent", type: "integer", required: true },
      { key: "lastEmailSent", type: "string", size: 100, required: false },
      { key: "completed", type: "boolean", required: true },
    ];

    console.log("📝 Creating attributes...");

    // Create attributes with delay to avoid rate limits
    for (const attr of attributes) {
      try {
        if (attr.type === "string") {
          await databases.createStringAttribute(
            "6713c3b200311fa89467",
            collection.$id,
            attr.key,
            attr.size,
            attr.required
          );
        } else if (attr.type === "double") {
          await databases.createFloatAttribute(
            "6713c3b200311fa89467",
            collection.$id,
            attr.key,
            attr.required
          );
        } else if (attr.type === "integer") {
          await databases.createIntegerAttribute(
            "6713c3b200311fa89467",
            collection.$id,
            attr.key,
            attr.required
          );
        } else if (attr.type === "boolean") {
          await databases.createBooleanAttribute(
            "6713c3b200311fa89467",
            collection.$id,
            attr.key,
            attr.required
          );
        }

        console.log(`✅ Created attribute: ${attr.key}`);

        // Small delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(
          `❌ Failed to create attribute ${attr.key}:`,
          error.message
        );
      }
    }

    // Create indexes
    const indexes = [
      { key: "sessionId_index", attributes: ["sessionId"] },
      { key: "email_index", attributes: ["email"] },
      { key: "createdAt_index", attributes: ["createdAt"] },
      { key: "completed_index", attributes: ["completed"] },
    ];

    // Wait a bit for attributes to be ready
    console.log("⏳ Waiting for attributes to be ready...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("🔍 Creating indexes...");
    for (const index of indexes) {
      try {
        await databases.createIndex(
          "6713c3b200311fa89467",
          collection.$id,
          index.key,
          "key",
          index.attributes
        );
        console.log(`✅ Created index: ${index.key}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`❌ Failed to create index ${index.key}:`, error.message);
      }
    }

    console.log("\n🎉 Collection setup complete!");
    console.log(`Collection ID: ${collection.$id}`);
    console.log("\n📋 Add this to your .env file:");
    console.log(`APPWRITE_ABANDONED_CHECKOUT_COLLECTION_ID=${collection.$id}`);

    return collection.$id;
  } catch (error) {
    console.error("❌ Failed to create collection:", error);
    process.exit(1);
  }
}

createAbandonedCheckoutCollection();
