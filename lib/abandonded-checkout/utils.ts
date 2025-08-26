import { useCheckoutStore } from "@/store";

export interface ResumeCheckoutData {
  checkoutId: string;
  selectedTicket: any;
  outboundTicket: any;
  returnTicket: any;
  passengers: any[];
  selectedFlex: string | null;
  flexPrice: number;
  totalCost: number;
  timestamp: number;
}

// Function to resume checkout from abandoned data
export const resumeCheckout = (data: ResumeCheckoutData) => {
  const store = useCheckoutStore.getState();

  // Set all the data at once to minimize re-renders
  const updates: Partial<any> = {};

  if (data.selectedTicket) {
    updates.selectedTicket = data.selectedTicket;
  }

  if (data.outboundTicket) {
    updates.outboundTicket = data.outboundTicket;
  }

  if (data.returnTicket) {
    updates.returnTicket = data.returnTicket;
  }

  if (data.passengers && data.passengers.length > 0) {
    updates.passengers = data.passengers;
  }

  if (data.selectedFlex) {
    updates.selectedFlex = data.selectedFlex;
  }

  if (typeof data.flexPrice === "number") {
    updates.flexPrice = data.flexPrice;
  }

  // Apply all updates at once
  useCheckoutStore.setState(updates);

  // Force sessionStorage update
  try {
    const currentState = useCheckoutStore.getState();
    sessionStorage.setItem(
      "checkout-storage",
      JSON.stringify({
        state: currentState,
        version: 0,
      })
    );
  } catch (error) {
    console.error("Failed to update sessionStorage:", error);
  }

  // Log the current state after setting
  const currentState = useCheckoutStore.getState();
};

// API function to fetch abandoned checkout
export const fetchAbandonedCheckout = async (
  checkoutId: string
): Promise<ResumeCheckoutData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/abandoned-checkout/${checkoutId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Function to delete abandoned checkout after successful resume
export const deleteAbandonedCheckout = async (
  checkoutId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/abandoned-checkout/${checkoutId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.ok;
  } catch (error) {
    return false;
  }
};
