import React from "react";
import { format } from "date-fns";
import { Booking } from "@/models/booking";

interface PrintableBookingProps {
  booking: Booking;
}

const PrintableBooking: React.FC<PrintableBookingProps> = ({ booking }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Booking Confirmation</h1>
        <p className="text-gray-600">Booking ID: {booking._id}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">From:</p>
            <p>{booking.destinations.departure_station_label}</p>
          </div>
          <div>
            <p className="font-semibold">To:</p>
            <p>{booking.destinations.arrival_station_label}</p>
          </div>
          <div>
            <p className="font-semibold">Departure:</p>
            <p>{format(new Date(booking.departure_date), "PPpp")}</p>
          </div>
          <div>
            <p className="font-semibold">Operator:</p>
            <p>{booking.operator?.name || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Passenger Information</h2>
        {booking.passengers.map((passenger, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
            <h3 className="font-semibold mb-2">Passenger {index + 1}</h3>
            <p>Name: {passenger.full_name}</p>
            <p>Email: {passenger.email}</p>
            <p>Phone: {passenger.phone}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <p>Total Price: ${booking.price.toFixed(2)}</p>
        <p>Status: {booking.is_paid ? "Paid" : "Unpaid"}</p>
        {booking.charge && (
          <>
            <p>Amount Charged: ${(booking.charge.amount / 100).toFixed(2)}</p>
            <p>Currency: {booking.charge.currency.toUpperCase()}</p>
            <p>
              Card:{" "}
              {booking.charge.payment_method_details.card.brand.toUpperCase()}
              **** {booking.charge.payment_method_details.card.last4}
            </p>
          </>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Thank you for choosing our service!</p>
        <p>For any inquiries, please contact our customer support.</p>
      </div>
    </div>
  );
};

export default PrintableBooking;
