"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { environment } from "@/environment";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  getPassengersFromStorage,
  PassengerData,
} from "../hooks/use-passengers";
import { Ticket } from "@/models/ticket";
import { TRAVEL_FLEX_PRICES } from "@/lib/data";

const PaymentMethod = ({ selectedTicket }: { selectedTicket: Ticket }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<any>(null);
  const [cardExpiry, setCardExpiry] = useState<any>(null);
  const [cardCvc, setCardCvc] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  const [selectedFlex, setSelectedFlex] = useState<string | null>(null);
  const [flexPrice, setFlexPrice] = useState<number>(0);

  useEffect(() => {
    const storedPassengers = getPassengersFromStorage();
    console.log({ pasagjer: storedPassengers });
    setPassengers(storedPassengers);
    const storedFlex = localStorage.getItem("flex_options");
    if (storedFlex) {
      setSelectedFlex(storedFlex);
      calculateFlexPrice(storedFlex);
    }
  }, []);

  const calculateFlexPrice = (flex: string | null) => {
    if (flex === "premium") {
      setFlexPrice(TRAVEL_FLEX_PRICES.PREMIUM);
    } else if (flex === "basic") {
      setFlexPrice(TRAVEL_FLEX_PRICES.BASIC);
    } else {
      setFlexPrice(TRAVEL_FLEX_PRICES.NO_FLEX);
    }
  };

  useEffect(() => {
    const updateSelectedPassengers = () => {
      const storedPassengers = getPassengersFromStorage();
      setPassengers(storedPassengers);
    };

    updateSelectedPassengers();

    window.addEventListener("passengersUpdated", updateSelectedPassengers);

    return () => {
      window.removeEventListener("passengersUpdated", updateSelectedPassengers);
    };
  }, []);

  useEffect(() => {
    const updateSelectedFlex = () => {
      const storedFlex = localStorage.getItem("flex_options");
      if (storedFlex) {
        setSelectedFlex(storedFlex);
        calculateFlexPrice(storedFlex);
      }
      const storedPassengers = getPassengersFromStorage();
      setPassengers(storedPassengers);
      console.log({ storedPassengers });
    };

    updateSelectedFlex();

    window.addEventListener("flexOptionChanged", updateSelectedFlex);

    return () => {
      window.removeEventListener("flexOptionChanged", updateSelectedFlex);
    };
  }, []);

  const adultPrice = selectedTicket?.stops[0].other_prices.our_price;
  const childPrice = selectedTicket?.stops[0].other_prices.our_children_price;

  const adultCount = passengers.filter((p) => p.age > 10).length;
  const childCount = passengers.filter((p) => p.age <= 10).length;

  const adultTotal = adultPrice * adultCount;
  const childTotal = childPrice * childCount;
  const passengerTotal = adultTotal + childTotal;

  const totalPrice = passengerTotal + flexPrice;

  console.log({ passengers, selectedFlex, selectedTicket, flexPrice });

  useEffect(() => {
    if (stripe && elements) {
      const cardNumberElement = elements.create("cardNumber");
      const cardExpiryElement = elements.create("cardExpiry");
      const cardCvcElement = elements.create("cardCvc");

      cardNumberElement.mount("#card-number-element");
      cardExpiryElement.mount("#card-expiry-element");
      cardCvcElement.mount("#card-cvc-element");

      setCardNumber(cardNumberElement);
      setCardExpiry(cardExpiryElement);
      setCardCvc(cardCvcElement);
    }
  }, [stripe, elements]);

  const handlePayment = async () => {
    if (!stripe || !elements || !cardNumber || !cardExpiry || !cardCvc) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post<{ data: { clientSecret: string } }>(
        `${environment.apiurl}/payment/create-payment-intent`,
        { passengers, amount_in_cents: totalPrice * 100 }
      );

      const { clientSecret } = res.data.data;
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumber,
            billing_details: {},
          },
        });

      if (confirmError) {
        toast({
          description: confirmError.message || "Something went wrong!",
          variant: "destructive",
        });
      } else if (paymentIntent.status === "succeeded") {
        await axios
          .post(
            `${environment.apiurl}/booking/create/${
              selectedTicket.operator
            }/${null}/${selectedTicket._id}`,
            {
              passengers,
              travel_flex: selectedFlex,
              payment_intent_id: paymentIntent?.id,
              platform: "web",
              flex_price: flexPrice,
              total_price: totalPrice,
            }
          )
          .then((res) => {
            localStorage.removeItem("passengers");
            router.push("/checkout/success");
          })
          .catch((err) => {
            toast({
              description: err?.response?.data?.message,
              variant: "destructive",
            });
          });
      }
    } catch (err) {
      console.error({ err });
      toast({ description: "Something went wrong!", variant: "destructive" });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col border border-gray-300 bg-white rounded-xl p-4 gap-4">
        <div className="flex items-center gap-4">
          <span className="border border-emerald-700 rounded-xl h-8 w-8 flex justify-center items-center text-black">
            3
          </span>
          <p className="text-[#353535] font-medium text-lg">Payment method</p>
        </div>

        <div className="space-y-4">
          <p className="font-normal text-sm text-black/70">Card Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div
              id="card-number-element"
              className="col-span-2 p-2.5 border border-gray-300 rounded-md h-10"
            ></div>
            <div
              id="card-expiry-element"
              className="p-2.5 border border-gray-300 rounded-md h-10"
            ></div>
            <div
              id="card-cvc-element"
              className="p-2.5 border border-gray-300 rounded-md h-10"
            ></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={() => router.back()}
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
    </>
  );
};

export default PaymentMethod;
