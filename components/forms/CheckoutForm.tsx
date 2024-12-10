"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PassengerInfo from "../../app/checkout/_components/PassengerInfo";
import Extras from "../../app/checkout/_components/ExtrasInfo";
import PaymentMethod from "../../app/checkout/_components/PaymentMethod";
import OrderSummary from "../../app/checkout/_components/OrderSummary";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = () => {
  return (
    <div className="relative mx-auto flex flex-col-reverse md:flex-row gap-8">
      <div className="flex-[2] flex flex-col gap-4">
        <PassengerInfo />
        <Extras />
        <PaymentMethod />
      </div>

      <div className="hidden flex-1 md:flex flex-col gap-4 sticky top-10 h-fit">
        <OrderSummary />
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
