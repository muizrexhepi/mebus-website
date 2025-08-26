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
  Eye,
  X,
  MoreHorizontal,
  ArrowRight,
  Wallet,
  Download,
  Loader2,
} from "lucide-react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/hooks/use-toast";
import { FlexUpgradeSheet } from "@/components/dialogs/FlexUpgradeDialog";
import { loadStripe } from "@stripe/stripe-js";
import { isBefore, startOfDay, differenceInDays } from "date-fns";
import { usePaymentSuccessStore } from "@/store";
import { type Booking, TravelFlexPermissions, Flex } from "@/models/booking";
import type { Operator } from "@/models/operator";
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
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);

  const [walletSupport, setWalletSupport] = useState<{
    supported: boolean;
    platform: "ios" | "google" | null;
  }>({
    supported: false,
    platform: null,
  });

  const adults =
    booking.passengers?.filter((passenger) => passenger?.age >= 10)?.length ||
    0;
  const children =
    booking.passengers?.filter((passenger) => passenger?.age < 10)?.length || 0;

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isChrome =
      /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);

    if (isIOS) {
      setWalletSupport({ supported: true, platform: "ios" });
    } else if (isChrome) {
      setWalletSupport({ supported: true, platform: "google" });
    } else {
      setWalletSupport({ supported: false, platform: null });
    }
  }, []);

  const downloadPdf = async () => {
    try {
      setPdfLoading(true);
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/booking/download/pdf/e-ticket/${booking._id}`,
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ticket.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "PDF downloaded successfully!",
      });
    } catch (error) {
      // console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download PDF.",
        variant: "destructive",
      });
    } finally {
      setPdfLoading(false);
    }
  };

  const addToAppleWallet = async () => {
    setWalletLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/wallet/ios/${booking._id}`,
        responseType: "blob",
        headers: {
          Accept: "application/vnd.apple.pkpass",
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.apple.pkpass",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gobusly-ticket-${booking._id}.pkpass`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Pass downloaded! Open the file to add to Apple Wallet.",
      });
    } catch (error) {
      // console.error("Error adding to Apple Wallet:", error);
      toast({
        title: "Error",
        description: "Failed to add ticket to Apple Wallet.",
        variant: "destructive",
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const addToGooglePay = async () => {
    setWalletLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wallet/google/${booking._id}`
      );

      if (response.data.success && response.data.saveUrl) {
        window.open(response.data.saveUrl, "_blank");
        toast({
          title: "Success",
          description: "Redirecting to Google Pay...",
        });
      } else {
        throw new Error("Failed to generate Google Pay pass");
      }
    } catch (error) {
      // console.error("Error adding to Google Pay:", error);
      toast({
        title: "Error",
        description: "Failed to add ticket to Google Pay.",
        variant: "destructive",
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const addToWallet = async () => {
    if (walletSupport.platform === "ios") {
      await addToAppleWallet();
    } else if (walletSupport.platform === "google") {
      await addToGooglePay();
    }
  };

  const canReschedule = () => {
    const today = new Date();
    const departureDate = new Date(booking.departure_date);
    const daysUntilDeparture = differenceInDays(departureDate, today);

    let rescheduleLimit = 0;
    switch (booking.metadata.travel_flex) {
      case Flex.PREMIUM:
        rescheduleLimit = TravelFlexPermissions.PREMIUM.RESCHEDULE;
        break;
      case Flex.BASIC:
        rescheduleLimit = TravelFlexPermissions.BASIC.RESCHEDULE;
        break;
      case Flex.NO_FLEX:
        rescheduleLimit = TravelFlexPermissions.NO_FLEX.RESCHEDULE;
        break;
      default:
        rescheduleLimit = 0;
    }

    return daysUntilDeparture >= rescheduleLimit;
  };

  const canCancel = () => {
    const today = new Date();
    const departureDate = new Date(booking.departure_date);
    return departureDate > today;
  };

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
      // console.error("Error fetching ticket search results", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableDates();
    }
  }, [selectedDate]);

  const handleReschedule = () => {
    if (!canReschedule()) {
      const daysUntilDeparture = differenceInDays(
        new Date(booking.departure_date),
        new Date()
      );
      let rescheduleLimit = 0;

      switch (booking.metadata.travel_flex) {
        case Flex.PREMIUM:
          rescheduleLimit = TravelFlexPermissions.PREMIUM.RESCHEDULE;
          break;
        case Flex.BASIC:
          rescheduleLimit = TravelFlexPermissions.BASIC.RESCHEDULE;
          break;
        case Flex.NO_FLEX:
          rescheduleLimit = TravelFlexPermissions.NO_FLEX.RESCHEDULE;
          break;
      }

      toast({
        title: "Rescheduling Not Available",
        description: `You can only reschedule ${rescheduleLimit} days before departure. Your departure is in ${daysUntilDeparture} days.`,
        variant: "destructive",
      });
      return;
    }

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
                €{booking?.price?.toFixed(2)}
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
              {walletSupport.supported && (
                <>
                  <DropdownMenuItem
                    className="gap-2 py-2.5"
                    onClick={addToWallet}
                    disabled={isRefunded || walletLoading}
                  >
                    {walletLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Wallet className="h-4 w-4" />
                    )}
                    Add to Wallet
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                className="gap-2 py-2.5"
                onClick={downloadPdf}
                disabled={pdfLoading || isRefunded}
              >
                {pdfLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 py-2.5"
                disabled={isRefunded || !canReschedule()}
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
                disabled={isRefunded || !canCancel()}
                className="gap-2 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700"
                onClick={
                  isNoFlex
                    ? handleNoFlexAction
                    : !canCancel()
                    ? () =>
                        toast({
                          title: "Cancellation Not Available",
                          description:
                            "You cannot cancel a booking after the departure date has passed.",
                          variant: "destructive",
                        })
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

        <div className="px-5 py-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center mt-1 md:hidden">
              <div className="w-3 h-3 rounded-full bg-[#ff007f]/80 ring-2 ring-pink-100"></div>
              <div className="w-px h-12 bg-gradient-to-b from-[#ff007f] to-gray-300 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-[#ff007f]/80 ring-2 ring-pink-100"></div>
            </div>

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
                <ArrowRight className="text-[#ff007f]/80" />
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
