"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCardIcon,
  MapPinIcon,
  UserIcon,
  ClockIcon,
  BusIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import moment from "moment-timezone";
import { getBookingByIdWithChargeData } from "@/actions/bookings";
import InfoBlock from "@/components/InfoBlock";
import { Separator } from "@/components/ui/separator";
import { TRAVEL_FLEX_PERMISSIONS } from "@/lib/data";
import { Booking } from "@/models/booking";
import axios from "axios";
import { useLoadingStore, usePaymentSuccessStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { isBefore, startOfDay } from "date-fns";
import { Operator } from "@/models/operator";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/components/hooks/use-toast";
import { FlexUpgradeSheet } from "@/components/dialogs/FlexUpgradeDialog";
import { useTranslation } from "react-i18next";
import PrintableBooking from "../(components)/PrintableBooking";
import DownloadableBookingPDF from "../(components)/DownloadableBooking";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export interface AvailableDate {
  departure_date: string;
  _id: string;
  price: number;
  children_price: number;
  operator_info: Operator;
}

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [booking, setBookings] = useState<Booking>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isExtraPaymentNeeded, setIsExtraPaymentNeeded] =
    useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<any>([]);
  const { isLoading, setIsLoading } = useLoadingStore();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [newDepartureDate, setNewDepartureDate] = useState<AvailableDate>();
  const [priceToBePaid, setPriceToBePaid] = useState<any>();
  const { isPaymentSuccess } = usePaymentSuccessStore();
  const { t } = useTranslation();

  const fetchBooking = async (noCache?: boolean) => {
    setIsLoading(true);
    if (params.id) {
      const data = await getBookingByIdWithChargeData(params.id, noCache);
      setBookings(data);
      setIsLoading(false);
    }
  };

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/ticket/search/available-dates?departureStation=${
          booking?.destinations?.departure_station
        }&arrivalStation=${
          booking?.destinations?.arrival_station
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
    fetchBooking();
  }, []);

  useEffect(() => {
    fetchAvailableDates();
  }, [selectedDate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full max-w-5xl space-y-3 py-20 paddingX mx-auto">
        <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-26" />
        </div>
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-[270px] w-full" />
        <Skeleton className="h-[270px] w-full" />
        <Skeleton className="h-[270px] w-full" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Booking Not Found
            </h2>
            <p className="mt-2 text-center text-gray-600">
              We couldn&apos;t find the booking you&apos;re looking for. Please
              check the booking ID and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateDaysUntilDeparture = (departureDate: Date) => {
    const now = moment();
    const departure = moment(departureDate);
    return departure.diff(now, "days");
  };

  const daysUntilDeparture = calculateDaysUntilDeparture(
    booking?.departure_date!
  );
  const travelFlex = booking?.metadata?.travel_flex;
  const permissions = travelFlex
    ? TRAVEL_FLEX_PERMISSIONS[
        travelFlex.toUpperCase() as keyof typeof TRAVEL_FLEX_PERMISSIONS
      ]
    : null;

  const canCancel = daysUntilDeparture >= permissions?.CAN_CANCEL!;
  const canEdit = daysUntilDeparture >= permissions?.CAN_EDIT!;
  const canReschedule = daysUntilDeparture >= permissions?.RESCHEDULE!;

  const departureDate = moment
    .utc(booking?.departure_date)
    .format("dddd, DD-MM-YYYY");

  const adults =
    booking?.passengers?.filter((passenger) => passenger.age >= 10).length || 0;
  const children =
    booking?.passengers?.filter((passenger) => passenger.age < 10).length || 0;

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };

  const handleOpenModal = async () => {
    setIsDatePickerOpen(true);
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

      fetchBooking(true);
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

  const handleSelectDepartureDate = (date: AvailableDate) => {
    setNewDepartureDate(date);
    if (booking) {
      const price = calculatePrice(booking, date);
      setIsExtraPaymentNeeded(price > 0);
      setPriceToBePaid(price);
    }
  };

  const calculatePrice = (booking: Booking, date: AvailableDate) => {
    const totalNewPrice = date.price * booking.passengers.length;
    const priceDifference = totalNewPrice - booking.price;
    return priceDifference > 0 ? Number(priceDifference.toFixed(2)) : 0;
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto py-20 paddingX min-h-screen">
      <DownloadableBookingPDF booking={booking} />

      {/* <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:items-center">
        <div className="">
          <h2 className="text-3xl font-semibold">
            {t("bookingDetailsPage.bookingDetails")}
          </h2>
          <p className="text-sm text-neutral-800/60">
            Booking ID: {booking?._id}
          </p>

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
        </div>
        <div className="flex items-end gap-2">
          <Button
            onClick={handleOpenModal}
            className="mt-4"
            variant={"secondary"}
          >
            {t("bookingDetailsPage.changeDepartureDate")}
          </Button>
          <Link href={"/bookings"} className="">
            <Button variant="outline" className="">
              <ChevronLeft className="mr-2 h-4 w-4" />{" "}
              {t("bookingDetailsPage.back")}
            </Button>
          </Link>
        </div>
      </div> */}

      {/* <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BusIcon className="mr-2" />
              {t("bookingDetailsPage.tripInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-primary" />
                <div className="flex flex-col font-medium capitalize">
                  {booking?.labels?.from_city}
                  <span className="text-black/60 font-normal text-sm">
                    {booking?.destinations?.departure_station_label}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-primary" />
                <div className="flex flex-col font-medium capitalize">
                  {booking?.labels?.to_city}
                  <span className="text-black/60 font-normal text-sm">
                    {booking?.destinations?.arrival_station_label}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-primary" />
                <span>{departureDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="text-primary" />
                <span>
                  {moment.utc(booking?.departure_date).format("HH:mm")}
                </span>
              </div>
              <InfoBlock
                className="col-span-2 sm:col-span-1"
                desc={t("orderSummary.operatedBy")}
                title={booking?.operator?.name}
                href={booking?.operator?._id}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="mr-2" />
              {t("bookingDetailsPage.passengerInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking?.passengers?.map((passenger, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <h1 className="text-lg font-semibold mb-2">
                    Passenger {index + 1}
                  </h1>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium truncate line-clamp-1">
                        {t("bookingDetailsPage.fullName")}:
                      </span>
                      <span>{passenger?.full_name}</span>
                      <span className="font-medium truncate line-clamp-1">
                        {t("bookingDetailsPage.email")}:
                      </span>
                      <span>{passenger?.email}</span>
                      <span className="font-medium truncate line-clamp-1">
                        {t("bookingDetailsPage.phone")}:
                      </span>
                      <span>{passenger?.phone}</span>
                      <span className="font-medium truncate line-clamp-1">
                        {t("bookingDetailsPage.price")}:
                      </span>
                      <span className="font-semibold">
                        ${passenger?.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCardIcon className="mr-2" />
              {t("bookingDetailsPage.paymentInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {t("bookingDetailsPage.totalPrice")}:
              </span>
              <span className="text-2xl font-bold">
                ${booking?.price?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t("bookingDetailsPage.paymentStatus")}:</span>
              <Badge>{booking?.is_paid ? "Paid" : "Unpaid"}</Badge>
            </div>
            {booking?.charge && (
              <>
                <div className="space-y-2">
                  <div className="font-semibold">
                    {t("bookingDetailsPage.chargeDetails")}:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {booking?.metadata?.deposited_money?.used && (
                      <>
                        <span>
                          {t("bookingDetailsPage.amountUsedFromDeposit")}:
                        </span>
                        <span>
                          $
                          {(
                            booking.metadata.deposited_money.amount_in_cents /
                            100
                          ).toFixed(2)}
                        </span>
                      </>
                    )}
                    <span>{t("bookingDetailsPage.amountCharged")}:</span>
                    <span>${(booking?.charge?.amount / 100).toFixed(2)}</span>
                    <span>{t("bookingDetailsPage.currency")}:</span>
                    <span>{booking?.charge?.currency?.toUpperCase()}</span>
                    <span>{t("bookingDetailsPage.card")}:</span>
                    <span>
                      {booking?.charge?.payment_method_details?.card?.brand?.toUpperCase()}{" "}
                      ****{" "}
                      {booking?.charge?.payment_method_details?.card?.last4}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PhoneIcon className="mr-2" />
              {t("bookingDetailsPage.contactInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MailIcon className="text-primary" />
                <span>{booking?.passengers[0]?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="text-primary" />
                <span>{booking?.passengers[0]?.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("bookingDetailsPage.bookingMetadata")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-gray-600">
                {t("bookingDetailsPage.chargeId")}:
              </span>
              <span className="truncate font-mono text-xs bg-gray-100 p-1 rounded">
                {booking?.charge?.id}
              </span>
              <span className="text-sm text-gray-600">
                {t("bookingDetailsPage.paymentIntentId")}:
              </span>
              <span className="truncate font-mono text-xs bg-gray-100 p-1 rounded">
                {booking?.metadata?.payment_intent_id}
              </span>
            </div>
            {booking?.charge?.receipt_url && (
              <div className="mt-4">
                <Link href={booking?.charge.receipt_url}>
                  <Button variant="outline" size="sm">
                    {t("bookingDetailsPage.viewReceipt")}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
