"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Using Lucide React
import axios from "axios";
import type { Booking } from "@/models/booking"; // Importing your Booking model
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/providers/auth-provider";
import { useNavbarStore } from "@/store";
import { BookingCard } from "./BookingCard";
import { NoBookingsMessage } from "./NoBookingsMessage";

const BookingsDashboardClient: React.FC = () => {
  const { user, isAuthenticated } = useAuth(); // Get isAuthenticated from useAuth
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { setOpenLogin } = useNavbarStore();

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
      toast({
        title: "Success",
        description: "Booking cancelled and refunded successfully.",
      });
      // Refetch bookings after successful cancellation
      if (user) {
        fetchBookings();
      }
    } catch (error: any) {
      // console.error("Cancellation failed:", error);
      toast({
        description:
          error.response?.data?.message || "Failed to cancel booking.",
        variant: "destructive",
      });
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/client/${user?._id}?select=departure_date metadata destinations labels price`
      );
      setBookings(res.data.data);
    } catch (error) {
      // console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]); // Depend on user to refetch when user state changes

  const handleLoginClick = () => {
    setOpenLogin(true);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
      );
    }

    if (!isAuthenticated || bookings.length === 0) {
      return (
        <NoBookingsMessage
          isLoading={loading}
          isAuthenticated={isAuthenticated}
          onLoginClick={handleLoginClick}
        />
      );
    }

    return (
      <div className="space-y-6">
        {bookings
          .sort(
            (a, b) =>
              new Date(b.departure_date).getTime() -
              new Date(a.departure_date).getTime()
          )
          .map((booking) => (
            <BookingCard
              onBookingUpdated={() => {
                if (user) fetchBookings();
              }}
              key={booking._id}
              booking={booking}
              handleNoFlexAction={handleNoFlexAction}
              handleCancelBookingAndRefund={handleCancelBookingAndRefund}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full pb-20 md:pb-0">
      <div className="flex justify-between items-center px-4 md:px-0">
        <h1 className="text-3xl font-medium text-gray-900 hidden sm:block pb-4">
          {t("bookings.myBookings", "Your bookings")}
        </h1>
      </div>
      {renderContent()}
    </div>
  );
};

export default BookingsDashboardClient;
