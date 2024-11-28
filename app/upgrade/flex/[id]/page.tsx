"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckoutStore } from "@/store";
import TravelFlex from "@/components/checkout/TravelFlex";
import PaymentForm from "@/components/forms/PaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const UpgradeFlexPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { flexPrice } = useCheckoutStore();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-6 text-neutral-800">
          Upgrade Your Flex Option
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-emerald-700 text-white">
              <CardTitle className="text-xl font-bold">
                Choose Your Flex Option
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <TravelFlex />
            </CardContent>
          </Card>

          <Elements stripe={stripePromise}>
            <PaymentForm bookingId={params.id} totalPrice={flexPrice} />
          </Elements>
        </div>
      </main>

      <SecondaryFooter />
    </div>
  );
};

export default UpgradeFlexPage;
