"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MobileCheckoutBlock } from "@/app/search/_components/checkout-mobile-header";
import SecondaryFooter from "@/components/SecondaryFooter";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { useCheckoutStore } from "@/store";
import { CarrierTerms } from "./CarrierTerms";

const CheckoutClientPage = () => {
  const router = useRouter();
  const { selectedTicket, outboundTicket, returnTicket } = useCheckoutStore();
  const path = usePathname();

  useEffect(() => {
    const hasTickets = selectedTicket || outboundTicket || returnTicket;

    if (!hasTickets && path !== "/checkout/success") {
      router.push("/");
    }
  }, [selectedTicket, outboundTicket, returnTicket, router]);

  const hasTickets = selectedTicket || outboundTicket || returnTicket;

  if (!hasTickets) {
    return null;
  }

  const carrierInfo = selectedTicket?.operatorInfo || null;

  return (
    <div className="min-h-screen bg-primary-bg/5">
      <MobileCheckoutBlock />
      <div className="min-h-screen max-w-6xl paddingX mx-auto py-8 space-y-4">
        <CheckoutForm />
        <CarrierTerms carrier={carrierInfo} />
      </div>
      <SecondaryFooter />
    </div>
  );
};

export default CheckoutClientPage;
