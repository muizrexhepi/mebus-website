"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { Booking } from "@/models/booking";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";
import { BookingCard } from "./BookingCard";
import { NoBookingsMessage } from "./NoBookingsMessage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookingsDashboardClient: React.FC = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleNoFlexAction = () => {
    toast({
      title: "Upgrade Required",
      description:
        "You need to upgrade to flex booking to perform this action.",
      variant: "destructive",
      action: <ToastAction altText="Upgrade flexibility">Upgrade</ToastAction>,
    });
  };

  const handleCancelBookingAndRefund = async (
    booking_id: string,
    payment_intent_id: string,
    flex: string,
    refund_amount_in_cents: number
  ) => {
    try {
      if (!booking_id) {
        return toast({
          description: "No booking_id provided",
          variant: "destructive",
        });
      }
      if (!payment_intent_id) {
        return toast({
          description: "No payment_intent_id provided",
          variant: "destructive",
        });
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/cancel-and-refund/${booking_id}/${payment_intent_id}`,
        {
          intent: "cancel",
          flex: flex,
          amount_in_cents: refund_amount_in_cents,
        }
      );
    } catch (error: any) {
      return toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/booking/client/${user._id}?select=departure_date metadata destinations labels price`
          );
          setBookings(res.data.data);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  const renderBookings = (filteredBookings: Booking[]) => {
    if (loading) {
      return <Loader2 className="h-6 w-6 animate-spin mx-auto" />;
    }

    if (!filteredBookings || filteredBookings.length === 0) {
      return <NoBookingsMessage isLoading={loading} />;
    }

    return filteredBookings
      .map((booking) => (
        <BookingCard
          onBookingUpdated={() => {}}
          key={booking._id}
          booking={booking}
          handleNoFlexAction={handleNoFlexAction}
          handleCancelBookingAndRefund={handleCancelBookingAndRefund}
        />
      ))
      .reverse();
  };

  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">{t("bookings.myBookings")}</h1>

        <Button asChild variant={"outline"}>
          <Link href="/account/bookings/retrieve-booking">
            Retrieve Booking
          </Link>
        </Button>
      </div>
      {user ? (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="font-medium">
              All
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="font-medium">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="font-medium">
              Past
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-6">{renderBookings(bookings)}</div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {renderBookings(
                bookings.filter((booking) =>
                  moment.utc(booking.departure_date).isAfter(moment.utc())
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-6">
              {renderBookings(
                bookings.filter((booking) =>
                  moment.utc(booking.departure_date).isBefore(moment.utc())
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <NoBookingsMessage isLoading={loading} />
      )}
    </div>
  );
};
export default BookingsDashboardClient;
