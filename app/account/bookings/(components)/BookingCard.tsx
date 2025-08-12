"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  Clock,
  DollarSign,
  ChevronDown,
  Eye,
  X,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/hooks/use-toast";
import { FlexUpgradeSheet } from "@/components/dialogs/FlexUpgradeDialog";
import { loadStripe } from "@stripe/stripe-js";
import { isBefore, startOfDay } from "date-fns";
import { usePaymentSuccessStore } from "@/store";
import { Booking } from "@/models/booking";
import { Operator } from "@/models/operator";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
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

  const adults =
    booking.passengers?.filter((passenger) => passenger?.age >= 10)?.length ||
    0;
  const children =
    booking.passengers?.filter((passenger) => passenger?.age < 10)?.length || 0;

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/ticket/search/available-dates?departureStation=${
          booking.destinations?.departure_station
        }&arrivalStation=${
          booking.destinations?.arrival_station
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

  const formatCityName = (cityName: string) => {
    return cityName?.charAt(0).toUpperCase() + cityName?.slice(1).toLowerCase();
  };

  const isRefunded = booking?.metadata?.refund_action?.is_refunded;

  return (
    <Card className="bg-white border-0 transition-all duration-200 rounded-2xl overflow-hidden mb-3">
      <CardContent className="p-0 relative">
        {/* Header with date and actions */}
        <Link
          href={`/account/bookings/${booking._id}`}
          className="text-sm text-transparent font-normal button-gradient bg-clip-text bottom-5 right-5 absolute p-1"
        >
          View details
        </Link>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-900 leading-tight">
                {moment.utc(booking?.departure_date).format("MMM DD")}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {moment.utc(booking?.departure_date).format("YYYY")}
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">
                {moment.utc(booking?.departure_date).format("HH:mm")}
              </div>
              <div className="text-sm text-gray-500">
                ${booking?.price?.toFixed(2)}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="gap-2 py-2.5"
                disabled={isRefunded}
                onClick={isNoFlex ? handleNoFlexAction : handleReschedule}
              >
                <Clock className="h-4 w-4" />
                {t("actions.rescheduleBooking")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 py-2.5"
                onClick={() => router.push(`/account/bookings/${booking?._id}`)}
              >
                <Eye className="h-4 w-4" />
                {t("actions.viewDetails")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isRefunded}
                className="gap-2 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700"
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
                <X className="h-4 w-4" />
                {t("actions.cancelBooking")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Route visualization */}
        <div className="px-5 py-4">
          <div className="flex items-start gap-4">
            {/* Timeline dots and line */}
            <div className="flex flex-col items-center mt-1 md:hidden">
              <div className="w-3 h-3 rounded-full bg-[#ff007f]/80 ring-2 ring-pink-100"></div>
              <div className="w-px h-12 bg-gradient-to-b from-[#ff007f] to-gray-300 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-[#ff007f]/80 ring-2 ring-pink-100"></div>
            </div>

            {/* Route details */}
            <div className="flex-1 space-y-6 md:flex md:space-y-0 items-center gap-12">
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  {formatCityName(booking?.labels?.from_city)}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {booking?.destinations?.departure_station_label}
                </div>
              </div>

              <div className="hidden md:block">
                <ArrowRight className=" text-[#ff007f]/80" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  {formatCityName(booking?.labels?.to_city)}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {booking?.destinations?.arrival_station_label}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <Badge
            variant="secondary"
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border-0 ${
              isRefunded
                ? "bg-red-50 text-red-700"
                : booking?.metadata?.travel_flex === "no_flex"
                ? "bg-gray-100 text-gray-700"
                : "bg-pink-50 text-[#ff007f]"
            }`}
          >
            {isRefunded
              ? "Refunded"
              : booking?.metadata?.travel_flex === "no_flex"
              ? "No flexibility"
              : booking?.metadata?.travel_flex?.replace(/_/g, " ")}
          </Badge>
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
