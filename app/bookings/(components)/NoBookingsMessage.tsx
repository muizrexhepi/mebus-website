import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Search, Ticket } from "lucide-react";

interface NoBookingsMessageProps {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export function NoBookingsMessage({
  isLoggedIn,
  isLoading,
}: NoBookingsMessageProps) {
  const [bookingReference, setBookingReference] = useState("");

  if (isLoading) return null;

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          No Bookings Found
        </CardTitle>
        <CardDescription className="text-center">
          {isLoggedIn
            ? "You don't have any bus ticket bookings yet."
            : "No bookings associated with this account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="booking-reference"
            className="text-sm font-medium text-gray-700"
          >
            Retrieve your booking
          </label>
          <div className="relative">
            <Input
              id="booking-reference"
              type="text"
              placeholder="Enter booking reference"
              value={bookingReference}
              onChange={(e) => setBookingReference(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <Button className="w-full" disabled={!bookingReference}>
          Find Booking
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild variant="outline" className="w-full">
          <Link href="/">
            <Ticket className="mr-2 h-4 w-4" />
            Book a New Ticket
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
