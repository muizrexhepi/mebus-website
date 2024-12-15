import React, { useRef, useCallback } from "react";
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
  Edit,
  View,
  Download,
  XCircle,
} from "lucide-react";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintableBooking from "./PrintableBooking";
import { Booking } from "@/models/booking";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  booking: Booking;
  handleNoFlexAction: () => void;
  handleCancelBookingAndRefund: (
    bookingId: string,
    paymentIntentId: string,
    travelFlex: string,
    refundAmount: number
  ) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  handleNoFlexAction,
  handleCancelBookingAndRefund,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const bookingRef = useRef<HTMLDivElement>(null);
  const isNoFlex = booking.metadata.travel_flex === "no_flex";

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 relative">
          <div className="flex items-center space-x-6 w-full sm:w-auto ">
            <div className="text-center w-20 flex-shrink-0 border-r pr-3">
              <p className="text-sm text-black bold">
                {moment.utc(booking.departure_date).format("ddd, MM YYYY")}
              </p>
            </div>
            <div className="flex flex-col space-y-2 whitespace-nowrap">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {moment.utc(booking.departure_date).format("HH:mm")}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <DollarSign className="h-4 w-4" />
                <span>{booking.price.toFixed(2)}</span>
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
                  {booking.labels.from_city}
                  <span className="text-black/60 hidden sm:block">
                    {booking.destinations.departure_station_label}
                  </span>
                </div>
                <div className="text-sm font-medium capitalize flex flex-col">
                  {booking.labels.to_city}
                  <span className="text-black/60 hidden sm:block">
                    {booking.destinations.arrival_station_label}
                  </span>
                </div>
              </div>
            </div>
            <Badge
              className={`capitalize absolute bottom-2 right-0 sm:relative sm:bottom-0 ${
                booking.metadata.refund_action?.is_refunded && "bg-red-500"
              }`}
            >
              {!booking.metadata.refund_action?.is_refunded
                ? booking.metadata.travel_flex == "no_flex"
                  ? "No flexibility"
                  : booking.metadata.travel_flex
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
                disabled={booking.metadata.refund_action?.is_refunded}
                onClick={
                  isNoFlex
                    ? handleNoFlexAction
                    : () => {
                        /* Reschedule logic */
                      }
                }
              >
                <ClockIcon className="h-4 w-4" />
                {t("actions.rescheduleBooking")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                disabled={booking.metadata.refund_action?.is_refunded}
                onClick={
                  isNoFlex
                    ? handleNoFlexAction
                    : () => {
                        /* Edit logic */
                      }
                }
              >
                <Edit className="h-4 w-4" />
                {t("actions.editDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => router.push(`/bookings/${booking._id}`)}
              >
                <View className="h-4 w-4" />
                {t("actions.viewDetails")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={booking.metadata.refund_action?.is_refunded}
                className="gap-2"
                onClick={
                  isNoFlex
                    ? handleNoFlexAction
                    : () =>
                        handleCancelBookingAndRefund(
                          booking._id,
                          booking.metadata.payment_intent_id,
                          booking.metadata.travel_flex,
                          Math.round(booking.price * 100 * 0.7)
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
    </Card>
  );
};
