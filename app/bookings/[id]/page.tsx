"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCardIcon,
  MapPinIcon,
  UserIcon,
  ClockIcon,
  BusIcon,
  BuildingIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  ArrowLeft,
  ChevronLeft,
  DollarSignIcon,
  EuroIcon,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import moment from "moment-timezone";
import { getBookingByIdWithChargeData } from "@/actions/bookings";
import InfoBlock from "@/components/InfoBlock";
import { Separator } from "@/components/ui/separator";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import { TRAVEL_FLEX_PERMISSIONS, TRAVEL_FLEX_TYPES } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Booking } from "@/models/booking";
import { environment } from "@/environment";
import axios from "axios";
import { useLoadingStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [booking, setBookings] = useState<Booking>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState([]);
  const { isLoading, setIsLoading } = useLoadingStore();

  const fetchBooking = async () => {
    setIsLoading(true);
    if (params.id) {
      const data = await getBookingByIdWithChargeData(params.id);
      setBookings(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full max-w-5xl space-y-3 py-20 paddingX mx-auto">
        <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
          <SecondaryNavbar />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-14 w-40" />
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

  console.log({
    daysUntilDeparture,
    travelFlex,
    permissions,
    canCancel,
    canEdit,
    canReschedule,
  });

  const departureDate = moment
    .utc(booking?.departure_date)
    .format("dddd, DD-MM-YYYY");

  const adults =
    booking?.passengers?.filter((passenger) => passenger.age >= 10).length || 0;
  const children =
    booking?.passengers?.filter((passenger) => passenger.age < 10).length || 0;

  const handleOpenModal = async () => {
    setIsDatePickerOpen(true);

    try {
      const response = await axios.get(
        `${environment.apiurl}/ticket/search/available-dates?departureStation=${
          booking?.destinations?.departure_station
        }&arrivalStation=${
          booking?.destinations?.arrival_station
        }&departureDate=${moment
          .utc()
          .add(7, "days")
          .format("DD-MM-YYYY")}&adults=${adults}&children=${children}&page=1`
      );
      setAvailableDates(response.data.data);
    } catch (error) {
      console.error("Error fetching ticket search results", error);
    }
  };

  interface AvailableDate {
    departure_date: string;
    price: number;
    children_price: number;
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto py-20 paddingX">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <SecondaryNavbar />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Booking Details</h2>
          <p className="text-sm text-neutral-800/60">
            Booking ID: {booking?._id}
          </p>
          <Button
            onClick={handleOpenModal}
            className="mt-4"
            variant={"secondary"}
          >
            Change departure date
          </Button>
          <Dialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {travelFlex === "no_flex"
                    ? "You cannot make any changes to your trip with no travel flex."
                    : "Please select one of the available travel dates"}
                </DialogTitle>
              </DialogHeader>
              {travelFlex === "no_flex" && (
                <InfoBlock
                  desc="You need to upgrade your travel flex in order to make changes to your booking"
                  title={"Click here to upgrade"}
                  href={`/upgrade/flex/${booking?._id}`}
                  required_full_url={true}
                />
              )}

              {travelFlex !== "no_flex" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableDates?.map((date: AvailableDate, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                          <span className="font-medium">
                            {moment
                              .utc(date.departure_date)
                              .format("dddd, DD-MM-YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <ClockIcon className="h-5 w-5 text-primary" />
                          <span>
                            {moment.utc(date.departure_date).format("HH:mm")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <EuroIcon className="h-5 w-5 text-green-600" />
                            <span>Adult: {date.price.toFixed(2)}</span>
                          </div>
                          <Badge variant="secondary">
                            Child: {date.children_price.toFixed(2)}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <Button
                onClick={() => setIsDatePickerOpen(false)}
                className="mt-4 w-full"
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <Link href={"/bookings"}>
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BusIcon className="mr-2" />
              Trip Information
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
                desc="This trip will be operated by"
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
              Passenger Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking?.passengers?.map((passenger, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Passenger {index + 1}
                  </h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium">Full Name:</span>
                      <span>{passenger?.full_name}</span>
                      <span className="font-medium">Email:</span>
                      <span>{passenger?.email}</span>
                      <span className="font-medium">Phone:</span>
                      <span>{passenger?.phone}</span>
                      <span className="font-medium">Price:</span>
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
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-2xl font-bold">
                ${booking?.price?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Payment Status:</span>
              <Badge>{booking?.is_paid ? "Paid" : "Unpaid"}</Badge>
            </div>
            {booking?.charge && (
              <>
                <div className="space-y-2">
                  <div className="font-semibold">Charge Details:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {booking?.metadata?.deposited_money?.used && (
                      <>
                        <span>Amount used from your deposit:</span>
                        <span>
                          $
                          {(
                            booking.metadata.deposited_money.amount_in_cents /
                            100
                          ).toFixed(2)}
                        </span>
                      </>
                    )}
                    <span>Amount Charged:</span>
                    <span>${(booking?.charge?.amount / 100).toFixed(2)}</span>
                    <span>Currency:</span>
                    <span>{booking?.charge?.currency?.toUpperCase()}</span>
                    <span>Card:</span>
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
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            <CardTitle>Booking Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-sm text-gray-600">Charge ID:</span>
              <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                {booking?.charge?.id}
              </span>
              <span className="text-sm text-gray-600">Payment Intent ID:</span>
              <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                {booking?.metadata?.payment_intent_id}
              </span>
            </div>
            {booking?.charge?.receipt_url && (
              <div className="mt-4">
                <Link href={booking?.charge.receipt_url}>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
