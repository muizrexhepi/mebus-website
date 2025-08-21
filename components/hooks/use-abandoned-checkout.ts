"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCheckoutStore } from "@/store";
import { useSearchParams } from "next/navigation";
import { getLanguageFromCookies } from "@/lib/i18next";

// Client-side function to call API route
async function saveToAPI(data: any) {
  try {
    const response = await fetch("/api/abandoned-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to save abandoned checkout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Safe serialization function to handle complex objects
function safeStringify(obj: any): string {
  try {
    return JSON.stringify(obj, (key, value) => {
      // Handle Date objects
      if (value instanceof Date) {
        return value.toISOString();
      }

      // Handle undefined values
      if (value === undefined) {
        return null;
      }

      // Handle functions (remove them)
      if (typeof value === "function") {
        return undefined;
      }

      // Handle circular references and complex objects
      if (typeof value === "object" && value !== null) {
        // Create a clean copy with only serializable properties
        const cleanObj: any = {};
        for (const prop in value) {
          if (value.hasOwnProperty(prop)) {
            const propValue = value[prop];
            if (
              propValue !== null &&
              propValue !== undefined &&
              typeof propValue !== "function" &&
              typeof propValue !== "symbol"
            ) {
              cleanObj[prop] = propValue;
            }
          }
        }
        return cleanObj;
      }

      return value;
    });
  } catch (error) {
    console.error("Failed to stringify object:", error);
    // Return a minimal fallback
    return JSON.stringify({
      error: "Failed to serialize data",
      timestamp: new Date().toISOString(),
    });
  }
}

export function useAbandonedCheckout() {
  const { passengers, outboundTicket, returnTicket, selectedFlex, flexPrice } =
    useCheckoutStore();
  const searchParams = useSearchParams();

  // Refs for managing state
  const timeoutRef = useRef<NodeJS.Timeout>();
  const sessionId = useRef<string>();
  const savePromiseRef = useRef<Promise<any> | null>(null);
  const isTrackingRef = useRef<boolean>(false);
  const hasBeenSavedRef = useRef<boolean>(false);

  const resumeSessionId = searchParams?.get("resume");

  // Generate unique session ID - reset for new sessions
  useEffect(() => {
    const shouldGenerateNewSession =
      !sessionId.current ||
      (!resumeSessionId && sessionId.current.includes("resumed"));

    if (shouldGenerateNewSession) {
      const prefix = resumeSessionId ? "resumed" : "checkout";
      sessionId.current = `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Reset all tracking state for new sessions
      isTrackingRef.current = false;
      hasBeenSavedRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    }
  }, [resumeSessionId]);

  // Memoized data preparation to avoid recalculation
  const prepareAbandonedData = useCallback(() => {
    if (!passengers.length || !outboundTicket || !passengers[0]?.email) {
      return null;
    }

    // Calculate total price safely
    const outboundTotal = outboundTicket?.stops?.[0]?.other_prices?.our_price
      ? outboundTicket.stops[0].other_prices.our_price * passengers.length
      : 0;

    const returnTotal = returnTicket?.stops?.[0]?.other_prices?.our_price
      ? returnTicket.stops[0].other_prices.our_price * passengers.length
      : 0;

    const totalPrice = outboundTotal + returnTotal + (flexPrice || 0);

    // Create clean data objects
    const cleanPassengers = passengers.map((passenger) => ({
      first_name: passenger.first_name || "",
      last_name: passenger.last_name || "",
      email: passenger.email || "",
      phone: passenger.phone || "",
      birthdate: passenger.birthdate || "",
      age: passenger.age || 0,
      price: passenger.price || 0,
    }));

    const cleanOutboundTicket = outboundTicket
      ? {
          _id: outboundTicket._id,
          operator: outboundTicket.operator,
          stops: outboundTicket.stops?.map((stop: any) => ({
            _id: stop._id,
            departure_date: stop.departure_date,
            arrival_date: stop.arrival_time,
            from: {
              _id: stop.from._id,
              name: stop.from.name,
              city: stop.from.city,
            },
            to: {
              _id: stop.to._id,
              name: stop.to.name,
              city: stop.to.city,
            },
            price: stop.price,
            children_price: stop.children_price,
            other_prices: {
              our_price: stop.other_prices?.our_price,
              our_children_price: stop.other_prices?.our_children_price,
            },
          })),
          metadata: {
            operator_name: outboundTicket.metadata?.operator_name,
          },
        }
      : null;

    const cleanReturnTicket = returnTicket
      ? {
          _id: returnTicket._id,
          operator: returnTicket.operator,
          stops: returnTicket.stops?.map((stop: any) => ({
            _id: stop._id,
            departure_date: stop.departure_date,
            arrival_date: stop.arrival_time,
            from: {
              _id: stop.from._id,
              name: stop.from.name,
              city: stop.from.city,
            },
            to: {
              _id: stop.to._id,
              name: stop.to.name,
              city: stop.to.city,
            },
            price: stop.price,
            children_price: stop.children_price,
            other_prices: {
              our_price: stop.other_prices?.our_price,
              our_children_price: stop.other_prices?.our_children_price,
            },
          })),
          metadata: {
            operator_name: returnTicket.metadata?.operator_name,
          },
        }
      : null;

    return {
      email: passengers[0]?.email || "",
      passengers: safeStringify(cleanPassengers),
      outboundTicket: safeStringify(cleanOutboundTicket),
      returnTicket: cleanReturnTicket
        ? safeStringify(cleanReturnTicket)
        : undefined,
      selectedFlex: selectedFlex || "no_flex",
      flexPrice: flexPrice || 0,
      totalPrice,
      departureDate: outboundTicket?.stops?.[0]?.departure_date
        ? new Date(outboundTicket.stops[0].departure_date).toISOString()
        : new Date().toISOString(),
      returnDate: returnTicket?.stops?.[0]?.departure_date
        ? new Date(returnTicket.stops[0].departure_date).toISOString()
        : undefined,
      fromCity: outboundTicket?.stops?.[0]?.from?.city || "",
      toCity: outboundTicket?.stops?.[0]?.to?.city || "",
      sessionId: sessionId.current!,
      language: getLanguageFromCookies(), // Assuming English for now, can be dynamic
    };
  }, [passengers, outboundTicket, returnTicket, selectedFlex, flexPrice]);

  // Save abandoned checkout function with improved duplicate prevention
  const saveAbandonedData = useCallback(async () => {
    // Prevent multiple saves for the same session
    if (hasBeenSavedRef.current) {
      return { success: false, error: "Already saved for this session" };
    }

    // Don't save if this is a resumed session
    if (resumeSessionId) {
      return { success: false, error: "Resumed session, no save needed" };
    }

    // If already saving, return the existing promise
    if (savePromiseRef.current) {
      return savePromiseRef.current;
    }

    const abandonedData = prepareAbandonedData();
    if (!abandonedData) {
      return { success: false, error: "Missing required data" };
    }

    // Mark as saved to prevent duplicates
    hasBeenSavedRef.current = true;

    // Create and store the promise
    savePromiseRef.current = (async () => {
      try {
        const result = await saveToAPI(abandonedData);

        if (result.success) {
        } else {
          // Reset the flag if save failed so it can be retried
          hasBeenSavedRef.current = false;
        }

        return result;
      } catch (error) {
        console.error("❌ Failed to save abandoned checkout:", error);
        // Reset the flag if save failed so it can be retried
        hasBeenSavedRef.current = false;
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      } finally {
        // Clear the promise reference when done
        savePromiseRef.current = null;
      }
    })();

    return savePromiseRef.current;
  }, [prepareAbandonedData, resumeSessionId, passengers.length]);

  // Initialize tracking with improved logic to prevent duplicates
  useEffect(() => {
    // Don't track if this is a resumed session
    if (resumeSessionId) {
      return;
    }

    // Don't track if already saved
    if (hasBeenSavedRef.current) {
      return;
    }

    // Check if we have the minimum required data
    const hasRequiredData =
      passengers.length > 0 && outboundTicket && passengers[0]?.email;

    if (!hasRequiredData) {
      return;
    }

    // Don't start tracking if already tracking
    if (isTrackingRef.current) {
      console.log("🔄 Already tracking, skipping initialization");
      return;
    }

    console.log("🚀 Initializing abandoned checkout tracking...");
    isTrackingRef.current = true;

    // Set timeout for 1 minute of inactivity
    timeoutRef.current = setTimeout(() => {
      console.log("⏰ 1 minute passed, saving abandoned checkout...");
      saveAbandonedData();
    }, 1 * 60 * 1000); // 1 minute

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      isTrackingRef.current = false;
    };
  }, [
    // Only watch the essential data that determines if tracking should start
    passengers.length,
    passengers[0]?.email,
    outboundTicket?._id,
    resumeSessionId,
    saveAbandonedData,
  ]);

  // Reset timeout on user activity
  const resetTimeout = useCallback(() => {
    // Don't reset timeout for resumed sessions or if already saved
    if (resumeSessionId || !isTrackingRef.current || hasBeenSavedRef.current) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);

      // Restart the timer
      timeoutRef.current = setTimeout(() => {
        saveAbandonedData();
      }, 1 * 60 * 1000); // 1 minute
    }
  }, [saveAbandonedData, resumeSessionId]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (
        !resumeSessionId && // Don't save for resumed sessions
        !hasBeenSavedRef.current && // Don't save if already saved
        passengers.length &&
        outboundTicket &&
        passengers[0]?.email &&
        !savePromiseRef.current // Only save if not already saving
      ) {
        // Try to save immediately (this might not always work on page unload)
        console.log("🚪 Attempting to save on page unload");
        saveAbandonedData();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleBeforeUnload();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [saveAbandonedData, resumeSessionId, passengers.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return the interface
  return {
    sessionId: sessionId.current || null,
    resetTimeout,
    debug: {
      isTracking: isTrackingRef.current,
      hasBeenSaved: hasBeenSavedRef.current,
      isSaving: !!savePromiseRef.current,
    },
  };
}
