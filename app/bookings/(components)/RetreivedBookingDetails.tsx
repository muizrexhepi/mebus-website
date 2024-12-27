import { Booking } from "@/models/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface RetrievedBookingDetailsProps {
  booking: Booking;
  onClose: () => void;
}

export function RetrievedBookingDetails({
  booking,
  onClose,
}: RetrievedBookingDetailsProps) {
  return (
    <Card className="w-full max-w-[600px] mx-auto mt-6 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#0a1e47]">
          Booking Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Booking Number:</h3>
          <p>{booking._id}</p>
        </div>
        <div>
          <h3 className="font-semibold">Departure Date:</h3>
          <p>{format(booking.departure_date, "E, LLL dd")}</p>
        </div>
        <div>
          <h3 className="font-semibold">Route:</h3>
          <p>
            From {booking.labels.from_city} to {booking.labels.to_city}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Passengers:</h3>
          <ul>
            {booking.passengers.map((passenger, index) => (
              <li key={index}>{passenger.full_name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Total Price:</h3>
          <p>${booking.price}</p>
        </div>
        <div>
          <h3 className="font-semibold">Payment Status:</h3>
          <p>{booking.is_paid ? "Paid" : "Unpaid"}</p>
        </div>
        <Button
          onClick={onClose}
          className="w-full bg-[#ff7b7b] hover:bg-[#ff6b6b] text-white font-medium h-12 rounded-lg"
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );
}
