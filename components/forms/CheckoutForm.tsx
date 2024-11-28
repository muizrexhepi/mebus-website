"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PassengerInfo from "../checkout/PassengerInfo";
import Extras from "../checkout/ExtrasInfo";
import PaymentMethod from "../checkout/PaymentMethod";
import OrderSummary from "../checkout/OrderSummary";

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
      <div className="flex-1 flex flex-col gap-4">
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
