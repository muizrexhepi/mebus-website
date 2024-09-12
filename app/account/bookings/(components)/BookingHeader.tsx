import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { Booking } from "@/models/booking";

const BookingHeader = ({ booking }: { booking: Booking }) => {
  return (
    <CardHeader className="bg-primary text-primary-foreground p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <p className="text-sm opacity-80">Booking ID: {booking._id}</p>
        </div>
        <Badge className="text-lg py-1 px-3">
          {booking.is_paid ? "Paid" : "Unpaid"}
        </Badge>
      </div>
    </CardHeader>
  );
};

export default BookingHeader;
