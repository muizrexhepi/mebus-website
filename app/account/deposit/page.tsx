"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/hooks/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Lock, Banknote } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const DepositForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const authToken = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/generate/auth-token`,
        { user }
      );
      const config = {
        headers: {
          Authorization: `Bearer ${authToken.data.data}`,
        },
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment-intent`,
        {
          amount_in_cents: depositAmount * 100,
        }
      );

      const { clientSecret } = res.data.data;
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {},
          },
        });

      if (confirmError) {
        toast({
          description: confirmError.message || "Something went wrong!",
          variant: "destructive",
        });
      } else {
        const depositRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/deposit`,
          {
            user_id: user._id,
            amount_in_cents: depositAmount * 100,
            payment_intent_id: paymentIntent.id,
          },
          config
        );
        toast({
          description: `You successfully deposited €${depositAmount}`,
        });
      }
    } catch (err) {
      // console.error({ err });
      toast({
        description: "Something went wrong. Please fill the inputs.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleDeposit} className="space-y-6">
      <div>
        <label
          htmlFor="depositAmount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Deposit Amount in EUR
        </label>
        <Input
          type="number"
          id="depositAmount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
          min="0"
          step="0.01"
          required
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Card Number
        </label>
        <CardNumberElement
          id="cardNumber"
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cardExpiry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiration Date
          </label>
          <CardExpiryElement
            id="cardExpiry"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="cardCvc"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CVC
          </label>
          <CardCvcElement
            id="cardCvc"
            className="w-full p-3 border rounded-md"
          />
        </div>
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : "Make Deposit"}
      </Button>
    </form>
  );
};

const DepositPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Deposit Funds</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-[60%]">
          <Card>
            <CardHeader>
              <CardTitle>Make a Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise}>
                <DepositForm />
              </Elements>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-[40%] space-y-6">
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-2xl">
                Why Deposit with GoBusly?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Banknote className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Convenient Booking</h3>
                  <p>Deposit funds for quick and easy bus ticket purchases</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CreditCard className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Secure Transactions</h3>
                  <p>
                    Your financial information is protected with advanced
                    encryption
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Instant Credit</h3>
                  <p>
                    Funds are immediately available for use after successful
                    deposit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you have any questions about making a deposit or using our
                services, please don&apos;t hesitate to contact us.
              </p>
              <Link href="/help/contact-support">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
