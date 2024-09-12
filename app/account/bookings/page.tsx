"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
  LuggageIcon,
  PhoneIcon,
  MailIcon,
  ArrowUpCircle,
  ArrowRightIcon,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { environment } from "@/environment";
import { account } from "@/appwrite.config";
import { Booking } from "@/models/booking";
import { Route } from "@/models/route";
import { Passenger } from "@/models/passenger";

interface FlexFeature {
  name: string;
  price: number;
  value: string;
  features: string[];
}

const flexFeatures: FlexFeature[] = [
  {
    name: "Premium Flex",
    value: "premium",
    price: 4,
    features: [
      "Cancel your trip up to 5 days before departure",
      "Change trip details up to 3 days before departure",
      "Customer support assistance",
    ],
  },
  {
    name: "Basic Flex",
    value: "basic",
    price: 2,
    features: [
      "Cancel your trip up to 48 hours before departure",
      "Change trip details up to 24 hours before departure",
    ],
  },
  {
    name: "No Flexibility",
    value: "no_flex",
    price: 0,
    features: [],
  },
];

const BookingsDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${environment.apiurl}/booking/client/${user.$id}?populate=route`
      );
      console.log({ buchung: res.data.data });
      setBookings(res.data.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const renderPassengers = (passengers: Passenger[]) => (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Passengers:</h4>
      {passengers.map((passenger, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Avatar>
            <AvatarFallback>{passenger.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{passenger.full_name}</p>
            <p className="text-sm text-gray-500">Age: {passenger.age}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRouteInfo = (route: Route) => (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Route Information:</h4>
      <p>Code: {route.code}</p>
      <p>
        From: {route.destination.from} To: {route.destination.to}
      </p>
      <div className="flex items-center mt-2">
        <LuggageIcon className="h-4 w-4 mr-2" />
        <span>
          Free luggage: {route.luggages.free}, Extra cost: $
          {route.luggages.price_for_extra}
        </span>
      </div>
      <div className="flex items-center mt-2">
        <PhoneIcon className="h-4 w-4 mr-2" />
        <span>{route.contact.phone}</span>
      </div>
      <div className="flex items-center mt-2">
        <MailIcon className="h-4 w-4 mr-2" />
        <span>{route.contact.email}</span>
      </div>
    </div>
  );

  const handleUpgradeFlex = (bookingId: string) => {
    // Implement the logic to upgrade flex
    console.log(`Upgrading flex for booking ${bookingId}`);
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
    const route = booking.route as Route;

    return (
      <Card key={booking._id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
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
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end h-24 sm:justify-start">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-3 w-3 rounded-full bg-emerald-700" />
                  <div className="flex-1 ml-[5px] border-l-1 border-dotted border-emerald-700 border w-0" />
                  <div className="h-3 w-3 rounded-full bg-emerald-700" />
                </div>
                <div className="flex flex-col h-full justify-between">
                  <div className="text-sm font-medium capitalize flex flex-col">
                    {booking.labels.from_city}
                    <span className="text-black/60">
                      {booking.destinations.departure_station_label}
                    </span>
                  </div>
                  <div className="text-sm font-medium capitalize flex flex-col">
                    {booking.labels.to_city}
                    <span className="text-black/60">
                      {booking.destinations.arrival_station_label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Edit
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-4">My Bookings</h2>
      <p className="text-gray-600 mb-6">
        See your scheduled events from your calendar events links.
      </p>
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="font-medium">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="font-medium">
            Past
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="font-medium">
            Cancelled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {bookings.map((booking) => renderBookingCard(booking))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsDashboard;
