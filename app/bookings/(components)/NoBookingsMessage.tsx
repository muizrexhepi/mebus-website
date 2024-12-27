import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Ticket, Search } from "lucide-react";

interface NoBookingsMessageProps {
  isLoading: boolean;
}

export function NoBookingsMessage({ isLoading }: NoBookingsMessageProps) {
  if (isLoading) return null;

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          No Bookings Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          You don't have any bus ticket bookings yet.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant={"primary"} asChild className="w-full">
          <Link href="/">
            <Ticket className="mr-2 h-4 w-4" />
            Book a New Ticket
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/bookings/retrieve-booking">
            <Search className="mr-2 h-4 w-4" />
            Retrieve Booking
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
