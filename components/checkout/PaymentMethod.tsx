"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { calculatePassengerPrices } from "../hooks/use-passengers";
import { Ticket } from "@/models/ticket";
import { useCheckoutStore, usePaymentSuccessStore } from "@/store";
import { ApiResponse } from "@/interfaces/api";
import useUser from "../hooks/use-user";
import { useTranslation } from "react-i18next";
import { Booking } from "@/models/booking";
import { Switch } from "../ui/switch";
import { account } from "@/appwrite.config";
import { Loader2 } from "lucide-react";

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
  const [saveCardInfo, setSaveCardInfo] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [useSavedCard, setUseSavedCard] = useState(false);

  const { setBookingDetails, bookingDetails, setIsPaymentSuccess } =
    usePaymentSuccessStore();
  const {
    passengers,
    outboundTicket,
    returnTicket,
    selectedFlex,
    flexPrice,

    setSelectedFlex,
    resetCheckout,
  } = useCheckoutStore();

  const { user } = useUser();

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

  const totalPrice = outboundTotal + returnTotal + flexPrice;

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
      console.log({ pmid: user?.prefs?.stripe_payment_method_id });

      const res = await axios.post<any>(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/payment/create-payment-intent?customer_id=${
          user?.prefs?.stripe_customer_id || ""
        }&payment_method_id=${
          user?.prefs?.stripe_payment_method_id || ""
        }&use_saved_card=${useSavedCard}`,
        { passengers, amount_in_cents: totalPrice * 100 }
      );

      console.log({ auto_capture: res.data });

      if (res.data.auto_capture) {
        await createBookings(res.data.data.id);
        return router.push("/checkout/success");
        // resetCheckout();
      }

      console.log({ paymentRes: res.data });
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
        resetCheckout();
      }
    } catch (err: any) {
      console.log({ err });
      toast({ description: err.response.data.message, variant: "destructive" });
    } finally {
      setLoading(false);
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

    const { setIsPaymentSuccess, setBookingDetails } =
      usePaymentSuccessStore.getState();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create/${ticket.operator}/${
          user ? user.$id : null
        }/${ticket._id}`,
        {
          passengers: passengersWithPrices,
          travel_flex: selectedFlex,
          payment_intent_id: paymentIntentId,
          platform: "web",
          flex_price: isReturn ? 0 : flexPrice,
          total_price: ticketTotal + (isReturn ? 0 : flexPrice),
          operator_price: isReturn
            ? operatorReturnTotal
            : operatorOutboundTotal,
          departure_station,
          arrival_station,
          departure_station_label,
          arrival_station_label,
          is_using_deposited_money: false,
          deposit_spent: 0,
          stop: ticket.stops[0],
          is_return: isReturn,
        }
      );

      const newBooking: Booking = response.data.data;

      if (typeof window !== "undefined") {
        const savedBookings = JSON.parse(
          localStorage.getItem("noUserBookings") || "[]"
        );
        const allBookings = [...savedBookings, newBooking];
        localStorage.setItem("noUserBookings", JSON.stringify(allBookings));
      }
      console.log({ newBooking });
      setIsPaymentSuccess(true);
      setBookingDetails({
        bookingId: newBooking._id,
        transactionId: newBooking.metadata.payment_intent_id,
        departureStation: departure_station_label,
        arrivalStation: arrival_station_label,
        departureDate: new Date(newBooking.departure_date),
        price: ticketTotal + (isReturn ? 0 : flexPrice),
        operator: ticket.metadata.operator_name,
      });
    } catch (error) {
      console.error("Booking creation failed:", error);

      setIsPaymentSuccess(false);
      setBookingDetails(null);
    } finally {
      if (saveCardInfo && !user?.prefs?.stripe_payment_method_id) {
        handleSaveCardInfo();
      }
    }
  };

  const handleSaveCardInfo = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-setup-intent?customer_id=${user?.prefs?.stripe_customer_id}&user_id=${user?.$id}`
      );
      console.log({ res });
    } catch (error: any) {
      console.log(error);
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
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

  async function fetchPaymentMethods() {
    try {
      const user = await account.get();
      console.log({ acc: user });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${user?.prefs?.stripe_customer_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const data: any = await response.json();
      console.log(data.data);
      setPaymentMethods(data.data.data);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  enum CardNetwork {
    Visa = "visa",
    Mastercard = "mastercard",
    AmericanExpress = "amex",
    Discover = "discover",
    DinersClub = "diners",
    JCB = "jcb",
    UnionPay = "unionpay",
    Unknown = "unknown",
  }

  const renderNetworkLogo = (network: string) => {
    switch (network.toLowerCase()) {
      case CardNetwork.Visa:
        return (
          <svg
            viewBox="0 0 48 32"
            className="h-6 w-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="32" rx="4" fill="#1434CB" />
            <path
              d="M19.425 21.6L21.525 10.4H24.6L22.5 21.6H19.425ZM30.975 10.8C30.375 10.575 29.4 10.325 28.2 10.325C25.575 10.325 23.7 11.725 23.7 13.65C23.7 15.05 24.975 15.825 25.95 16.3C26.95 16.775 27.3 17.075 27.3 17.5C27.3 18.15 26.55 18.45 25.875 18.45C24.9 18.45 24.4 18.3 23.55 17.9L23.25 17.75L22.875 20.35C23.625 20.725 24.9 21.05 26.225 21.05C29.025 21.05 30.875 19.675 30.875 17.625C30.875 16.125 29.9 15.05 28.05 14.125C27.175 13.625 26.625 13.325 26.625 12.85C26.625 12.425 27.1 11.975 28.125 11.975C28.95 11.975 29.575 12.15 30.075 12.4L30.375 12.55L30.975 10.8Z"
              fill="white"
            />
            <path
              d="M35.25 10.4H37.725L40.05 21.6H37.2L36.825 19.575H33.75L33.075 21.6H30.3L33.6 10.675C33.9 10.5 34.425 10.4 35.25 10.4ZM36.375 17.45L35.7 14.225L35.025 17.45H36.375Z"
              fill="white"
            />
            <path
              d="M14.025 10.4L11.1 17.85L10.725 15.9L9.375 12.325C9.375 12.325 9.075 10.4 7.5 10.4H3L2.925 10.675C2.925 10.675 4.725 11.075 6.3 12.325L8.85 21.6H11.85L17.025 10.4H14.025Z"
              fill="white"
            />
          </svg>
        );
      case CardNetwork.Mastercard:
        return (
          <svg
            viewBox="0 0 48 32"
            className="h-6 w-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="32" rx="4" fill="#F79E1B" />
            <circle cx="19" cy="16" r="10" fill="#EB001B" />
            <circle cx="29" cy="16" r="10" fill="#FF5F00" />
            <path
              d="M24 12.5C25.1272 13.3991 25.8207 14.6997 26 16C25.8207 17.3003 25.1272 18.6009 24 19.5C22.8728 18.6009 22.1793 17.3003 22 16C22.1793 14.6997 22.8728 13.3991 24 12.5Z"
              fill="white"
            />
          </svg>
        );
      case CardNetwork.AmericanExpress:
        return (
          <svg
            viewBox="0 0 48 32"
            className="h-6 w-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="32" rx="4" fill="#2557D6" />
            <path
              d="M9.5 14.925H11.85L10.675 12.625L9.5 14.925ZM37.025 10.4L34.1 17.85L33.725 15.9L32.375 12.325C32.375 12.325 32.075 10.4 30.5 10.4H26.025L25.95 10.675C25.95 10.675 27.75 11.075 29.325 12.325L31.875 21.6H34.875L42.075 10.4H37.025Z"
              fill="white"
            />
            <path
              d="M19.425 21.6L21.525 10.4H24.6L22.5 21.6H19.425ZM30.975 10.8C30.375 10.575 29.4 10.325 28.2 10.325C25.575 10.325 23.7 11.725 23.7 13.65C23.7 15.05 24.975 15.825 25.95 16.3C26.95 16.775 27.3 17.075 27.3 17.5C27.3 18.15 26.55 18.45 25.875 18.45C24.9 18.45 24.4 18.3 23.55 17.9L23.25 17.75L22.875 20.35C23.625 20.725 24.9 21.05 26.225 21.05C29.025 21.05 30.875 19.675 30.875 17.625C30.875 16.125 29.9 15.05 28.05 14.125C27.175 13.625 26.625 13.325 26.625 12.85C26.625 12.425 27.1 11.975 28.125 11.975C28.95 11.975 29.575 12.15 30.075 12.4L30.375 12.55L30.975 10.8Z"
              fill="white"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 bg-secondary-bg/20 text-primary-bg rounded-full font-semibold">
              3
            </span>
            <p className="text-[#353535] font-medium text-lg ">
              {t("paymentMethod.title")}
            </p>
          </div>

          <p className="text-sm text-gray-600 my-4">
            {t("paymentMethod.description")}
          </p>

          {/* {balance > 0 && (
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
          )} */}

          {
            <div
              className={`${
                Math.abs(totalPrice) < 0.01 ? "hidden" : ""
              } space-y-4`}
            >
              <div className="flex-col flex gap-4 justify-between">
                {!user?.prefs?.stripe_payment_method_id && (
                  <div className="text-gray-700 text-sm flex gap-2 items-center">
                    <p>Save card info for future payments</p>
                    <Switch
                      onCheckedChange={() => setSaveCardInfo(!saveCardInfo)}
                    />
                  </div>
                )}

                {user?.prefs?.stripe_payment_method_id && (
                  <div className="space-y-2 ">
                    <h3 className="font-medium text-gray-700">
                      Choose your saved payment methods
                    </h3>
                    {paymentMethods?.map((method) => (
                      <div
                        key={method?.id}
                        onClick={() => setUseSavedCard(!useSavedCard)}
                        className={`
                          cursor-pointer p-3 border border-gray-300 rounded-md
                          ${
                            useSavedCard
                              ? "bg-blue-50 border-blue-500 hover:bg-blue-100"
                              : "hover:bg-gray-100"
                          }
                          flex items-center justify-between
                        `}
                      >
                        <div className="flex gap-2">
                          {renderNetworkLogo(method?.card?.brand)}{" "}
                          <h3 className="font-medium text-gray-700">
                            ••••{method?.card?.last4}
                          </h3>
                          <h3 className="font-medium text-gray-700">
                            (Exp: {method?.card?.exp_month}/
                            {method?.card?.exp_year})
                          </h3>
                        </div>
                        {useSavedCard && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className={`relative ${useSavedCard && "hidden"}`}>
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t("login.orContinueWith")}
                    </span>
                  </div>
                </div>
                <h3
                  className={`font-medium text-gray-700 ${
                    useSavedCard && "hidden"
                  }`}
                >
                  {t("paymentMethod.cardInformation")}
                </h3>
                <div
                  className={`grid grid-cols-2 gap-2 ${
                    useSavedCard && "hidden"
                  }`}
                >
                  <div
                    id="card-number-element"
                    className="col-span-2 p-4 bg-primary-bg/5 rounded-xl"
                  ></div>
                  <div
                    id="card-expiry-element"
                    className="p-4 bg-primary-bg/5 rounded-xl"
                  ></div>
                  <div
                    id="card-cvc-element"
                    className="p-4 bg-primary-bg/5 rounded-xl"
                  ></div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={
            // totalPrice <= depositAmount
            //   ? handleFullDepositPayment
            handlePayment
          }
          className="px-6 py-3.5 button-gradient text-white hover:bg-primary-bg/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-bg h-12 rounded-xl w-full sm:w-40"
          disabled={!stripe || loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5 mx-auto" />
          ) : (
            t("paymentMethod.completePayment")
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
