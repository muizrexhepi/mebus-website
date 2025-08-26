"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MobileCheckoutBlock } from "@/app/search/_components/checkout-mobile-header";
import SecondaryFooter from "@/components/SecondaryFooter";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { useCheckoutStore } from "@/store";
// import { useAbandonedCheckout } from "@/components/hooks/use-abandoned-checkout";
// import {
//   deleteAbandonedCheckout,
//   fetchAbandonedCheckout,
//   resumeCheckout,
// } from "@/lib/abandonded-checkout/utils";

const CheckoutClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedTicket, outboundTicket, returnTicket } = useCheckoutStore();
  const path = usePathname();

  // const [isResuming, setIsResuming] = useState(false);
  // const [resumeCompleted, setResumeCompleted] = useState(false);

  // const { checkoutId } = useAbandonedCheckout();

  const checkStoreForTickets = () => {
    const storeState = useCheckoutStore.getState();
    return !!(
      storeState.selectedTicket ||
      storeState.outboundTicket ||
      storeState.returnTicket
    );
  };

  // ABANDONED CHECKOUT LOGIC - COMMENTED OUT FOR NOW
  // useEffect(() => {
  //   const resumeCheckoutId = searchParams.get("resume");

  //   if (resumeCheckoutId && !resumeCompleted) {
  //     setIsResuming(true);

  //     const handleResumeCheckout = async () => {
  //       try {
  //         const abandonedData = await fetchAbandonedCheckout(resumeCheckoutId);

  //         if (abandonedData) {
  //           resumeCheckout(abandonedData);

  //           let retryCount = 0;
  //           const maxRetries = 10;

  //           while (retryCount < maxRetries && !checkStoreForTickets()) {
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //             retryCount++;
  //           }

  //           if (checkStoreForTickets()) {
  //             await deleteAbandonedCheckout(resumeCheckoutId);

  //             const newUrl = new URL(window.location.href);
  //             newUrl.searchParams.delete("resume");
  //             window.history.replaceState({}, "", newUrl.toString());

  //             setResumeCompleted(true);
  //           } else {
  //             router.push("/");
  //           }
  //         } else {
  //           router.push("/");
  //         }
  //       } catch (error) {
  //         router.push("/");
  //       } finally {
  //         setIsResuming(false);
  //       }
  //     };

  //     handleResumeCheckout();
  //   }
  // }, [searchParams, router, resumeCompleted]);

  // Basic redirect logic - back to original functionality
  useEffect(() => {
    const hasTickets = selectedTicket || outboundTicket || returnTicket;
    const hasTicketsInStore = checkStoreForTickets();

    if (!hasTickets && !hasTicketsInStore && path !== "/checkout/success") {
      console.log(
        "No tickets found in component or store, redirecting to home"
      );
      router.push("/");
    }
  }, [selectedTicket, outboundTicket, returnTicket, router, path]);

  const hasTickets = selectedTicket || outboundTicket || returnTicket;
  // const hasResumeParam = searchParams.get("resume");
  const hasTicketsInStore = checkStoreForTickets();

  // ABANDONED CHECKOUT LOADING STATE - COMMENTED OUT FOR NOW
  // if (isResuming) {
  //   return (
  //     <div className="min-h-screen bg-primary-bg/5 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-gray-600">Restoring your booking...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Simple check for rendering - back to original logic
  if (!hasTickets && !hasTicketsInStore) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-bg/5">
      <MobileCheckoutBlock />
      <div className="min-h-screen max-w-6xl paddingX mx-auto py-8 space-y-4">
        <CheckoutForm />
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default CheckoutClientPage;
