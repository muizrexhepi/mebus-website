"use client";

import React, { useEffect, useState } from "react";

import { Booking, Flex } from "@/models/booking";
import { getBookingByIdWithChargeData } from "@/actions/bookings";
import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "./_components/error-message";
import { RefundedMessage } from "./_components/refunded-message";
import { NotAuthorizedMessage } from "./_components/not-authorized-message";
import { isBefore } from "date-fns";
import { BookingConfirmation } from "./_components/booking-confirmation";

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<Booking>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isRefunded, setIsRefunded] = useState(false);
  const isBookingExpired = booking
    ? isBefore(new Date(booking.departure_date), new Date())
    : false;

  useEffect(() => {
    getBookingByIdWithChargeData(id!).then((data) => {
      if (data?.metadata?.refund_action?.is_refunded) {
        setIsRefunded(true);
      }
      setBooking(data);
    });
  }, [id]);

  const getFlexBadgeColor = (flex: Flex) => {
    switch (flex) {
      case Flex.PREMIUM:
        return "bg-green-500 text-white";
      case Flex.BASIC:
        return "bg-blue-500 text-white";
      case Flex.NO_FLEX:
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (!booking) {
    return <ErrorMessage message="Booking not found" />;
  }

  if (isRefunded) {
    return <RefundedMessage />;
  }

  if (isBookingExpired) {
    return <NotAuthorizedMessage />;
  }

  return <BookingConfirmation booking={booking} />;
}
