"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { Booking } from "@/models/booking";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useUser from "@/components/hooks/use-user";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { BookingCard } from "./(components)/BookingCard";
import { NoBookingsMessage } from "./(components)/NoBookingsMessage";
import { useAuth } from "@/components/providers/auth-provider";

const BookingsDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [noUserBookings, setNoUserBookings] = useState<Booking[]>([]);
  const [showFlexAlert, setShowFlexAlert] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  console.log({ user });
  const handleNoFlexAction = () => {
    setShowFlexAlert(true);
    toast({
      title: "Upgrade Required",
      description:
        "You need to upgrade to flex booking to perform this action.",
      variant: "destructive",
      action: <ToastAction altText="Upgrade flexibility">Upgrade</ToastAction>,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBookings = JSON.parse(
        localStorage.getItem("noUserBookings") || "[]"
      );
      setNoUserBookings(savedBookings);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/booking/client/${user._id}?select=departure_date metadata destinations labels price`
          );
          console.log({ bookings: res });
          setBookings(res.data.data);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  const renderNoBookingsMessage = () => {
    return noUserBookings.length > 0 ? (
      noUserBookings.map((booking) => (
        <BookingCard
          onBookingUpdated={() => {}}
          key={booking._id}
          booking={booking}
          handleNoFlexAction={handleNoFlexAction}
          handleCancelBookingAndRefund={handleCancelBookingAndRefund}
        />
      ))
    ) : (
      <NoBookingsMessage isLoading={loading} />
    );
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

  return (
    <div className="flex flex-col max-w-4xl mx-auto paddingX space-y-4 py-12 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">
        {t("bookings.myBookings")}
      </h2>
      {/* <p className="text-gray-600 mb-6">{t("bookings.manageBookings")}</p> */}
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
            <div className="space-y-6">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
              ) : user ? (
                bookings
                  ?.map((booking) => (
                    <BookingCard
                      onBookingUpdated={() => {}}
                      key={booking._id}
                      booking={booking}
                      handleNoFlexAction={handleNoFlexAction}
                      handleCancelBookingAndRefund={
                        handleCancelBookingAndRefund
                      }
                    />
                  ))
                  .reverse()
              ) : (
                noUserBookings
                  ?.map((booking) => (
                    <BookingCard
                      onBookingUpdated={() => {}}
                      key={booking._id}
                      booking={booking}
                      handleNoFlexAction={handleNoFlexAction}
                      handleCancelBookingAndRefund={
                        handleCancelBookingAndRefund
                      }
                    />
                  ))
                  .reverse()
              )}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {user
                ? bookings
                    ?.filter((booking) =>
                      moment.utc(booking.departure_date).isAfter(moment.utc())
                    )
                    ?.map((booking) => (
                      <BookingCard
                        onBookingUpdated={() => {}}
                        key={booking._id}
                        booking={booking}
                        handleNoFlexAction={handleNoFlexAction}
                        handleCancelBookingAndRefund={
                          handleCancelBookingAndRefund
                        }
                      />
                    ))
                    .reverse()
                : noUserBookings
                    ?.filter((booking) =>
                      moment.utc(booking.departure_date).isAfter(moment.utc())
                    )
                    ?.map((booking) => (
                      <BookingCard
                        onBookingUpdated={() => {}}
                        key={booking._id}
                        booking={booking}
                        handleNoFlexAction={handleNoFlexAction}
                        handleCancelBookingAndRefund={
                          handleCancelBookingAndRefund
                        }
                      />
                    ))
                    .reverse()}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-6">
              {user
                ? bookings
                    ?.filter((booking) =>
                      moment.utc(booking.departure_date).isBefore(moment.utc())
                    )
                    ?.map((booking) => (
                      <BookingCard
                        onBookingUpdated={() => {}}
                        key={booking._id}
                        booking={booking}
                        handleNoFlexAction={handleNoFlexAction}
                        handleCancelBookingAndRefund={
                          handleCancelBookingAndRefund
                        }
                      />
                    ))
                    .reverse()
                : noUserBookings
                    ?.filter((booking) =>
                      moment.utc(booking.departure_date).isBefore(moment.utc())
                    )
                    ?.map((booking) => (
                      <BookingCard
                        onBookingUpdated={() => {}}
                        key={booking._id}
                        booking={booking}
                        handleNoFlexAction={handleNoFlexAction}
                        handleCancelBookingAndRefund={
                          handleCancelBookingAndRefund
                        }
                      />
                    ))
                    .reverse()}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        renderNoBookingsMessage()
      )}
    </div>
  );
};

export default BookingsDashboard;
