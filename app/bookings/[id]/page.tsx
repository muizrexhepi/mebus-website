import React from "react";
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

export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let booking = null;
  if (params.id) {
    booking = await getBookingByIdWithChargeData(params.id);
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

  const departureDate = moment
    .utc(booking.departure_date)
    .format("dddd, DD-MM-YYYY");

  return (
    <div className="space-y-8 max-w-5xl mx-auto paddingY paddingX">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <SecondaryNavbar />
      </div>
      <Link
        href={"/bookings"}
        className="flex items-center gap-2 hover:underline"
      >
        <ArrowLeft color="black" size={20} />
        Back
      </Link>
      <div>
        <h2 className="text-3xl font-semibold">Booking Details</h2>
        <p className="text-sm text-neutral-800/60">Booking ID: {booking._id}</p>
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
                    {booking?.destinations.departure_station_label}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-primary" />
                <div className="flex flex-col font-medium capitalize">
                  {booking?.labels?.to_city}
                  <span className="text-black/60 font-normal text-sm">
                    {booking?.destinations.arrival_station_label}
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
                  {moment.utc(booking.departure_date).format("HH:mm")}
                </span>
              </div>
              <InfoBlock
                desc="This trip will be operated by"
                title={booking.operator.name}
                href={booking.operator._id}
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
                      <span>{passenger.full_name}</span>
                      <span className="font-medium">Email:</span>
                      <span>{passenger.email}</span>
                      <span className="font-medium">Phone:</span>
                      <span>{passenger.phone}</span>
                      <span className="font-medium">Price:</span>
                      <span className="font-semibold">
                        ${passenger.price.toFixed(2)}
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
                ${booking.price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Payment Status:</span>
              <Badge>{booking.is_paid ? "Paid" : "Unpaid"}</Badge>
            </div>
            {booking.charge && (
              <>
                <div className="space-y-2">
                  <div className="font-semibold">Charge Details:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <span>Amount Charged:</span>
                    <span>${(booking.charge.amount / 100).toFixed(2)}</span>
                    <span>Currency:</span>
                    <span>{booking.charge.currency.toUpperCase()}</span>
                    <span>Card:</span>
                    <span>
                      {booking.charge.payment_method_details.card.brand.toUpperCase()}{" "}
                      **** {booking.charge.payment_method_details.card.last4}
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
                <span>{booking.passengers[0].email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="text-primary" />
                <span>{booking.passengers[0].phone}</span>
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
                {booking.charge?.id}
              </span>
              <span className="text-sm text-gray-600">Payment Intent ID:</span>
              <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                {booking.metadata.payment_intent_id}
              </span>
            </div>
            {booking.charge?.receipt_url && (
              <div className="mt-4">
                <Link href={booking.charge.receipt_url}>
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
