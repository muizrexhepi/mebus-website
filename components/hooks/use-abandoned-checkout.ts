import { useEffect, useRef, useCallback } from "react";
import { useCheckoutStore } from "@/store";

interface AbandonedCheckoutData {
  checkoutId: string;
  selectedTicket: any;
  outboundTicket: any;
  returnTicket: any;
  passengers: any[];
  selectedFlex: string | null;
  flexPrice: number;
  totalCost: number;
  userEmail?: string;
  timestamp: number;
  sessionId: string;
}

export const useAbandonedCheckout = () => {
  const {
    selectedTicket,
    outboundTicket,
    returnTicket,
    passengers,
    selectedFlex,
    flexPrice,
    totalCost,
  } = useCheckoutStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const hasPassengerDataRef = useRef<boolean>(false);
  const checkoutIdRef = useRef<string>("");
  const isBookingInProgressRef = useRef<boolean>(false);

  // Generate unique checkout session ID
  const generateCheckoutId = useCallback(() => {
    return `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Check if user has meaningful passenger information
  const hasPassengerData = useCallback(() => {
    return (
      passengers.length > 0 &&
      passengers.some((passenger) => {
        const hasName =
          passenger.first_name?.trim() && passenger.last_name?.trim();
        const hasEmail = passenger.email?.trim();
        const hasPhone = passenger.phone?.trim();
        // At least name + (email or phone) to be considered meaningful
        return hasName && (hasEmail || hasPhone);
      })
    );
  }, [passengers]);

  // Delete abandoned checkout from backend
  const deleteAbandonedCheckout = useCallback(async (checkoutId?: string) => {
    const idToDelete = checkoutId || checkoutIdRef.current;
    if (!idToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/abandoned-checkout/${idToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
      }
    } catch (error) {}
  }, []);

  // Save abandoned checkout to backend
  const saveAbandonedCheckout = useCallback(async () => {
    if (!hasPassengerData() || isBookingInProgressRef.current) return;

    const abandonedData: AbandonedCheckoutData = {
      checkoutId: checkoutIdRef.current,
      selectedTicket,
      outboundTicket,
      returnTicket,
      passengers,
      selectedFlex,
      flexPrice,
      totalCost,
      userEmail: passengers.find((p) => p.email)?.email,
      timestamp: Date.now(),
      sessionId: checkoutIdRef.current,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/abandoned-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(abandonedData),
        }
      );

      if (response.ok) {
      }
    } catch (error) {}
  }, [
    selectedTicket,
    outboundTicket,
    returnTicket,
    passengers,
    selectedFlex,
    flexPrice,
    totalCost,
    hasPassengerData,
  ]);

  // Reset activity timer with longer timeout (5 minutes)
  const resetActivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set 5 minute timeout for abandonment - more reasonable
    timeoutRef.current = setTimeout(() => {
      if (hasPassengerData() && !isBookingInProgressRef.current) {
        saveAbandonedCheckout();
      }
    }, 300000); // 5 minutes
  }, [saveAbandonedCheckout, hasPassengerData]);

  const trackActivity = useCallback(() => {
    resetActivityTimer();
  }, [resetActivityTimer]);

  // Mark booking as in progress to prevent saving abandoned checkout
  const setBookingInProgress = useCallback((inProgress: boolean) => {
    isBookingInProgressRef.current = inProgress;
    if (inProgress) {
      // Clear any pending timeouts when booking starts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    }
  }, []);

  // Function to call when booking is successful
  const onBookingSuccess = useCallback(() => {
    setBookingInProgress(false);
    deleteAbandonedCheckout();
  }, [deleteAbandonedCheckout, setBookingInProgress]);

  useEffect(() => {
    if (!checkoutIdRef.current) {
      checkoutIdRef.current = generateCheckoutId();
    }
  }, [generateCheckoutId]);

  useEffect(() => {
    const currentHasData = hasPassengerData();

    if (currentHasData && !hasPassengerDataRef.current) {
      hasPassengerDataRef.current = true;
      resetActivityTimer();
    } else if (currentHasData) {
      resetActivityTimer();
    }

    hasPassengerDataRef.current = currentHasData;
  }, [passengers, hasPassengerData, resetActivityTimer]);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      document.addEventListener(event, trackActivity, true);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, trackActivity, true);
      });
    };
  }, [trackActivity]);

  // Handle page visibility change with delay
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        visibilityTimeoutRef.current = setTimeout(() => {
          if (hasPassengerData() && !isBookingInProgressRef.current) {
            saveAbandonedCheckout();
          }
        }, 120000); // 2 minutes
      } else if (document.visibilityState === "visible") {
        // User returned to the page - cancel the visibility timeout
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }
        resetActivityTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [saveAbandonedCheckout, hasPassengerData, resetActivityTimer]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasPassengerData() && !isBookingInProgressRef.current) {
        const inactiveTime = Date.now() - lastActivityRef.current;
        if (inactiveTime > 30000) {
          const abandonedData: AbandonedCheckoutData = {
            checkoutId: checkoutIdRef.current,
            selectedTicket,
            outboundTicket,
            returnTicket,
            passengers,
            selectedFlex,
            flexPrice,
            totalCost,
            userEmail: passengers.find((p) => p.email)?.email,
            timestamp: Date.now(),
            sessionId: checkoutIdRef.current,
          };

          navigator.sendBeacon(
            `${process.env.NEXT_PUBLIC_API_URL}/abandoned-checkout`,
            JSON.stringify(abandonedData)
          );
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    selectedTicket,
    outboundTicket,
    returnTicket,
    passengers,
    selectedFlex,
    flexPrice,
    totalCost,
    hasPassengerData,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, []);

  return {
    checkoutId: checkoutIdRef.current,
    saveAbandonedCheckout,
    deleteAbandonedCheckout,
    setBookingInProgress,
    onBookingSuccess,
  };
};
