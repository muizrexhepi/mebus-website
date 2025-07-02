"use client";

import { MobileCheckoutBlock } from "@/app/search/_components/checkout-mobile-header";
import SecondaryFooter from "@/components/SecondaryFooter";
import CheckoutForm from "@/components/forms/CheckoutForm";

const CheckoutClientPage = () => {
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
