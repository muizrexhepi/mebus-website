"use client";

import { useEffect, useRef, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";
import useSearchStore, { useCheckoutStore } from "@/store";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useAuth } from "@/components/providers/auth-provider";
import { markCheckoutCompleted } from "@/lib/appwrite-abandoned-checkout";
import { useAbandonedCheckout } from "@/components/hooks/use-abandoned-checkout";
import { getTicketPrice, getChildrenPrice } from "@/lib/utils";
import { renderNetworkLogo } from "@/actions/checkout/render-cardlogo";

import {
  createPaymentIntent,
  createBookings,
  saveCardInfo,
  fetchPaymentMethods,
  type CreatePaymentIntentParams,
  type CreateBookingsParams,
} from "@/actions/checkout/payment-actions";
import { useTranslation } from "react-i18next";
import {
  calculateDiscountedAmount,
  clearStoredDiscount,
} from "@/actions/checkout/discount-utilies";

const PaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<any>(null);
  const [cardExpiry, setCardExpiry] = useState<any>(null);
  const [cardCvc, setCardCvc] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [saveCardInfoState, setSaveCardInfoState] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const [showStickyButton, setShowStickyButton] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { sessionId, resetTimeout } = useAbandonedCheckout();

  const { passengers: passengerAmount } = useSearchStore();
  const { user } = useAuth();

  const {
    passengers,
    outboundTicket,
    returnTicket,
    selectedFlex,
    flexPrice,
    setSelectedFlex,
    resetCheckout,
  } = useCheckoutStore();

  useEffect(() => {
    const resumeSessionId = searchParams.get("resume");
    if (resumeSessionId) {
      toast({
        title: "Welcome back!",
        description:
          "We've saved your booking details. Complete your purchase below.",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    const handleUserActivity = () => {
      resetTimeout();
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimeout]);

  useEffect(() => {
    if (!selectedFlex) {
      setSelectedFlex("no_flex");
    }
  }, [selectedFlex, setSelectedFlex]);

  const calculateTicketTotal = (ticket: Ticket | ConnectedTicket) => {
    const adultPrice = getTicketPrice(ticket);
    const childPrice = getChildrenPrice(ticket);
    return (
      adultPrice * (passengerAmount.adults || 1) +
      childPrice * (passengerAmount.children || 0)
    );
  };

  const outboundTotal = outboundTicket
    ? calculateTicketTotal(outboundTicket)
    : 0;
  const returnTotal = returnTicket ? calculateTicketTotal(returnTicket) : 0;
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
      // Calculate final amount with discount
      const discountResult = calculateDiscountedAmount(totalPrice);
      const finalAmount = discountResult?.finalAmount ?? totalPrice;
      const appliedDiscountAmount = discountResult?.amount ?? 0;
      const discountCode = discountResult?.code ?? null;

      console.log({ finalAmount });

      // Create payment intent
      const paymentIntentParams: CreatePaymentIntentParams = {
        passengers,
        finalAmount,
        appliedDiscountAmount,
        discountCode,
        outboundTicketId: outboundTicket?._id,
        userStripeCustomerId: user?.stripe_customer_id,
        selectedPaymentMethodId: selectedPaymentMethod?.id,
        useSavedCard: !!selectedPaymentMethod,
      };

      const paymentResponse = await createPaymentIntent(paymentIntentParams);

      if (paymentResponse.auto_capture) {
        await handleBookingCreation(
          paymentResponse.data.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
        return;
      }

      const { clientSecret } = paymentResponse.data;

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
        await handleBookingCreation(
          paymentIntent.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
      }
    } catch (err: any) {
      console.log({ err });
      toast({
        description: err?.response?.data?.message || "Payment failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingCreation = async (
    paymentIntentId: string,
    finalAmount: number,
    discountAmount = 0,
    discountCode: string | null = null
  ) => {
    const bookingParams: CreateBookingsParams = {
      outboundTicket,
      returnTicket,
      paymentIntentId,
      finalAmount,
      discountAmount,
      discountCode,
      passengerAmount,
      passengers,
      selectedFlex: selectedFlex || "",
      flexPrice,
      userId: user?._id,
    };

    await createBookings(bookingParams);

    // Mark checkout as completed
    if (sessionId) {
      await markCheckoutCompleted(sessionId);
    }

    // Clean up discount after successful payment
    clearStoredDiscount();

    router.push("/checkout/success");
    resetCheckout();
  };

  const handleSaveCardInfo = async () => {
    if (!stripe || !elements) {
      toast({
        description: "Stripe is not initialized",
        variant: "destructive",
      });
      return;
    }

    try {
      await saveCardInfo({ stripe, elements, user });
      await loadPaymentMethods();

      toast({
        description: "Payment method saved successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        description: error.message || "Failed to save payment method",
        variant: "destructive",
      });
    }
  };

  const loadPaymentMethods = async () => {
    try {
      if (!user?.stripe_customer_id) {
        setPaymentMethods([]);
        return;
      }

      const methods = await fetchPaymentMethods(user.stripe_customer_id);
      setPaymentMethods(methods);
    } catch (err) {
      console.log("Failed to load payment methods:", err);
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, [user]);

  const handleSelectPaymentMethod = (method: any) => {
    if (selectedPaymentMethod?.id === method.id) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(method);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const isButtonVisible =
          buttonRect.top < window.innerHeight && buttonRect.bottom > 0;
        setShowStickyButton(!isButtonVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle card saving after payment
  useEffect(() => {
    if (saveCardInfoState && !user?.stripe_payment_method_id && !loading) {
      handleSaveCardInfo();
    }
  }, [saveCardInfoState, user?.stripe_payment_method_id, loading]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4">
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

          {Math.abs(totalPrice) >= 0.01 && (
            <div className="space-y-4">
              <div className="flex-col flex gap-4 justify-between">
                {user && !user?.stripe_payment_method_ids && (
                  <div className="text-gray-700 text-sm flex gap-2 items-center">
                    <p>Save card info for future payments</p>
                    <Switch
                      onCheckedChange={() =>
                        setSaveCardInfoState(!saveCardInfoState)
                      }
                      className="data-[state=checked]:bg-primary-accent"
                    />
                  </div>
                )}

                {user?.stripe_payment_method_ids && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">
                      Choose your saved payment methods
                    </h3>
                    {paymentMethods?.map((method) => (
                      <div
                        key={method?.id}
                        onClick={() => handleSelectPaymentMethod(method)}
                        className={`
                          cursor-pointer p-3 border border-gray-300 rounded-lg
                          ${
                            selectedPaymentMethod?.id === method.id
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

                        {selectedPaymentMethod?.id === method.id && (
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
                  className={`font-medium text-gray-700 ${
                    selectedPaymentMethod && "hidden"
                  }`}
                >
                  {t("paymentMethod.cardInformation")}
                </h3>

                <div
                  className={`grid grid-cols-2 gap-2 ${
                    selectedPaymentMethod && "hidden"
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
              </div>

              <div className="flex items-center justify-end space-x-1 mt-6">
                <span className="text-sm text-gray-500">Powered by</span>
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
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:hidden gap-4">
        <OrderSummary />
      </div>

      <div ref={buttonRef} className="flex items-center justify-end gap-2">
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

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
          showStickyButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button
          onClick={handlePayment}
          className="px-6 py-3.5 button-gradient text-white hover:bg-primary-bg/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-bg h-12 rounded-lg w-full"
          disabled={!stripe || loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5 mx-auto" />
          ) : (
            `${t("paymentMethod.completePayment")} - €${totalPrice.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
