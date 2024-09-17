"use client"

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/hooks/use-toast";
import { environment } from "@/environment";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { account } from '@/appwrite.config';
import { User } from '@/models/user';

const stripePromise = loadStripe(environment.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DepositForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [user, setUser] = useState<any>({});
  const { toast } = useToast();

    const fetchUser = async () => {
        try {
          const aUser = await account.get();
          setUser(aUser);
          console.log({aUser})
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
    
      useEffect(() => {
        fetchUser();
      }, []);

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    
    try {
        const authToken = await axios.post(`${environment.apiurl}/user/generate/auth-token`, { user });
        const config = {
            headers: {
              Authorization: `Bearer ${authToken.data.data}`,
            },
        };
    
        const res = await axios.post(`${environment.apiurl}/payment/create-payment-intent`, { 
        amount_in_cents: depositAmount * 100 
      },
    );

      const { clientSecret } = res.data.data;
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
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
        const depositRes = await axios.post(`${environment.apiurl}/payment/deposit`, { user_id: user.$id, amount_in_cents: depositAmount * 100, payment_intent_id: paymentIntent.id }, config);
        console.log({depositRes})
        toast({
          description: `You successfully deposited $${depositAmount}`,
        });
      }
    } catch (err) {
      console.error({ err });
      toast({ description: "Something went wrong. Please fill the inputs.", variant: "destructive" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleDeposit} className="space-y-4">
        <div>
            Make a Deposit and Book Your Bus Tickets!

            This page allows you to deposit money securely using your credit or debit card. Simply enter the amount you wish to deposit, provide your card details, and confirm the payment.

            Once your deposit is successful, the amount will be credited to your account. You can then use these funds to book bus tickets quickly and easily without the need for additional payment steps during checkout.

            Thank you for using our service, and we hope you have a great travel experience!
        </div>
      <div>
        <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">
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
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <CardNumberElement id="cardNumber" className="mt-1 p-2 border rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <CardExpiryElement id="cardExpiry" className="mt-1 p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <CardCvcElement id="cardCvc" className="mt-1 p-2 border rounded" />
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
    <Elements stripe={stripePromise}>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Make a Deposit</h1>
        <DepositForm />
      </div>
    </Elements>
  );
};

export default DepositPage;