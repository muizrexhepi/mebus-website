"use client";

import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { calculatePassengerPrices } from "@/components/hooks/use-passengers";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";
import useSearchStore, {
  useCheckoutStore,
  usePaymentSuccessStore,
} from "@/store";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useAuth } from "@/components/providers/auth-provider";
import { markCheckoutCompleted } from "@/lib/appwrite-abandoned-checkout";
import { useAbandonedCheckout } from "@/components/hooks/use-abandoned-checkout";
import {
  isConnectedTicket,
  getTicketPrice,
  getOperatorPrice,
  getChildrenPrice,
  getOperatorChildrenPrice,
} from "@/lib/utils";

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
  const [saveCardInfo, setSaveCardInfo] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();

  // Abandoned checkout tracking
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

  // Check if resuming from abandoned checkout
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

  // Reset timeout on any user interaction
  useEffect(() => {
    const handleUserActivity = () => {
      resetTimeout();
    };

    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("scroll", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    return () => {
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("scroll", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
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

  const calculateOperatorTicketTotal = (ticket: Ticket | ConnectedTicket) => {
    const adultPrice = getOperatorPrice(ticket);
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
      // Check if discount is applied
      const discountCode = localStorage.getItem("discountCode");
      const discountPercentage = localStorage.getItem("discountPercentage");
      const discountExpiration = localStorage.getItem("discountExpiration");

      // Calculate final amount with discount if applicable
      let finalAmount = totalPrice;
      let appliedDiscountAmount = 0;

      if (discountCode && discountPercentage && discountExpiration) {
        const expirationDate = new Date(discountExpiration);
        const currentDate = new Date();

        if (currentDate < expirationDate) {
          const discountPercent = Number.parseFloat(discountPercentage);
          appliedDiscountAmount = totalPrice * (discountPercent / 100);
          finalAmount = totalPrice - appliedDiscountAmount;
        }
      }

      console.log({ finalAmount });

      const res = await axios.post<any>(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/payment/create-payment-intent?customer_id=${
          user?.stripe_customer_id || ""
        }&payment_method_id=${
          selectedPaymentMethod?.id || ""
        }&use_saved_card=${!!selectedPaymentMethod}`,
        {
          passengers,
          amount_in_cents: Math.round(finalAmount * 100),
          discount_amount_in_cents: Math.round(appliedDiscountAmount * 100),
          discount_code: discountCode || null,
        }
      );

      if (res.data.auto_capture) {
        await createBookings(
          res.data.data.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
        // Mark checkout as completed
        if (sessionId) {
          await markCheckoutCompleted(sessionId);
        }
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
        await createBookings(
          paymentIntent.id,
          finalAmount,
          appliedDiscountAmount,
          discountCode
        );
        // Mark checkout as completed
        if (sessionId) {
          await markCheckoutCompleted(sessionId);
        }
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

  const createBookings = async (
    paymentIntentId: string,
    finalAmount: number,
    discountAmount = 0,
    discountCode: string | null = null
  ) => {
    const bookings = [];

    // Calculate total prices for proportion calculations
    const outboundTotalPrice = outboundTicket
      ? isConnectedTicket(outboundTicket)
        ? outboundTicket.legs.reduce((sum, leg) => sum + leg.price, 0)
        : outboundTicket.stops.reduce((sum, stop) => sum + stop.price, 0)
      : 0;

    const returnTotalPrice = returnTicket
      ? isConnectedTicket(returnTicket)
        ? returnTicket.legs.reduce((sum, leg) => sum + leg.price, 0)
        : returnTicket.stops.reduce((sum, stop) => sum + stop.price, 0)
      : 0;

    const grandTotalPrice = outboundTotalPrice + returnTotalPrice;

    if (outboundTicket) {
      if (isConnectedTicket(outboundTicket)) {
        // Handle connected ticket - create booking for each leg
        for (let i = 0; i < outboundTicket.legs.length; i++) {
          const leg = outboundTicket.legs[i];

          // Calculate individual leg prices
          const legAdultPrice = leg.price;
          const legChildPrice = leg.children_price;
          const legTicketTotal =
            legAdultPrice * (passengerAmount.adults || 1) +
            legChildPrice * (passengerAmount.children || 0);

          // Calculate proportional discount for this leg based on leg price vs total outbound price
          const legProportion = legAdultPrice / outboundTotalPrice;
          const outboundDiscountPortion =
            (discountAmount * outboundTotalPrice) / grandTotalPrice;
          const legDiscountAmount = outboundDiscountPortion * legProportion;

          // Operator price for this leg (same as ticket total for individual legs)
          const legOperatorPrice = legTicketTotal;

          // Create a ticket-like object for this leg
          const legTicket = {
            _id: leg.ticket,
            operator: leg.operator._id,
            stops: [
              {
                from: {
                  _id: leg.from_station._id,
                  name: leg.from_station.name,
                  city: leg.from_station.city,
                  location: leg.from_station.location,
                },
                to: {
                  _id: leg.to_station._id,
                  name: leg.to_station.name,
                  city: leg.to_station.city,
                  location: leg.to_station.location,
                },
                departure_date: leg.departure_date,
                arrival_time: leg.arrival_time,
                price: legAdultPrice,
                children_price: legChildPrice,
                other_prices: {
                  our_price: legAdultPrice,
                  our_children_price: legChildPrice,
                },
              },
            ],
            metadata: {
              operator_name: leg.operator.name,
              // Add connected journey metadata
              is_connected_journey: true,
              leg_number: leg.leg_number,
              total_legs: outboundTicket.legs.length,
              connection_time:
                i < outboundTicket.legs.length - 1
                  ? outboundTicket.connection_time
                  : null,
              intermediate_station:
                i < outboundTicket.legs.length - 1
                  ? outboundTicket.intermediate_station
                  : null,
            },
          };

          const legBooking = await createBooking(
            legTicket as any,
            false,
            paymentIntentId,
            legTicketTotal,
            legDiscountAmount,
            discountCode,
            legOperatorPrice
          );
          bookings.push(legBooking);
        }
      } else {
        // Handle regular ticket
        const outboundDiscountPortion =
          (discountAmount * outboundTotalPrice) / grandTotalPrice;

        // Calculate total price from stops
        const regularOutboundTotal = outboundTicket.stops.reduce(
          (sum, stop) => {
            return (
              sum +
              stop.price * (passengerAmount.adults || 1) +
              (stop.children_price || 0) * (passengerAmount.children || 0)
            );
          },
          0
        );

        const outboundBooking = await createBooking(
          outboundTicket,
          false,
          paymentIntentId,
          regularOutboundTotal,
          outboundDiscountPortion,
          discountCode
        );
        bookings.push(outboundBooking);
      }
    }

    if (returnTicket) {
      if (isConnectedTicket(returnTicket)) {
        // Handle connected return ticket - create booking for each leg
        for (let i = 0; i < returnTicket.legs.length; i++) {
          const leg = returnTicket.legs[i];

          // Calculate individual leg prices
          const legAdultPrice = leg.price;
          const legChildPrice = leg.children_price;
          const legTicketTotal =
            legAdultPrice * (passengerAmount.adults || 1) +
            legChildPrice * (passengerAmount.children || 0);

          // Calculate proportional discount for this leg based on leg price vs total return price
          const legProportion = legAdultPrice / returnTotalPrice;
          const returnDiscountPortion =
            (discountAmount * returnTotalPrice) / grandTotalPrice;
          const legDiscountAmount = returnDiscountPortion * legProportion;

          // Operator price for this leg (same as ticket total for individual legs)
          const legOperatorPrice = legTicketTotal;

          // Create a ticket-like object for this leg
          const legTicket = {
            _id: leg.ticket,
            operator: leg.operator._id,
            stops: [
              {
                from: {
                  _id: leg.from_station._id,
                  name: leg.from_station.name,
                  city: leg.from_station.city,
                  location: leg.from_station.location,
                },
                to: {
                  _id: leg.to_station._id,
                  name: leg.to_station.name,
                  city: leg.to_station.city,
                  location: leg.to_station.location,
                },
                departure_date: leg.departure_date,
                arrival_time: leg.arrival_time,
                price: legAdultPrice,
                children_price: legChildPrice,
                other_prices: {
                  our_price: legAdultPrice,
                  our_children_price: legChildPrice,
                },
              },
            ],
            metadata: {
              operator_name: leg.operator.name,
              // Add connected journey metadata
              is_connected_journey: true,
              leg_number: leg.leg_number,
              total_legs: returnTicket.legs.length,
              connection_time:
                i < returnTicket.legs.length - 1
                  ? returnTicket.connection_time
                  : null,
              intermediate_station:
                i < returnTicket.legs.length - 1
                  ? returnTicket.intermediate_station
                  : null,
            },
          };

          const legBooking = await createBooking(
            legTicket as any,
            true,
            paymentIntentId,
            legTicketTotal,
            legDiscountAmount,
            discountCode,
            legOperatorPrice
          );
          bookings.push(legBooking);
        }
      } else {
        // Handle regular return ticket
        const returnDiscountPortion =
          (discountAmount * returnTotalPrice) / grandTotalPrice;

        // Calculate total price from stops
        const regularReturnTotal = returnTicket.stops.reduce((sum, stop) => {
          return (
            sum +
            stop.price * (passengerAmount.adults || 1) +
            (stop.children_price || 0) * (passengerAmount.children || 0)
          );
        }, 0);

        const returnBooking = await createBooking(
          returnTicket,
          true,
          paymentIntentId,
          regularReturnTotal,
          returnDiscountPortion,
          discountCode
        );
        bookings.push(returnBooking);
      }
    }

    return bookings;
  };

  const createBooking = async (
    ticket: Ticket,
    isReturn: boolean,
    paymentIntentId: string,
    ticketTotal: number,
    discountAmount = 0,
    discountCode: string | null = null,
    operatorPrice?: number // Add operator price parameter
  ) => {
    let affiliateCode = null;
    if (typeof window !== "undefined") {
      const storedAffiliate = localStorage.getItem("affiliate");
      if (storedAffiliate) {
        const { code, expires } = JSON.parse(storedAffiliate);
        console.log({ code, expires });
        if (Date.now() < expires) {
          affiliateCode = code;
        } else {
          console.log("Affiliate code expired");
          localStorage.removeItem("affiliate");
        }
      }
    }

    const passengersWithPrices = calculatePassengerPrices(passengers, ticket);

    // For connected tickets, we're already getting the correct ticketTotal and discountAmount
    // from createBookings, so we don't need to recalculate proportions
    const ticketTotalDiscounted = ticketTotal - discountAmount;

    const { setIsPaymentSuccess, setBookingDetails } =
      usePaymentSuccessStore.getState();

    try {
      // Handle regular ticket - use existing route
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create/${ticket.operator}/${
          user ? user._id : null
        }/${ticket._id}`,
        {
          passengers: passengersWithPrices,
          travel_flex: selectedFlex,
          payment_intent_id: paymentIntentId,
          platform: "web",
          flex_price: isReturn ? 0 : flexPrice,
          total_price: ticketTotalDiscounted + (isReturn ? 0 : flexPrice),
          original_price: ticketTotal + (isReturn ? 0 : flexPrice),
          discount_amount: discountAmount,
          discount_code: discountCode,
          operator_price: operatorPrice || ticketTotal, // Use operatorPrice if provided, otherwise use ticketTotal
          departure_station: ticket.stops[0].from._id,
          arrival_station: ticket.stops[0].to._id,
          departure_station_label: ticket.stops[0].from.name,
          arrival_station_label: ticket.stops[0].to.name,
          is_using_deposited_money: false,
          deposit_spent: 0,
          stop: ticket.stops[0],
          is_return: isReturn,
          affiliate_code: affiliateCode,
          // Pass through any connected journey metadata
          ...ticket.metadata,
        }
      );

      const newBooking = response.data.data;

      if (typeof window !== "undefined") {
        const savedBookings = JSON.parse(
          localStorage.getItem("noUserBookings") || "[]"
        );
        const allBookings = [...savedBookings, newBooking];
        localStorage.setItem("noUserBookings", JSON.stringify(allBookings));
      }

      console.log({
        newBooking,
        appliedDiscount: discountCode
          ? {
              code: discountCode,
              amount: discountAmount,
            }
          : null,
      });

      setIsPaymentSuccess(true);

      // Set booking details based on ticket type
      const departureStationLabel = ticket.stops[0].from.name;
      const arrivalStationLabel = ticket.stops[0].to.name;
      const operatorName = ticket.metadata?.operator_name || "Unknown";

      setBookingDetails({
        bookingId: newBooking._id,
        transactionId: newBooking.metadata.payment_intent_id,
        departureStation: departureStationLabel,
        arrivalStation: arrivalStationLabel,
        departureDate: new Date(newBooking.departure_date),
        price: ticketTotalDiscounted + (isReturn ? 0 : flexPrice),
        operator: operatorName,
      });

      return newBooking;
    } catch (error) {
      console.error("Booking creation failed:", error);
      setIsPaymentSuccess(false);
      setBookingDetails(null);
      throw error;
    } finally {
      if (saveCardInfo && !user?.stripe_payment_method_id) {
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

    if (!user?.stripe_payment_method_id) {
      return toast({
        description: "No such customer",
        variant: "destructive",
      });
      return;
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
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-setup-intent?customer_id=${user?.stripe_customer_id}&user_id=${user?._id}`,
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

  async function fetchPaymentMethods() {
    try {
      console.log({ acc: user });

      if (!user?.stripe_customer_id) {
        setPaymentMethods([]);
        return console.info("No such customer");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${user?.stripe_customer_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }

      const data: any = await response.json();

      console.log({ methods: data.data.data });

      setPaymentMethods(data.data.data);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchPaymentMethods();
  }, [user]);

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

          {
            <div
              className={`${
                Math.abs(totalPrice) < 0.01 ? "hidden" : ""
              } space-y-4`}
            >
              <div className="flex-col flex gap-4 justify-between">
                {user && !user?.stripe_payment_method_ids && (
                  <div className="text-gray-700 text-sm flex gap-2 items-center">
                    <p>Save card info for future payments</p>
                    <Switch
                      onCheckedChange={() => setSaveCardInfo(!saveCardInfo)}
                      className="data-[state=checked]:bg-primary-accent"
                    />
                  </div>
                )}

                {user?.stripe_payment_method_ids && (
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
                          ${
                            selectedPaymentMethod?.id == method.id
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
              </div>{" "}
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
