"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { environment } from "@/environment";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  calculatePassengerPrices,
  getPassengersFromStorage,
  PassengerData,
} from "../hooks/use-passengers";
import { Ticket } from "@/models/ticket";
import { TRAVEL_FLEX_PRICES } from "@/lib/data";
import { account } from "@/appwrite.config";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserBalance } from "@/actions/users";
import { Input } from "../ui/input";
import { useDepositStore } from "@/store";

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
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const { useDeposit, setDepositAmount, setUseDeposit, depositAmount } =
    useDepositStore();

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDepositAmount = async () => {
      if (user) {
        try {
          const balance = await getUserBalance(user.$id);
          setBalance(balance);
        } catch (error) {
          console.error("Failed to fetch deposit amount:", error);
        }
      }
    };

    fetchDepositAmount();
  }, [user]);

  useEffect(() => {
    const storedPassengers = getPassengersFromStorage();
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

  const handleUseDepositChange = (checked: boolean) => {
    if (!checked) {
      setDepositAmount(0);
    }
    setUseDeposit(checked);
    window.dispatchEvent(
      new CustomEvent("useDepositChanged", {
        detail: { useDeposit: checked, depositAmount },
      })
    );
  };

  const finalPrice = useDeposit
    ? Math.max(totalPrice - depositAmount, 0)
    : totalPrice;

  console.log({
    passengers,
    selectedFlex,
    selectedTicket,
    flexPrice,
    finalPrice,
  });

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
        { passengers, amount_in_cents: finalPrice * 100 }
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
        const departure_station = selectedTicket.stops[0].from._id;
        const arrival_station = selectedTicket.stops[0].to._id;
        const departure_station_label = selectedTicket.stops[0].from.name;
        const arrival_station_label = selectedTicket.stops[0].to.name;

        const passengersWithPrices = calculatePassengerPrices(passengers, selectedTicket);
        console.log({passengersWithPrices})
        await axios
          .post(
            `${environment.apiurl}/booking/create/${selectedTicket.operator}/${
              user ? user.$id : null
            }/${selectedTicket._id}`,
            {
              passengers: passengersWithPrices,
              travel_flex: selectedFlex,
              payment_intent_id: paymentIntent?.id,
              platform: "web",
              flex_price: flexPrice,
              total_price: totalPrice,
              departure_station,
              arrival_station,
              departure_station_label,
              arrival_station_label,
              is_using_deposited_money: useDeposit,
              deposit_spent: depositAmount * 100 || 0,
              stop: selectedTicket.stops[0],
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
    } catch (err: any) {
      toast({ description: err.response.data.message, variant: "destructive" });
    }

    setLoading(false);
  };

  const handleFullDepositPayment = async () => {
    setLoading(true);
  
    try {
      const departure_station = selectedTicket.stops[0].from._id;
      const arrival_station = selectedTicket.stops[0].to._id;
      const departure_station_label = selectedTicket.stops[0].from.name;
      const arrival_station_label = selectedTicket.stops[0].to.name;
  
      const passengersWithPrices = calculatePassengerPrices(passengers, selectedTicket);
      console.log({passengersWithPrices});
  
      await axios.post(
        `${environment.apiurl}/booking/create/${selectedTicket.operator}/${
          user ? user.$id : null
        }/${selectedTicket._id}`,
        {
          passengers: passengersWithPrices,
          travel_flex: selectedFlex,
          payment_intent_id: "full_deposit_payment",
          platform: "web",
          flex_price: flexPrice,
          total_price: totalPrice,
          departure_station,
          arrival_station,
          departure_station_label,
          arrival_station_label,
          is_using_deposited_money: useDeposit,
          deposit_spent: depositAmount * 100 || 0,
          stop: selectedTicket.stops[0],
        }
      );
  
      localStorage.removeItem("passengers");
      router.push("/checkout/success");
  
    } catch (error: any) {
      toast({ 
        description: error.response?.data?.message || "An error occurred during payment", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
              3
            </span>
            <p className="text-[#353535] font-medium text-lg ">
              Payment Method
            </p>
          </div>

          <p className="text-sm text-gray-600 my-4">
            Choose your preferred payment method. You can use your account
            balance for partial or full payment, with any remaining amount to be
            paid by card.
          </p>

          {balance > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="use-deposit"
                    checked={useDeposit}
                    onCheckedChange={handleUseDepositChange}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="use-deposit"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Use account balance
                  </label>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  €{(balance / 100).toFixed(2)} available
                </span>
              </div>
              {useDeposit && (
                <div className="mt-4">
                  <Input
                    type="number"
                    min={1}
                    defaultValue={1}
                    max={balance / 100}
                    placeholder="Amount to use from balance"
                    value={depositAmount}
                    onChange={(e) => {
                      const value = Math.min(
                        Number(e.target.value),
                        balance / 100
                      );
                      setDepositAmount(value);
                    }}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          )}

         {<div className={`${totalPrice <= depositAmount && 'hidden'} space-y-4`}>
            <h3 className="font-medium text-gray-700">Card Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                id="card-number-element"
                className="col-span-2 p-3 border border-gray-300 rounded-md h-12"
              ></div>
              <div
                id="card-expiry-element"
                className="p-3 border border-gray-300 rounded-md h-12"
              ></div>
              <div
                id="card-cvc-element"
                className="p-3 border border-gray-300 rounded-md h-12"
              ></div>
            </div>
          </div>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={totalPrice <= depositAmount ? handleFullDepositPayment : handlePayment}
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
