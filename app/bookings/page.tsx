"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ClockIcon,
  DollarSign,
  XCircle,
  Edit,
  View,
  Download,
  Loader,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import { environment } from "@/environment";
import { Booking } from "@/models/booking";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useUser from "@/components/hooks/use-user";
import moment from "moment-timezone";

const BookingsDashboard: React.FC = () => {
  const { user, loading } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [noUserBookings, setNoUserBookings] = useState<Booking[]>([]);
  const [showFlexAlert, setShowFlexAlert] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
      console.log("Saved bookings from localStorage:", savedBookings);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(
            `${environment.apiurl}/booking/client/${user.$id}?select=departure_date metadata destinations labels price`
          );
          setBookings(res.data.data);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  const downloadBooking = async (booking_id: string) => {
    try {
      const response = await axios.post(
        `${environment.apiurl}/booking/download/pdf/e-ticket/${booking_id}`,
        {},
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `booking_${booking_id}.pdf`;
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);

      toast({
        title: "Download Successful",
        description: "Your booking PDF has been downloaded.",
      });
    } catch (error) {
      console.error("Failed to download booking:", error);
      toast({
        title: "Download Failed",
        description:
          "There was an error downloading your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderNoBookingsMessage = () => {
    if (!user && (!noUserBookings || noUserBookings.length === 0) && !loading) {
      return (
        <div className="text-center space-y-4 mt-8">
          <p className="text-gray-500">
            You don't have any bus ticket bookings yet.
          </p>
          <Button asChild>
            <Link href="/">Book Your First Ticket</Link>
          </Button>
        </div>
      );
    } else if (user && (!bookings || bookings.length === 0) && !loading) {
      return (
        <div className="text-center space-y-4 mt-8">
          <p className="text-gray-500">
            You don't have any bus ticket bookings yet.
          </p>
          <Button asChild>
            <Link href="/">Book Your First Ticket</Link>
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderBookingCard = (booking: Booking) => {
    const departureDate = new Date(booking.departure_date);
    const monthString = departureDate.toLocaleString("en-US", {
      month: "short",
    });
    const dayString = departureDate.toLocaleString("en-US", {
      weekday: "short",
    });
    const dateNumber = departureDate.getDate();
    const timeString = departureDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const isNoFlex = booking.metadata.travel_flex === "no_flex";

    return (
      <Card key={booking._id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 relative">
            <div className="flex items-center space-x-6 w-full sm:w-auto ">
              <div className="text-center w-20 flex-shrink-0 border-r pr-3">
                <p className="text-sm text-gray-500">{monthString}</p>
                <p className="text-3xl font-semibold">{dateNumber}</p>
                <p className="text-sm text-gray-500">{dayString}</p>
              </div>
              <div className="flex flex-col space-y-2 whitespace-nowrap">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                  <span>{timeString}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  <span>{booking.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end h-14 sm:h-24 sm:justify-start">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-3 w-3 rounded-full bg-emerald-700" />
                  <div className="flex-1 ml-[5px] border-l-1 border-dotted border-emerald-700 border w-0" />
                  <div className="h-3 w-3 rounded-full bg-emerald-700" />
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
              <Badge className="capitalize absolute bottom-2 right-0 sm:relative sm:bottom-0">
                {booking.metadata.travel_flex == "no_flex"
                  ? "No flexibility"
                  : booking.metadata.travel_flex}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-full sm:w-auto">
                  Actions
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  className="gap-2"
                  onClick={
                    isNoFlex
                      ? handleNoFlexAction
                      : () => {
                          /* Reschedule logic */
                        }
                  }
                >
                  <ClockIcon className="h-4 w-4" />
                  Reschedule booking
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={
                    isNoFlex
                      ? handleNoFlexAction
                      : () => {
                          /* Edit logic */
                        }
                  }
                >
                  <Edit className="h-4 w-4" />
                  Edit details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push(`/bookings/${booking._id}`)}
                >
                  <View className="h-4 w-4" />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => downloadBooking(booking?._id)}
                >
                  <Download className="h-4 w-4" />
                  Download booking
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2"
                  onClick={
                    isNoFlex
                      ? handleNoFlexAction
                      : () => {
                          /* Cancel logic */
                        }
                  }
                >
                  <XCircle className="h-4 w-4" />
                  Cancel booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 md:px-6 paddingY space-y-4 py-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>
      <h2 className="text-3xl font-semibold mb-4">My Bookings</h2>
      <p className="text-gray-600 mb-6">
        Explore and manage your bookings below. Review your upcoming trips,
        check your past reservations, and stay informed about your travel plans.
      </p>
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
              <Loader className="h-6 w-6 animate-spin mx-auto" />
            ) : user ? (
              bookings?.map((booking) => renderBookingCard(booking))
            ) : (
              noUserBookings?.map((booking) => renderBookingCard(booking))
            )}
            {renderNoBookingsMessage()}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {user
              ? bookings
                  ?.filter((booking) =>
                    moment(booking.departure_date).isAfter(moment.utc())
                  )
                  ?.map((booking) => renderBookingCard(booking))
              : noUserBookings?.map((booking) => renderBookingCard(booking))}
            {renderNoBookingsMessage()}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="space-y-6">
            {user
              ? bookings
                  ?.filter((booking) =>
                    moment(booking.departure_date).isBefore(moment.utc())
                  )
                  ?.map((booking) => renderBookingCard(booking))
              : noUserBookings?.map((booking) => renderBookingCard(booking))}
            {renderNoBookingsMessage()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsDashboard;
