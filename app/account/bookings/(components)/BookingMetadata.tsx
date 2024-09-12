import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Booking } from "@/models/booking";

const BookingMetadata = ({ booking }: { booking: Booking }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Charge ID:</span>
          <span className="font-mono text-xs bg-gray-100 p-1 rounded">
            {booking.charge?.id}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Payment Intent ID:</span>
          <span className="font-mono text-xs bg-gray-100 p-1 rounded">
            {booking.metadata.payment_intent_id}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={booking.charge?.receipt_url!}
            className="text-sm text-gray-600 underline"
          >
            Click here to view receipt
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingMetadata;
