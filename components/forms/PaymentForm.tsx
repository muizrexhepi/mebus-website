"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { environment } from "@/environment";
import { Button } from "@/components/ui/button";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useToast } from "@/components/hooks/use-toast";
import { useCheckoutStore, usePaymentSuccessStore } from "@/store";

interface PaymentFormProps {
  bookingId: string;
  totalPrice: number;
  redirect?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  bookingId,
  totalPrice,
  redirect,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { selectedFlex } = useCheckoutStore();
  const { setIsPaymentSuccess, isPaymentSuccess } = usePaymentSuccessStore();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${environment.apiurl}/payment/create-payment-intent`,
        { amount_in_cents: totalPrice * 100, bookingId }
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
      } else if (paymentIntent.status === "succeeded") {
        setIsPaymentSuccess(true);
        await updateBooking(paymentIntent.id);
        if (!redirect) {
          return toast({
            variant: "default",
            description: "Payment succeeded",
          });
        }
        router.push(`/booking/${bookingId}`);
      }
    } catch (err: any) {
      toast({
        description: err.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (paymentIntentId: string) => {
    try {
      await axios.post(
        `${environment.apiurl}/booking/${bookingId}/upgrade-flex`,
        {
          travel_flex: selectedFlex,
          payment_intent_id: paymentIntentId,
        }
      );
    } catch (error) {
      console.error("Failed to update booking:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
              3
            </span>
            <p className="text-[#353535] font-medium text-lg">Payment Method</p>
          </div>

          <p className="text-sm text-gray-600 my-4">
            Please enter your credit card information to complete the payment.
          </p>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Card Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-3 border border-gray-300 rounded-md h-12">
                <CardNumberElement />
              </div>
              <div className="p-3 border border-gray-300 rounded-md h-12">
                <CardExpiryElement />
              </div>
              <div className="p-3 border border-gray-300 rounded-md h-12">
                <CardCvcElement />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          variant="outline"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
