"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { environment } from "@/environment";
import { useCheckoutStore } from "@/store";
import PassengerInfo from "../checkout/PassengerInfo";
import Extras from "../checkout/ExtrasInfo";
import PaymentMethod from "../checkout/PaymentMethod";
import OrderSummary from "../checkout/OrderSummary";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  environment.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = () => {
  const { selectedTicket, setSelectedTicket } = useCheckoutStore();

  useEffect(() => {
    if (!selectedTicket) {
      const ticket = localStorage.getItem("ticket");
      setSelectedTicket(JSON.parse(ticket!));
    }
  }, []);
  console.log({ selectedTicket });

  return (
    <div className="relative mx-auto flex flex-col-reverse md:flex-row gap-8 pb-20">
      <div className="flex-[2] flex flex-col gap-4">
        <PassengerInfo />
        <Extras />
        <PaymentMethod selectedTicket={selectedTicket!} />
        {/* Navigation buttons */}
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <OrderSummary selectedTicket={selectedTicket!} />
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
