"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClockIcon,
  DollarSign,
  ChevronDownIcon,
  View,
  XCircle,
} from "lucide-react";
import moment from "moment";
import { Booking } from "@/models/booking";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/hooks/use-toast";
import { FlexUpgradeSheet } from "@/components/dialogs/FlexUpgradeDialog";
import { loadStripe } from "@stripe/stripe-js";
import { isBefore, startOfDay } from "date-fns";
import { usePaymentSuccessStore } from "@/store";
import { Operator } from "@/models/operator";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

interface BookingCardProps {
  booking: Booking;
  handleNoFlexAction: () => void;
  handleCancelBookingAndRefund: (
    bookingId: string,
    paymentIntentId: string,
    travelFlex: string,
    refundAmount: number
  ) => void;
  onBookingUpdated: () => void;
}

export interface AvailableDate {
  departure_date: string;
  _id: string;
  price: number;
  children_price: number;
  operator_info: Operator;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  handleNoFlexAction,
  handleCancelBookingAndRefund,
  onBookingUpdated,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isNoFlex = booking.metadata.travel_flex === "no_flex";
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isExtraPaymentNeeded, setIsExtraPaymentNeeded] =
    useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [newDepartureDate, setNewDepartureDate] = useState<AvailableDate>();
  const [priceToBePaid, setPriceToBePaid] = useState<any>();
  const { isPaymentSuccess } = usePaymentSuccessStore();

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL
        }/ticket/search/available-dates?departureStation=${booking.destinations?.departure_station
        }&arrivalStation=${booking.destinations?.arrival_station
        }&departureDate=${moment(selectedDate).format(
          "DD-MM-YYYY"
        )}&adults=${adults}&children=${children}&page=1`
      );

      setAvailableDates(response.data.data);
    } catch (error) {
      console.error("Error fetching ticket search results", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableDates();
    }
  }, [selectedDate]);

  const handleReschedule = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };

  const handleSelectDepartureDate = (date: AvailableDate) => {
    setNewDepartureDate(date);
    const price = calculatePrice(booking, date);
    if (!price) return;
    setIsExtraPaymentNeeded(price > 0);
    setPriceToBePaid(price);
  };

  const handleChangeDepartureDate = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/change/departure-date/${booking._id}`,
        {
          operator_id: newDepartureDate?.operator_info._id,
          new_departure_date: newDepartureDate?.departure_date,
        }
      );

      onBookingUpdated();
      setIsDatePickerOpen(false);
      toast({
        variant: "default",
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
  };

  const calculatePrice = (booking: Booking, date: AvailableDate) => {
    if (!booking) {
      return;
    }
    const totalNewPrice = date?.price * booking?.passengers?.length;
    const priceDifference = totalNewPrice - booking?.price;
    return priceDifference > 0 ? Number(priceDifference?.toFixed(2)) : 0;
  };

  const adults =
    booking.passengers?.filter((passenger) => passenger?.age >= 10)?.length || 0;
  const children =
    booking.passengers?.filter((passenger) => passenger?.age < 10)?.length || 0;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 relative">
          <div className="flex items-center space-x-6 w-full sm:w-auto ">
            <div className="text-center w-20 flex-shrink-0 border-r pr-3">
              <p className="text-sm text-black bold">
                {moment.utc(booking?.departure_date).format("ddd, MM YYYY")}
              </p>
            </div>
            <div className="flex flex-col space-y-2 whitespace-nowrap">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {moment.utc(booking?.departure_date).format("HH:mm")}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <DollarSign className="h-4 w-4" />
                <span>{booking?.price?.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end h-12 sm:h-24 sm:justify-start">
              <div className="flex flex-col justify-between h-full">
                <div className="h-3 w-3 rounded-full bg-primary-accent" />
                <div className="flex-1 ml-[5px] border-l-1 border-dotted border-primary-accent border w-0" />
                <div className="h-3 w-3 rounded-full bg-primary-accent" />
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="text-sm font-medium capitalize flex flex-col">
                  {booking?.labels?.from_city}
                  <span className="text-black/60 hidden sm:block">
                    {booking?.destinations?.departure_station_label}
                  </span>
                </div>
                <div className="text-sm font-medium capitalize flex flex-col">
                  {booking?.labels?.to_city}
                  <span className="text-black/60 hidden sm:block">
                    {booking?.destinations?.arrival_station_label}
                  </span>
                </div>
              </div>
            </div>
            <Badge
              className={`capitalize absolute bottom-2 right-0 sm:relative sm:bottom-0 ${booking?.metadata?.refund_action?.is_refunded && "bg-red-500"
                }`}
            >
              {!booking?.metadata?.refund_action?.is_refunded
                ? booking?.metadata?.travel_flex == "no_flex"
                  ? "No flexibility"
                  : booking?.metadata?.travel_flex
                : "Refunded"}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-full sm:w-auto">
                {t("actions.actions")}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className="gap-2"
                disabled={booking?.metadata?.refund_action?.is_refunded}
                onClick={isNoFlex ? handleNoFlexAction : handleReschedule}
              >
                <ClockIcon className="h-4 w-4" />
                {t("actions.rescheduleBooking")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => router.push(`/bookings/${booking?._id}`)}
              >
                <View className="h-4 w-4" />
                {t("actions.viewDetails")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={booking?.metadata?.refund_action?.is_refunded}
                className="gap-2"
                onClick={
                  isNoFlex
                    ? handleNoFlexAction
                    : () =>
                      handleCancelBookingAndRefund(
                        booking?._id,
                        booking?.metadata?.payment_intent_id,
                        booking?.metadata?.travel_flex,
                        Math.round(booking?.price * 100 * 0.7)
                      )
                }
              >
                <XCircle className="h-4 w-4" />
                {t("actions.cancelBooking")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <FlexUpgradeSheet
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
        booking={booking}
        availableDates={availableDates}
        selectedDate={selectedDate}
        isDateDisabled={isDateDisabled}
        handleDateSelect={handleDateSelect}
        handleSelectDepartureDate={handleSelectDepartureDate}
        isExtraPaymentNeeded={isExtraPaymentNeeded}
        stripePromise={stripePromise}
        isPaymentSuccess={isPaymentSuccess}
        priceToBePaid={priceToBePaid}
        handleChangeDepartureDate={handleChangeDepartureDate}
      />
    </Card>
  );
};
