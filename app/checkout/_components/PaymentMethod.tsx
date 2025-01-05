"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { calculatePassengerPrices } from "@/components/hooks/use-passengers";
import { Ticket } from "@/models/ticket";
import useSearchStore, {
  useCheckoutStore,
  usePaymentSuccessStore,
} from "@/store";
import useUser from "@/components/hooks/use-user";
import { useTranslation } from "react-i18next";
import { Booking } from "@/models/booking";
import { Switch } from "@/components/ui/switch";
import { account } from "@/appwrite.config";
import { Loader2 } from "lucide-react";
import OrderSummary from "./OrderSummary";

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const { passengers: passengerAmount } = useSearchStore();

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

    return (
      adultPrice * passengerAmount.adults ||
      1 + childPrice * passengerAmount.children ||
      0
    );
  };

  const calculateOperatorTicketTotal = (ticket: Ticket) => {
    const adultPrice = ticket.stops[0].price;
    const childPrice = ticket.stops[0].children_price;
    return (
      adultPrice * passengerAmount.adults ||
      1 + childPrice * passengerAmount.children ||
      0
    );
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
        `${process.env.NEXT_PUBLIC_API_URL
        }/payment/create-payment-intent?customer_id=${user?.prefs?.stripe_customer_id || ""
        }&payment_method_id=${selectedPaymentMethod?.id || ""
        }&use_saved_card=${!!selectedPaymentMethod}`,
        { passengers, amount_in_cents: totalPrice * 100 }
      );

      console.log({ auto_capture: res.data });

      if (res.data.auto_capture) {
        await createBookings(res.data.data.id);
        return router.push("/checkout/success");
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
      toast({
        description: err?.response?.data?.message,
        variant: "destructive",
      });
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
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create/${ticket.operator}/${user ? user.$id : null
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
    if (!stripe || !elements) {
      toast({
        description: "Stripe is not initialized",
        variant: "destructive",
      });
      return;
    }

    if (!user?.prefs?.stripe_payment_method_id) {
      return toast({
        description: "No such customer",
        variant: "destructive"
      })
    }

    try {
      const cardElement = elements.getElement("cardNumber");

      if (!cardElement) {
        toast({
          description: "Card details not found",
          variant: "destructive",
        });
        return;
      }

      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: user?.name || undefined,
            email: user?.email || undefined,
          },
        });
      console.log({ paymentMethod });

      if (stripeError) {
        toast({
          description: stripeError.message || "Failed to save payment method",
          variant: "destructive",
        });
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-setup-intent?customer_id=${user?.prefs?.stripe_customer_id}&user_id=${user?.$id}`,
        {
          payment_method_id: paymentMethod?.id,
        }
      );

      console.log({ res });

      fetchPaymentMethods();

      toast({
        description: "Payment method saved successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        description:
          error?.response?.data?.message || "Failed to save payment method",
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
      if (!user?.prefs?.stripe_customer_id) {
        setPaymentMethods([]);
        return console.info("No such customer")
      }
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

  const handleSelectPaymentMethod = (method: any) => {
    try {
      if (selectedPaymentMethod == method) {
        setSelectedPaymentMethod(null);
      } else {
        setSelectedPaymentMethod(method);
      }
    } catch (error) {
      console.log({ error });
    }
  };

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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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

          {
            <div
              className={`${Math.abs(totalPrice) < 0.01 ? "hidden" : ""
                } space-y-4`}
            >
              <div className="flex-col flex gap-4 justify-between">
                {user && !user?.prefs?.stripe_payment_method_id && (
                  <div className="text-gray-700 text-sm flex gap-2 items-center">
                    <p>Save card info for future payments</p>
                    <Switch
                      onCheckedChange={() => setSaveCardInfo(!saveCardInfo)}
                      className="data-[state=checked]:bg-primary-accent"
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
                        onClick={() => handleSelectPaymentMethod(method)}
                        className={`
                          cursor-pointer p-3 border border-gray-300 rounded-lg
                          ${selectedPaymentMethod?.id == method.id
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
                        {selectedPaymentMethod?.id == method.id && (
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

                <div
                  className={`relative ${selectedPaymentMethod && "hidden"}`}
                >
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
                  className={`font-medium text-gray-700 ${selectedPaymentMethod && "hidden"
                    }`}
                >
                  {t("paymentMethod.cardInformation")}
                </h3>
                <div
                  className={`grid grid-cols-2 gap-2 ${selectedPaymentMethod && "hidden"
                    }`}
                >
                  <div
                    id="card-number-element"
                    className="col-span-2 p-4 bg-primary-bg/5 rounded-lg"
                  ></div>
                  <div
                    id="card-expiry-element"
                    className="p-4 bg-primary-bg/5 rounded-lg"
                  ></div>
                  <div
                    id="card-cvc-element"
                    className="p-4 bg-primary-bg/5 rounded-lg"
                  ></div>
                </div>
              </div>{" "}
              <div className="flex items-center justify-end space-x-2 mt-6">
                <span className="text-sm text-gray-500 pb-0.5">Powered by</span>
                <svg
                  className="h-4 w-10"
                  viewBox="0 0 60 25"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                    fill="#6b7280"
                  />
                </svg>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="flex-1 flex flex-col md:hidden gap-4">
        <OrderSummary />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          className="rounded-lg h-12 bg-primary-bg px-6 py-3.5 gap-1"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          onClick={handlePayment}
          className="px-6 py-3.5 button-gradient text-white hover:bg-primary-bg/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-bg h-12 rounded-lg w-full sm:w-40"
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
