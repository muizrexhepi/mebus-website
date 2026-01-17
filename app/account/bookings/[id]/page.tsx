"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { getBookingByIdWithChargeData } from "@/actions/bookings";
import { Booking } from "@/models/booking";
import { useLoadingStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Operator } from "@/models/operator";
import DownloadableBookingPDF from "../(components)/DownloadableBooking";
import { use } from "react";

export interface AvailableDate {
  departure_date: string;
  _id: string;
  price: number;
  children_price: number;
  operator_info: Operator;
}

// ✅ Updated: params is now a Promise
export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Unwrap the params Promise using React.use()
  const { id } = use(params);

  const [booking, setBookings] = useState<Booking>();
  const { isLoading, setIsLoading } = useLoadingStore();

  const fetchBooking = async (noCache?: boolean) => {
    setIsLoading(true);
    if (id) {
      const data = await getBookingByIdWithChargeData(id, noCache);
      setBookings(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen w-full space-y-4">
        {/* <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-26" />
        </div> */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
        <Skeleton className="h-full w-full rounded-xl" />
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
    <div className="max-w-4xl mx-auto min-h-screen pb-20 md:pb-0">
      <DownloadableBookingPDF booking={booking} />
    </div>
  );
}
