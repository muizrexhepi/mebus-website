"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Luggage,
  MinusIcon,
  PlusIcon,
  TimerIcon,
} from "lucide-react";
import { Input } from "../ui/input"; 
import { Button } from "../ui/button"; 
import { environment } from "@/environment";

const stripePromise = loadStripe(environment.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [succeeded, setSucceeded] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    try {

      // pasagjeret duhet tmiren kur de mbushen inputat e t dhonave t pasagjuesve
      const passengers = [
        {
          full_name: "sistemski etnik",
          price: 12003,
        },
        {
          full_name: "rexhepski muil",
          price: 15333,
        },
      ]

      const res = await axios.post(environment.apiurl + '/payment/create-payment-intent', {
        passengers: passengers,
      });

      const {clientSecret} = res.data.data;
      console.log({clientSecret})
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });


      if (confirmError) {
        setError(confirmError.message!);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentIntentId(paymentIntent.id);
        console.log({paymentIntent})
        setSucceeded(true);
      } else {
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="relative mx-auto flex flex-col-reverse md:flex-row gap-8 pb-20">
      <div className="flex-[2] flex flex-col gap-4">
        <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-2">
          <div className="flex items-center gap-4">
            <span className="border border-emerald-700 rounded-xl h-8 w-8 flex justify-center items-center text-black">1</span>
            <p className="text-[#353535] font-medium text-lg">Passengers</p>
          </div>
          <p className="font-medium text-black mt-2">Main passenger</p>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
            <div className="space-y-1">
              <p className="font-normal text-sm text-black/70">Name</p>
              <Input
                type="name"
                className="font-normal text-black rounded-lg border-gray-300 border p-2"
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-1">
              <p className="font-normal text-sm text-black/70">Last name</p>
              <Input
                type="lastName"
                className="font-normal text-black rounded-lg border-gray-300 border p-2"
                placeholder="Doe"
                required
              />
            </div>
            <div className="space-y-1">
              <p className="font-normal text-sm text-black/70">Email</p>
              <Input
                type="email"
                className="font-normal text-black rounded-lg border-gray-300 border p-2"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div className="space-y-1">
              <p className="font-normal text-sm text-black/70">Phone number</p>
              <Input
                type="phoneNumber"
                className="font-normal text-black rounded-lg border-gray-300 border p-2"
                placeholder="+123 456 78"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="border border-emerald-700 rounded-xl h-8 w-8 flex justify-center items-center text-black">2</span>
            <p className="text-[#353535] font-medium text-lg">Extras</p>
          </div>

          <div className="rounded-xl flex gap-4 border-gray-300 border p-2 col-span-2">
            <div className="rounded-xl p-3 flex justify-center items-center bg-emerald-700">
              <Luggage color="white" size={35} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-black text-[16px]">Included Per Person</p>
              <p className="font-normal text-gray-600 text-sm">2 Hold Luggages | 23kg</p>
            </div>
          </div>

          <div className="rounded-xl flex flex-col items-start sm:flex-row justify-between sm:items-center gap-4 border-gray-300 border p-2 col-span-2">
            <div className="flex items-center gap-4">
              <div className="rounded-xl p-3 bg-gray-400/20">
                <Luggage color="gray" size={35} />
              </div>
              <div>
                <p className="font-normal text-black">Additional Luggage</p>
                <p className="font-normal text-black">23kg</p>
              </div>
            </div>
            <div className="flex gap-4 items-center w-full sm:w-1/2 sm:justify-end justify-center sm:pr-4">
              <button className="border border-gray-500 rounded-xl p-2 cursor-pointer">
                <MinusIcon size={20} />
              </button>
              <p className="font-medium text-black">0</p>
              <button className="border border-gray-500 rounded-xl p-2 cursor-pointer">
                <PlusIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="border border-emerald-700 rounded-xl h-8 w-8 flex justify-center items-center text-black">3</span>
            <p className="text-[#353535] font-medium text-lg">Payment method</p>
          </div>

          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <p className="font-normal text-sm text-black/70">Card Information</p>
              <div className="font-normal text-black rounded-lg border-gray-300 border p-2">
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#fa755a",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            className="transition-colors w-1/2 sm:w-fit px-12 border-destructive border rounded-lg text-base text-destructive"
            variant={"ghost"}
          >
            Back
          </Button>
          <Button
            onClick={handlePayment}
            className="transition-colors w-1/2 sm:w-fit px-12 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-base"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {succeeded && <p className="text-green-500">Payment succeeded!</p>}
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-xl p-4 block border border-gray-300">
          <div className="flex flex-col">
            <p className="bg-emerald-700 px-2 rounded-full w-min text-gray-100">HakBus</p>
            <div className="flex items-center mt-2 gap-8">
              <div className="flex items-center gap-2 justify-between w-full">
                <p className="font-medium text-lg text-black capitalize">From</p>
                <hr className="h-[0.5px] w-full bg-gray-800" />
                <p className="font-medium text-lg text-black capitalize">To</p>
              </div>
            </div>
            <div className="flex items-center mt-2 gap-8">
              <div className="flex items-center gap-2 justify-between w-full">
                <p className="text-black text-md capitalize">New York</p>
                <hr className="h-[0.5px] w-full bg-gray-800" />
                <p className="text-black text-md capitalize">Los Angeles</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2">
                <Calendar color="gray" size={20} />
                <p className="text-black text-sm">Departure</p>
                <p className="font-medium text-black text-sm">01/01/2025</p>
              </div>
              <div className="flex items-center gap-2">
                <TimerIcon color="gray" size={20} />
                <p className="text-black text-sm">Duration</p>
                <p className="font-medium text-black text-sm">5h 30m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-black text-lg font-medium">Passenger Total</p>
              <p className="text-black text-lg font-medium">$200.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-black text-lg font-medium">Additional Luggage</p>
              <p className="text-black text-lg font-medium">$50.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-black text-lg font-medium">Total</p>
              <p className="text-black text-lg font-medium">$250.00</p>
            </div>
          </div>
        </div>
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
