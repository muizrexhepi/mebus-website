import { type NextRequest, NextResponse } from "next/server";
import {
  getAbandonedCheckouts,
  updateEmailSent,
} from "@/lib/appwrite-abandoned-checkout";
import { sendAbandonedCheckoutEmail } from "@/lib/resend-emails";

export async function POST(request: NextRequest) {
  try {
    const { timeRange } = await request.json();

    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error("NEXT_PUBLIC_BASE_URL is not set");
      return NextResponse.json(
        { error: "Base URL not configured" },
        { status: 500 }
      );
    }

    // Get abandoned checkouts
    const result = await getAbandonedCheckouts(timeRange);

    if (!result.success || !result.data) {
      console.error("Failed to fetch abandoned checkouts:", result);
      return NextResponse.json(
        { error: "Failed to fetch abandoned checkouts" },
        { status: 500 }
      );
    }

    const abandonedCheckouts = result.data;
    const emailsSent = [];
    const errors = [];

    // Ensure abandonedCheckouts is an array
    if (!Array.isArray(abandonedCheckouts)) {
      console.error(
        "Invalid data format - not an array:",
        typeof abandonedCheckouts
      );
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 500 }
      );
    }

    console.log(`Processing ${abandonedCheckouts.length} abandoned checkouts`);

    for (const checkout of abandonedCheckouts) {
      try {
        // Validate checkout data
        if (!checkout.createdAt || !checkout.email || !checkout.sessionId) {
          console.error("Invalid checkout data:", checkout);
          errors.push({
            checkoutId: checkout.$id,
            error: "Missing required fields",
          });
          continue;
        }

        const now = Date.now();
        const createdAt = new Date(checkout.createdAt).getTime();

        // Validate date parsing
        if (isNaN(createdAt)) {
          console.error("Invalid createdAt date:", checkout.createdAt);
          errors.push({
            checkoutId: checkout.$id,
            error: "Invalid createdAt date",
          });
          continue;
        }

        const timeSinceCreated = now - createdAt;
        const thirtyMinutes = 30 * 60 * 1000;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        console.log(
          `Checkout ${checkout.$id}: ${Math.floor(
            timeSinceCreated / (60 * 1000)
          )} minutes old, emails sent: ${checkout.emailsSent}`
        );

        // Debug: Log raw passengers data
        console.log(`Raw passengers data for ${checkout.$id}:`, {
          type: typeof checkout.passengers,
          value: checkout.passengers,
          length: checkout.passengers?.length,
        });

        // Parse passengers data safely
        let passengers;
        try {
          passengers =
            typeof checkout.passengers === "string"
              ? JSON.parse(checkout.passengers)
              : checkout.passengers;
        } catch (parseError) {
          console.error(
            "Failed to parse passengers data:",
            parseError,
            checkout.passengers
          );
          errors.push({
            checkoutId: checkout.$id,
            error: "Failed to parse passengers data",
          });
          continue;
        }

        // Debug: Log parsed passengers data
        console.log(`Parsed passengers data for ${checkout.$id}:`, {
          type: typeof passengers,
          isArray: Array.isArray(passengers),
          value: passengers,
          length: passengers?.length,
        });

        // Handle different passengers data formats
        let passengerArray = [];

        if (Array.isArray(passengers)) {
          passengerArray = passengers;
        } else if (passengers && typeof passengers === "object") {
          // Handle the case where passengers is an object with numeric keys
          const keys = Object.keys(passengers);
          if (keys.length > 0 && !isNaN(Number(keys[0]))) {
            // If the first key is numeric, extract the passenger objects
            passengerArray = keys.map((key) => passengers[key]);
          } else if (passengers.passenger) {
            passengerArray = Array.isArray(passengers.passenger)
              ? passengers.passenger
              : [passengers.passenger];
          } else if (passengers.passengers) {
            passengerArray = Array.isArray(passengers.passengers)
              ? passengers.passengers
              : [passengers.passengers];
          } else {
            // If it's a single passenger object
            passengerArray = [passengers];
          }
        } else {
          console.error("Invalid passengers data structure:", passengers);
          errors.push({
            checkoutId: checkout.$id,
            error: "Invalid passengers data structure",
            details: `Expected array or object, got ${typeof passengers}`,
          });
          continue;
        }

        // Validate that we have at least one passenger
        if (passengerArray.length === 0) {
          console.error("No passengers found:", passengers);
          errors.push({
            checkoutId: checkout.$id,
            error: "No passengers found",
          });
          continue;
        }

        console.log(
          `Final passenger array for ${checkout.$id}:`,
          passengerArray
        );

        // Get language from checkout data, fallback to 'en'
        const userLanguage = checkout.language || "en";
        console.log(
          `Using language ${userLanguage} for checkout ${checkout.$id}`
        );

        // Send first email after 30 minutes
        if (timeSinceCreated >= thirtyMinutes && checkout.emailsSent === 0) {
          console.log(`Sending first email for checkout ${checkout.$id}`);

          const emailResult = await sendAbandonedCheckoutEmail({
            email: checkout.email,
            firstName:
              passengerArray[0]?.first_name ||
              passengerArray[0]?.firstName ||
              "Traveler",
            fromCity: checkout.fromCity,
            toCity: checkout.toCity,
            departureDate: checkout.departureDate,
            totalPrice: checkout.totalPrice,
            currency: "€",
            sessionId: checkout.sessionId,
            isFirstEmail: true,
            language: userLanguage, // Add language parameter
          });

          console.log(`Email result for ${checkout.$id}:`, emailResult);

          if (emailResult.success) {
            const updateResult = await updateEmailSent(checkout.$id, 1);
            if (updateResult.success) {
              emailsSent.push({
                id: checkout.$id,
                type: "first",
                email: checkout.email,
                language: userLanguage,
              });
              console.log(
                `Successfully sent first email to ${checkout.email} in ${userLanguage}`
              );
            } else {
              console.error(
                `Failed to update email count for ${checkout.$id}:`,
                updateResult
              );
              errors.push({
                checkoutId: checkout.$id,
                error: "Failed to update email count after sending",
              });
            }
          } else {
            console.error(
              `Failed to send first email for ${checkout.$id}:`,
              emailResult.error
            );
            errors.push({
              checkoutId: checkout.$id,
              error: "Failed to send first email",
              details: emailResult.error,
            });
          }
        }
        // Send second email after 24 hours
        else if (
          timeSinceCreated >= twentyFourHours &&
          checkout.emailsSent === 1
        ) {
          console.log(`Sending second email for checkout ${checkout.$id}`);

          const emailResult = await sendAbandonedCheckoutEmail({
            email: checkout.email,
            firstName:
              passengerArray[0]?.first_name ||
              passengerArray[0]?.firstName ||
              "Traveler",
            fromCity: checkout.fromCity,
            toCity: checkout.toCity,
            departureDate: checkout.departureDate,
            totalPrice: checkout.totalPrice,
            currency: "€",
            sessionId: checkout.sessionId,
            isFirstEmail: false,
            language: userLanguage, // Add language parameter
          });

          console.log(`Second email result for ${checkout.$id}:`, emailResult);

          if (emailResult.success) {
            const updateResult = await updateEmailSent(checkout.$id, 2);
            if (updateResult.success) {
              emailsSent.push({
                id: checkout.$id,
                type: "second",
                email: checkout.email,
                language: userLanguage,
              });
              console.log(
                `Successfully sent second email to ${checkout.email} in ${userLanguage}`
              );
            } else {
              console.error(
                `Failed to update email count for ${checkout.$id}:`,
                updateResult
              );
              errors.push({
                checkoutId: checkout.$id,
                error: "Failed to update email count after sending",
              });
            }
          } else {
            console.error(
              `Failed to send second email for ${checkout.$id}:`,
              emailResult.error
            );
            errors.push({
              checkoutId: checkout.$id,
              error: "Failed to send second email",
              details: emailResult.error,
            });
          }
        } else {
          // Log why email wasn't sent
          if (timeSinceCreated < thirtyMinutes) {
            console.log(
              `Checkout ${checkout.$id}: Too recent (${Math.floor(
                timeSinceCreated / (60 * 1000)
              )} minutes)`
            );
          } else if (checkout.emailsSent >= 2) {
            console.log(
              `Checkout ${checkout.$id}: Already sent maximum emails (${checkout.emailsSent})`
            );
          } else if (
            checkout.emailsSent === 0 &&
            timeSinceCreated < twentyFourHours
          ) {
            console.log(
              `Checkout ${checkout.$id}: Waiting for 24 hours for second email`
            );
          }
        }
      } catch (checkoutError) {
        console.error("Error processing individual checkout:", checkoutError);
        errors.push({
          checkoutId: checkout.$id,
          error: "Processing error",
          details:
            checkoutError instanceof Error
              ? checkoutError.message
              : String(checkoutError),
        });
      }
    }

    const response = {
      success: true,
      emailsSent,
      totalCheckouts: abandonedCheckouts.length,
      emailsSentCount: emailsSent.length,
      errors: errors.length > 0 ? errors : undefined,
    };

    console.log("Final result:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing abandoned checkouts:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}
