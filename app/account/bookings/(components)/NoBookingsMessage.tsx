import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import Image from "next/image";

interface NoBookingsMessageProps {
  isLoading: boolean;
}

export function NoBookingsMessage({ isLoading }: NoBookingsMessageProps) {
  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto max-w-md py-8">
      <div className="mb-6">
        <Image
          src="/assets/icons/no-bookings.svg"
          alt="No bookings"
          width={250}
          height={250}
          priority
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">No Bookings Found</h2>

      <p className="text-center text-gray-600 mb-6">
        You don't have any bus ticket bookings yet.
      </p>

      <Button variant="primary" asChild className="px-6 h-12">
        <Link href="/">
          <Ticket className="mr-2 h-4 w-4" />
          Book a New Ticket
        </Link>
      </Button>
    </div>
  );
}
