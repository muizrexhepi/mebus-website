"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { getBookingByIdWithChargeData } from "@/actions/bookings";
import { Booking } from "@/models/booking";
import { useLoadingStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Operator } from "@/models/operator";
import DownloadableBookingPDF from "../(components)/DownloadableBooking";

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
  const { isLoading, setIsLoading } = useLoadingStore();

  const fetchBooking = async (noCache?: boolean) => {
    setIsLoading(true);
    if (params.id) {
      const data = await getBookingByIdWithChargeData(params.id, noCache);
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
        {/* <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-26" />
        </div> */}
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

  return (
    <div className="space-y-4 max-w-4xl mx-auto paddingX min-h-screen">
      <DownloadableBookingPDF booking={booking} />
    </div>
  );
}
