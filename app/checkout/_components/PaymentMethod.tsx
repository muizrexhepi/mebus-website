"use client";

import { useEffect, useRef, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";
import useSearchStore, { useCheckoutStore } from "@/store";
import { Loader2 } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useAuth } from "@/components/providers/auth-provider";
import { getTicketPrice, getChildrenPrice } from "@/lib/utils";

import {
  createPaymentIntent,
  createBookings,
  type CreatePaymentIntentParams,
  type CreateBookingsParams,
} from "@/actions/checkout/payment-actions";
import { useTranslation } from "react-i18next";
import {
  calculateDiscountedAmount,
  clearStoredDiscount,
} from "@/actions/checkout/discount-utilies";

interface CardValidationErrors {
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

type LoadingState =
  | "idle"
  | "payment-intent"
  | "confirming-payment"
  | "creating-booking"
  | "express-payment";

const PaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [cardNumber, setCardNumber] = useState<any>(null);
  const [cardExpiry, setCardExpiry] = useState<any>(null);
  const [cardCvc, setCardCvc] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [showStickyButton, setShowStickyButton] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [cardValidationErrors, setCardValidationErrors] =
    useState<CardValidationErrors>({});
  const [cardFieldsComplete, setCardFieldsComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const [paymentAvailability, setPaymentAvailability] = useState({
    applePay: false,
    googlePay: false,
  });
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

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

  // Loading helper functions
  const isLoading = loading !== "idle";
  const getLoadingText = () => {
    switch (loading) {
      case "payment-intent":
        return t("paymentMethod.processingPayment") || "Processing payment...";
      case "confirming-payment":
        return t("paymentMethod.confirmingPayment") || "Confirming payment...";
      case "creating-booking":
        return t("paymentMethod.creatingBooking") || "Creating booking...";
      case "express-payment":
        return t("paymentMethod.processingPayment") || "Processing payment...";
      default:
        return t("paymentMethod.completePayment") || "Complete Payment";
    }
  };

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
    if (stripe && totalPrice > 0) {
      const pr = stripe.paymentRequest({
        country: "DE",
        currency: "eur",
        total: {
          label: "GoBusly Bus Ticket",
          amount: Math.round(totalPrice * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      setPaymentRequest(pr);

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentAvailability({
            applePay: result.applePay || false,
            googlePay: result.googlePay || false,
          });
        }
      });

      pr.on("paymentmethod", handleExpressPayment);
    }
  }, [stripe, totalPrice]);

  useEffect(() => {
    if (stripe && elements && !cardNumber && !cardExpiry && !cardCvc) {
      const cardNumberElement = elements.create("cardNumber");
      const cardExpiryElement = elements.create("cardExpiry");
      const cardCvcElement = elements.create("cardCvc");

      cardNumberElement.on("change", (event) => {
        setCardFieldsComplete((prev) => ({
          ...prev,
          cardNumber: event.complete,
        }));

        if (event.error) {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardNumber: event.error?.message,
          }));
        } else {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardNumber: undefined,
          }));
        }
      });

      cardExpiryElement.on("change", (event) => {
        setCardFieldsComplete((prev) => ({
          ...prev,
          cardExpiry: event.complete,
        }));

        if (event.error) {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardExpiry: event.error?.message,
          }));
        } else {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardExpiry: undefined,
          }));
        }
      });

      cardCvcElement.on("change", (event) => {
        setCardFieldsComplete((prev) => ({ ...prev, cardCvc: event.complete }));

        if (event.error) {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardCvc: event.error?.message,
          }));
        } else {
          setCardValidationErrors((prev) => ({
            ...prev,
            cardCvc: undefined,
          }));
        }
      });

      cardNumberElement.mount("#card-number-element");
      cardExpiryElement.mount("#card-expiry-element");
      cardCvcElement.mount("#card-cvc-element");

      setCardNumber(cardNumberElement);
      setCardExpiry(cardExpiryElement);
      setCardCvc(cardCvcElement);

      return () => {
        if (cardNumberElement) {
          cardNumberElement.unmount();
          cardNumberElement.destroy();
        }
        if (cardExpiryElement) {
          cardExpiryElement.unmount();
          cardExpiryElement.destroy();
        }
        if (cardCvcElement) {
          cardCvcElement.unmount();
          cardCvcElement.destroy();
        }
      };
    }
  }, [stripe, elements]);

  useEffect(() => {
    return () => {
      if (cardNumber) {
        cardNumber.unmount();
        cardNumber.destroy();
      }
      if (cardExpiry) {
        cardExpiry.unmount();
        cardExpiry.destroy();
      }
      if (cardCvc) {
        cardCvc.unmount();
        cardCvc.destroy();
      }
    };
  }, []);
  const validateCardFields = (): boolean => {
    const { cardNumber, cardExpiry, cardCvc } = cardFieldsComplete;
    const errors: CardValidationErrors = {};

    if (!cardNumber) errors.cardNumber = "Card number is required";
    if (!cardExpiry) errors.cardExpiry = "Expiry date is required";
    if (!cardCvc) errors.cardCvc = "CVC is required";

    if (Object.keys(errors).length > 0) {
      setCardValidationErrors(errors);

      // Scroll to the first error field
      const firstErrorId = errors.cardNumber
        ? "card-number-element"
        : errors.cardExpiry
        ? "card-expiry-element"
        : "card-cvc-element";

      const el = document.getElementById(firstErrorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.(); // optional if it's focusable
      }

      toast({
        description: "Please fill in all card details",
        variant: "destructive",
      });

      return false;
    }

    const hasErrors = Object.values(cardValidationErrors).some(
      (error) => error
    );
    if (hasErrors) {
      toast({
        description: "Please fix card validation errors",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleExpressPayment = async (event: any) => {
    setLoading("express-payment");
    try {
      const discountResult = calculateDiscountedAmount(totalPrice);
      const finalAmount = discountResult?.finalAmount ?? totalPrice;

      const paymentIntentParams: CreatePaymentIntentParams = {
        passengers,
        finalAmount,
        appliedDiscountAmount: discountResult?.amount ?? 0,
        discountCode: discountResult?.code ?? null,
        outboundTicketId: outboundTicket?._id,
        userStripeCustomerId: user?.stripe_customer_id,
        selectedPaymentMethodId: undefined,
        useSavedCard: false,
      };

      const paymentResponse = await createPaymentIntent(paymentIntentParams);
      const { clientSecret } = paymentResponse.data;

      const { error, paymentIntent } = await stripe!.confirmCardPayment(
        clientSecret,
        { payment_method: event.paymentMethod.id },
        { handleActions: false }
      );

      if (error) {
        event.complete("fail");
        toast({
          description: error.message || "Payment failed",
          variant: "destructive",
        });
      } else {
        event.complete("success");
        await handleBookingCreation(
          paymentIntent.id,
          finalAmount,
          discountResult?.amount ?? 0,
          discountResult?.code ?? null
        );
      }
    } catch (error: any) {
      event.complete("fail");
      console.error("Express payment error:", error);
      toast({
        description: error?.message || "Payment failed",
        variant: "destructive",
      });
    } finally {
      setLoading("idle");
    }
  };

  const handleApplePay = () => {
    if (paymentRequest && !isLoading) {
      paymentRequest.show();
    }
  };

  const handleGooglePay = () => {
    if (paymentRequest && !isLoading) {
      paymentRequest.show();
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements || isLoading) {
      return;
    }

    if (!validateCardFields()) {
      return;
    }

    try {
      setLoading("payment-intent");

      const discountResult = calculateDiscountedAmount(totalPrice);
      const finalAmount = discountResult?.finalAmount ?? totalPrice;
      const appliedDiscountAmount = discountResult?.amount ?? 0;
      const discountCode = discountResult?.code ?? null;

      const paymentIntentParams: CreatePaymentIntentParams = {
        passengers,
        finalAmount,
        appliedDiscountAmount,
        discountCode,
        outboundTicketId: outboundTicket?._id,
        userStripeCustomerId: user?.stripe_customer_id,
        selectedPaymentMethodId: undefined,
        useSavedCard: false,
      };

      const paymentResponse = await createPaymentIntent(paymentIntentParams);

      // Handle auto-capture scenario (no payment confirmation needed)
      if (paymentResponse.auto_capture) {
        setLoading("creating-booking");
        await handleBookingCreation(
          paymentResponse.data.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
        return;
      }

      const { clientSecret } = paymentResponse.data;

      setLoading("confirming-payment");

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumber,
            billing_details: {},
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message || "Payment confirmation failed");
      } else if (paymentIntent.status === "succeeded") {
        setLoading("creating-booking");
        await handleBookingCreation(
          paymentIntent.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
      } else {
        throw new Error(`Unexpected payment status: ${paymentIntent.status}`);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        description:
          err?.response?.data?.message || err?.message || "Payment failed",
        variant: "destructive",
      });
    } finally {
      setLoading("idle");
    }
  };

  const handleBookingCreation = async (
    paymentIntentId: string,
    finalAmount: number,
    discountAmount = 0,
    discountCode: string | null = null
  ) => {
    try {
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

      const result = await createBookings(bookingParams);

      // Check if booking creation was successful
      if (!result) {
        throw new Error("Failed to create booking");
      }

      // Clear stored discount
      try {
        clearStoredDiscount();
      } catch (error) {
        console.warn("Failed to clear stored discount:", error);
        // Don't throw here as the booking was successful
      }

      // Reset checkout state
      resetCheckout();

      // Show success message
      toast({
        title: "Payment Successful!",
        description:
          "Your booking has been confirmed. Redirecting to confirmation page...",
      });

      // Use replace instead of push and add a small delay to ensure state is cleared
      setTimeout(() => {
        router.replace("/checkout/success");
      }, 100);
    } catch (error: any) {
      console.error("Booking creation error:", error);
      throw new Error(error?.message || "Failed to create booking");
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasExpressPayment =
    paymentAvailability.applePay || paymentAvailability.googlePay;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl overflow-hidden">
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
                {hasExpressPayment && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700 text-center">
                      Pay with one touch
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {paymentAvailability.applePay && (
                        <button
                          onClick={handleApplePay}
                          disabled={isLoading}
                          className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
                        >
                          {loading === "express-payment" ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                          ) : (
                            <>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                              </svg>
                              <span className="font-medium">Pay</span>
                            </>
                          )}
                        </button>
                      )}

                      {paymentAvailability.googlePay && (
                        <button
                          onClick={handleGooglePay}
                          disabled={isLoading}
                          className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-lg px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
                        >
                          {loading === "express-payment" ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                          ) : (
                            <>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12 23C15.24 23 17.95 21.92 19.28 20.34L15.71 17.57C14.74 18.22 13.48 18.63 12 18.63C8.91 18.63 6.26 16.67 5.39 13.86H1.71V16.71C3.03 19.35 7.26 23 12 23Z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M5.39 13.86C5.17 13.21 5.05 12.51 5.05 11.77S5.17 10.33 5.39 9.68V6.83H1.71C0.98 8.29 0.56 9.97 0.56 11.77S0.98 15.25 1.71 16.71L5.39 13.86Z"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M12 4.91C13.62 4.91 15.06 5.47 16.18 6.54L19.34 3.38C17.95 2.09 15.24 1.32 12 1.32C7.26 1.32 3.03 4.97 1.71 7.61L5.39 10.46C6.26 7.65 8.91 4.91 12 4.91Z"
                                  fill="#EA4335"
                                />
                              </svg>
                              <span className="font-medium text-gray-700">
                                Pay
                              </span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {hasExpressPayment && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        {t("login.orContinueWith")}
                      </span>
                    </div>
                  </div>
                )}

                <h3 className="font-medium text-gray-700">
                  {t("paymentMethod.cardInformation")}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 space-y-1">
                    <div
                      id="card-number-element"
                      className={`p-4 rounded-lg border ${
                        cardValidationErrors.cardNumber
                          ? "border-none bg-red-500/10"
                          : "bg-primary-bg/5 border-transparent"
                      } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                    ></div>
                    {cardValidationErrors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {cardValidationErrors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div
                      id="card-expiry-element"
                      className={`p-4 rounded-lg border ${
                        cardValidationErrors.cardExpiry
                          ? "border-none bg-red-500/10"
                          : "bg-primary-bg/5 border-transparent"
                      } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                    ></div>
                    {cardValidationErrors.cardExpiry && (
                      <p className="text-red-500 text-sm">
                        {cardValidationErrors.cardExpiry}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div
                      id="card-cvc-element"
                      className={`p-4 rounded-lg border ${
                        cardValidationErrors.cardCvc
                          ? "border-none bg-red-500/10"
                          : "bg-primary-bg/5 border-transparent"
                      } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                    ></div>
                    {cardValidationErrors.cardCvc && (
                      <p className="text-red-500 text-sm">
                        {cardValidationErrors.cardCvc}
                      </p>
                    )}
                  </div>
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
          disabled={!stripe || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span className="hidden sm:inline">{getLoadingText()}</span>
            </div>
          ) : (
            getLoadingText()
          )}
        </Button>
      </div>

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
          showStickyButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-bold text-[#353535]">
            €{totalPrice.toFixed(2)}
          </p>
          <Button
            onClick={handlePayment}
            variant={"primary"}
            className="flex-1 px-6 py-3.5 h-12 rounded-lg"
            disabled={!stripe || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>{getLoadingText()}</span>
              </div>
            ) : (
              getLoadingText()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
