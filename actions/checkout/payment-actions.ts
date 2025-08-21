import axios from "axios";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";
import { calculatePassengerPrices } from "@/components/hooks/use-passengers";
import { usePaymentSuccessStore } from "@/store";
import { isConnectedTicket } from "@/lib/utils";
import { getLanguageFromCookies } from "@/lib/i18next";

export interface CreatePaymentIntentParams {
  passengers: any[];
  finalAmount: number;
  appliedDiscountAmount: number;
  discountCode: string | null;
  outboundTicketId: string | undefined;
  userStripeCustomerId?: string;
  selectedPaymentMethodId?: string;
  useSavedCard: boolean;
}

export interface CreateBookingParams {
  ticket: Ticket;
  isReturn: boolean;
  paymentIntentId: string;
  ticketTotal: number;
  discountAmount: number;
  discountCode: string | null;
  operatorPrice?: number;
  passengers: any[];
  selectedFlex: string;
  flexPrice: number;
  userId?: string;
}

export interface CreateBookingsParams {
  outboundTicket: Ticket | ConnectedTicket | null;
  returnTicket: Ticket | ConnectedTicket | null;
  paymentIntentId: string;
  finalAmount: number;
  discountAmount: number;
  discountCode: string | null;
  passengerAmount: { adults: number; children: number };
  passengers: any[];
  selectedFlex: string;
  flexPrice: number;
  userId?: string;
}

export interface SaveCardInfoParams {
  stripe: any;
  elements: any;
  user: any;
}

/**
 * Creates a Stripe payment intent
 */
export async function createPaymentIntent(params: CreatePaymentIntentParams) {
  const {
    passengers,
    finalAmount,
    appliedDiscountAmount,
    discountCode,
    outboundTicketId,
    userStripeCustomerId = "",
    selectedPaymentMethodId = "",
    useSavedCard,
  } = params;

  const response = await axios.post<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment-intent?customer_id=${userStripeCustomerId}&payment_method_id=${selectedPaymentMethodId}&use_saved_card=${useSavedCard}`,
    {
      passengers,
      amount_in_cents: Math.round(finalAmount * 100),
      discount_amount_in_cents: Math.round(appliedDiscountAmount * 100),
      discount_code: discountCode || null,
      ticket_id: outboundTicketId,
    }
  );

  return response.data;
}

/**
 * Creates multiple bookings for outbound and return tickets
 */
export async function createBookings(params: CreateBookingsParams) {
  const {
    outboundTicket,
    returnTicket,
    paymentIntentId,
    finalAmount,
    discountAmount,
    discountCode,
    passengerAmount,
    passengers,
    selectedFlex,
    flexPrice,
    userId,
  } = params;

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

  // Handle outbound ticket
  if (outboundTicket) {
    if (isConnectedTicket(outboundTicket)) {
      // Handle connected ticket - create booking for each leg
      for (let i = 0; i < outboundTicket.legs.length; i++) {
        const leg = outboundTicket.legs[i];

        const legAdultPrice = leg.price;
        const legChildPrice = leg.children_price;
        const legTicketTotal =
          legAdultPrice * (passengerAmount.adults || 1) +
          legChildPrice * (passengerAmount.children || 0);

        // Calculate proportional discount for this leg
        const legProportion = legAdultPrice / outboundTotalPrice;
        const outboundDiscountPortion =
          (discountAmount * outboundTotalPrice) / grandTotalPrice;
        const legDiscountAmount = outboundDiscountPortion * legProportion;

        const legOperatorPrice = legTicketTotal;

        // Create a ticket-like object for this leg
        const legTicket = createLegTicket(leg, outboundTicket, i);

        const legBooking = await createBooking({
          ticket: legTicket as any,
          isReturn: false,
          paymentIntentId,
          ticketTotal: legTicketTotal,
          discountAmount: legDiscountAmount,
          discountCode,
          operatorPrice: legOperatorPrice,
          passengers,
          selectedFlex,
          flexPrice,
          userId,
        });

        bookings.push(legBooking);
      }
    } else {
      // Handle regular ticket
      const outboundDiscountPortion =
        (discountAmount * outboundTotalPrice) / grandTotalPrice;

      const regularOutboundTotal = outboundTicket.stops.reduce((sum, stop) => {
        return (
          sum +
          stop.price * (passengerAmount.adults || 1) +
          (stop.children_price || 0) * (passengerAmount.children || 0)
        );
      }, 0);

      const outboundBooking = await createBooking({
        ticket: outboundTicket,
        isReturn: false,
        paymentIntentId,
        ticketTotal: regularOutboundTotal,
        discountAmount: outboundDiscountPortion,
        discountCode,
        passengers,
        selectedFlex,
        flexPrice,
        userId,
      });

      bookings.push(outboundBooking);
    }
  }

  // Handle return ticket (similar logic)
  if (returnTicket) {
    if (isConnectedTicket(returnTicket)) {
      for (let i = 0; i < returnTicket.legs.length; i++) {
        const leg = returnTicket.legs[i];

        const legAdultPrice = leg.price;
        const legChildPrice = leg.children_price;
        const legTicketTotal =
          legAdultPrice * (passengerAmount.adults || 1) +
          legChildPrice * (passengerAmount.children || 0);

        const legProportion = legAdultPrice / returnTotalPrice;
        const returnDiscountPortion =
          (discountAmount * returnTotalPrice) / grandTotalPrice;
        const legDiscountAmount = returnDiscountPortion * legProportion;

        const legOperatorPrice = legTicketTotal;
        const legTicket = createLegTicket(leg, returnTicket, i);

        const legBooking = await createBooking({
          ticket: legTicket as any,
          isReturn: true,
          paymentIntentId,
          ticketTotal: legTicketTotal,
          discountAmount: legDiscountAmount,
          discountCode,
          operatorPrice: legOperatorPrice,
          passengers,
          selectedFlex,
          flexPrice,
          userId,
        });

        bookings.push(legBooking);
      }
    } else {
      const returnDiscountPortion =
        (discountAmount * returnTotalPrice) / grandTotalPrice;

      const regularReturnTotal = returnTicket.stops.reduce((sum, stop) => {
        return (
          sum +
          stop.price * (passengerAmount.adults || 1) +
          (stop.children_price || 0) * (passengerAmount.children || 0)
        );
      }, 0);

      const returnBooking = await createBooking({
        ticket: returnTicket,
        isReturn: true,
        paymentIntentId,
        ticketTotal: regularReturnTotal,
        discountAmount: returnDiscountPortion,
        discountCode,
        passengers,
        selectedFlex,
        flexPrice,
        userId,
      });

      bookings.push(returnBooking);
    }
  }

  return bookings;
}

/**
 * Creates a single booking
 */
export async function createBooking(params: CreateBookingParams) {
  const {
    ticket,
    isReturn,
    paymentIntentId,
    ticketTotal,
    discountAmount = 0,
    discountCode = null,
    operatorPrice,
    passengers,
    selectedFlex,
    flexPrice,
    userId,
  } = params;

  // Get affiliate code
  let affiliateCode = null;
  if (typeof window !== "undefined") {
    const storedAffiliate = localStorage.getItem("affiliate");
    if (storedAffiliate) {
      const { code, expires } = JSON.parse(storedAffiliate);
      if (Date.now() < expires) {
        affiliateCode = code;
      } else {
        localStorage.removeItem("affiliate");
      }
    }
  }

  const passengersWithPrices = calculatePassengerPrices(passengers, ticket);
  const ticketTotalDiscounted = ticketTotal - discountAmount;

  const { setIsPaymentSuccess, setBookingDetails } =
    usePaymentSuccessStore.getState();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/create/${ticket.operator}/${
        userId || null
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
        operator_price: operatorPrice || ticketTotal,
        departure_station: ticket.stops[0].from._id,
        arrival_station: ticket.stops[0].to._id,
        departure_station_label: ticket.stops[0].from.name,
        arrival_station_label: ticket.stops[0].to.name,
        is_using_deposited_money: false,
        deposit_spent: 0,
        stop: ticket.stops[0],
        is_return: isReturn,
        affiliate_code: affiliateCode,
        gobusly_language: getLanguageFromCookies() || "en",
        ...ticket.metadata,
      }
    );

    const newBooking = response.data.data;

    // Save booking to localStorage for non-users
    if (typeof window !== "undefined") {
      const savedBookings = JSON.parse(
        localStorage.getItem("noUserBookings") || "[]"
      );
      const allBookings = [...savedBookings, newBooking];
      localStorage.setItem("noUserBookings", JSON.stringify(allBookings));
    }

    setIsPaymentSuccess(true);

    // Set booking details
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
  }
}

/**
 * Saves card information to Stripe
 */
export async function saveCardInfo(params: SaveCardInfoParams) {
  const { stripe, elements, user } = params;

  if (!user?.stripe_payment_method_id) {
    throw new Error("No such customer");
  }

  const cardElement = elements.getElement("cardNumber");

  if (!cardElement) {
    throw new Error("Card details not found");
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

  if (stripeError) {
    throw new Error(stripeError.message || "Failed to save payment method");
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/create-setup-intent?customer_id=${user?.stripe_customer_id}&user_id=${user?._id}`,
    {
      payment_method_id: paymentMethod?.id,
    }
  );

  return response.data;
}

/**
 * Fetches user's saved payment methods
 */
export async function fetchPaymentMethods(stripeCustomerId: string) {
  if (!stripeCustomerId) {
    return [];
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/customer/retrieve-payment-methods/${stripeCustomerId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch payment methods");
  }

  const data = await response.json();
  return data.data.data;
}

/**
 * Helper function to create a ticket-like object for connected journey legs
 */
function createLegTicket(
  leg: any,
  parentTicket: ConnectedTicket,
  index: number
) {
  return {
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
        price: leg.price,
        children_price: leg.children_price,
        other_prices: {
          our_price: leg.price,
          our_children_price: leg.children_price,
        },
      },
    ],
    metadata: {
      operator_name: leg.operator.name,
      is_connected_journey: true,
      leg_number: leg.leg_number,
      total_legs: parentTicket.legs.length,
      connection_time:
        index < parentTicket.legs.length - 1
          ? parentTicket.connection_time
          : null,
      intermediate_station:
        index < parentTicket.legs.length - 1
          ? parentTicket.intermediate_station
          : null,
    },
  };
}
