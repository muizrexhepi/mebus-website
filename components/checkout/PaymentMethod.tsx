"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { environment } from "@/environment";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { calculatePassengerPrices } from "../hooks/use-passengers";
import { Ticket } from "@/models/ticket";
import { account } from "@/appwrite.config";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserBalance } from "@/actions/users";
import { Input } from "../ui/input";
import { useDepositStore, useCheckoutStore } from "@/store";
import { ApiResponse } from "@/interfaces/api";
import useUser from "../hooks/use-user";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<any>(null);
  const [cardExpiry, setCardExpiry] = useState<any>(null);
  const [cardCvc, setCardCvc] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    passengers,
    outboundTicket,
    returnTicket,
    selectedFlex,
    flexPrice,

    setSelectedFlex,
    setFlexPrice,
    resetCheckout,
  } = useCheckoutStore();

  const { user } = useUser();
  const [balance, setBalance] = useState<number>(0);
  const [isGreater, setIsGreater] = useState<boolean>(false);
  const { useDeposit, setDepositAmount, setUseDeposit, depositAmount } =
    useDepositStore();

  useEffect(() => {
    const fetchDepositAmount = async () => {
      if (user) {
        try {
          const balance = await getUserBalance(user.$id);

          if (balance / 100 > totalPrice) {
            setIsGreater(true);
          }

          setBalance(balance);
        } catch (error) {
          console.error("Failed to fetch deposit amount:", error);
        }
      }
    };

    fetchDepositAmount();
  }, [user]);

  useEffect(() => {
    if (!selectedFlex) {
      setSelectedFlex("no_flex");
    }
  }, [selectedFlex, setSelectedFlex]);

  const calculateTicketTotal = (ticket: Ticket) => {
    const adultPrice = ticket.stops[0].other_prices.our_price;
    const childPrice = ticket.stops[0].other_prices.our_children_price;
    const adultCount = passengers.filter((p) => p.age > 10).length;
    const childCount = passengers.filter((p) => p.age <= 10).length;
    return adultPrice * adultCount + childPrice * childCount;
  };

  const calculateOperatorTicketTotal = (ticket: Ticket) => {
    const adultPrice = ticket.stops[0].price;
    const childPrice = ticket.stops[0].children_price;
    const adultCount = passengers.filter((p) => p.age > 10).length;
    const childCount = passengers.filter((p) => p.age <= 10).length;
    return adultPrice * adultCount + childPrice * childCount;
  };

  const outboundTotal = outboundTicket
    ? calculateTicketTotal(outboundTicket)
    : 0;
  const returnTotal = returnTicket ? calculateTicketTotal(returnTicket) : 0;
  const operatorOutboundTotal = outboundTicket
    ? calculateOperatorTicketTotal(outboundTicket)
    : 0;
  const operatorReturnTotal = returnTicket
    ? calculateOperatorTicketTotal(returnTicket)
    : 0;
  const operatorTotalPrice = operatorOutboundTotal + operatorReturnTotal;
  const totalPrice = outboundTotal + returnTotal + flexPrice;

  const handleUseDepositChange = (checked: boolean) => {
    if (!checked) {
      setDepositAmount(0);
    }
    setUseDeposit(checked);
  };

  const finalPrice = useDeposit
    ? Math.max(totalPrice - depositAmount, 0)
    : totalPrice;

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
        await createBookings(paymentIntent.id);

        router.push("/checkout/success");
      }
    } catch (err: any) {
      toast({ description: err.response.data.message, variant: "destructive" });
    } finally {
      setLoading(false);
      resetCheckout();
    }
  };

  const createBookings = async (paymentIntentId: string) => {
    const bookings = [];

    if (outboundTicket) {
      const outboundBooking = await createBooking(
        outboundTicket,
        false,
        paymentIntentId
      );
      bookings.push(outboundBooking);
    }

    if (returnTicket) {
      const returnBooking = await createBooking(
        returnTicket,
        true,
        paymentIntentId
      );
      bookings.push(returnBooking);
    }

    return bookings;
  };

  const createBooking = async (
    ticket: Ticket,
    isReturn: boolean,
    paymentIntentId: string
  ) => {
    const departure_station = ticket.stops[0].from._id;
    const arrival_station = ticket.stops[0].to._id;
    const departure_station_label = ticket.stops[0].from.name;
    const arrival_station_label = ticket.stops[0].to.name;
    const passengersWithPrices = calculatePassengerPrices(passengers, ticket);
    const ticketTotal = isReturn ? returnTotal : outboundTotal;
    return axios
      .post(
        `${environment.apiurl}/booking/create/${ticket.operator}/${
          user ? user.$id : null
        }/${ticket._id}`,
        {
          passengers: passengersWithPrices,
          travel_flex: selectedFlex,
          payment_intent_id: paymentIntentId,
          platform: "web",
          flex_price: isReturn ? 0 : flexPrice,
          total_price: ticketTotal + (isReturn ? 0 : flexPrice),
          operator_price: operatorTotalPrice,
          departure_station,
          arrival_station,
          departure_station_label,
          arrival_station_label,
          is_using_deposited_money: useDeposit,
          deposit_spent: isReturn ? 0 : depositAmount * 100 || 0,
          stop: ticket.stops[0],
          is_return: isReturn,
        }
      )
      .then((res: AxiosResponse<ApiResponse>) => {
        if (typeof window != "undefined") {
          const savedBookings = JSON.parse(
            localStorage.getItem("noUserBookings") || "[]"
          );

          const newBooking = res.data.data;
          const allBookings = [...savedBookings, newBooking];
          localStorage.setItem("noUserBookings", JSON.stringify(allBookings));
        }
      });
  };

  const handleFullDepositPayment = async () => {
    setLoading(true);

    try {
      await createBookings("full_deposit_payment");
      resetCheckout();
      router.push("/checkout/success");
    } catch (error: any) {
      toast({
        description:
          error.response?.data?.message || "An error occurred during payment",
        variant: "destructive",
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
              {t("paymentMethod.title")}
            </p>
          </div>

          <p className="text-sm text-gray-600 my-4">
            {t("paymentMethod.description")}
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
                    {t("paymentMethod.useAccountBalance")}
                  </label>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  €{(balance / 100).toFixed(2)} {t("paymentMethod.available")}
                </span>
              </div>
              {useDeposit && (
                <div className="mt-4">
                  <Input
                    type="number"
                    min={1}
                    defaultValue={1}
                    max={isGreater ? totalPrice : balance / 100}
                    placeholder="Amount to use from balance"
                    value={depositAmount}
                    onChange={(e) => {
                      const value = Math.min(
                        Number(e.target.value),
                        isGreater ? totalPrice : balance / 100
                      );
                    
                      setDepositAmount(Math.round(value * 100) / 100);
                    }}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          )}

          {
            <div
            className={`${Math.abs(totalPrice - depositAmount) < 0.01 ? "hidden" : ""} space-y-4`}
            >
              <h3 className="font-medium text-gray-700">
                {t("paymentMethod.cardInformation")}
              </h3>
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
            </div>
          }
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={
            totalPrice <= depositAmount
              ? handleFullDepositPayment
              : handlePayment
          }
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          disabled={!stripe || loading}
        >
          {loading
            ? t("paymentMethod.processing")
            : t("paymentMethod.completePayment")}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
