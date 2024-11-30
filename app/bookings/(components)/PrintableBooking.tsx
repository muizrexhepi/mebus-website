import { format } from "date-fns";
import { MapPin, Phone, Mail, Calendar, QrCode, Check } from "lucide-react";
import { Booking } from "@/models/booking";
import Image from "next/image";

interface PrintableBookingProps {
  booking: Booking;
}

export default function PrintableBooking({ booking }: PrintableBookingProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none">
      <div className="bg-gradient-to-r from-primary-bg to-primary-bg text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <Image
              src="/assets/icons/logo.svg"
              alt="Company Logo"
              width={150}
              height={50}
              className="mb-2"
            />
            <h1 className="text-xl font-semibold">Electronic Ticket</h1>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <QrCode className="w-24 h-24 text-primary-bg" />
          </div>
        </div>
      </div>

      {/* Booking Overview */}
      <div className="grid md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-primary-bg" />
            <div>
              <p className="text-sm text-gray-600">Departure Date</p>
              <p className="font-semibold">
                {format(new Date(booking.departure_date), "dd MMMM yyyy")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary-bg" />
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-semibold">
                {booking.destinations.departure_station_label}
                {" → "}
                {booking.destinations.arrival_station_label}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-primary-bg">
              Booking Details
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                <span className="font-medium">Ticket Type:</span> Return
              </p>
              <p className="text-sm">
                <span className="font-medium">Booking ID:</span> {booking._id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Information */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-primary-bg">
          Passenger Information
        </h2>
        {booking?.passengers?.map((passenger, index) => (
          <div
            key={index}
            className="mb-4 pb-4 border-b last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">
                  {passenger.full_name}
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{passenger.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{passenger.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial & Travel Details */}
      <div className="grid md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-primary-bg">
            Financial Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Booking Price</span>
              <span className="font-semibold">€{booking.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Status</span>
              <span
                className={`font-semibold ${
                  booking.is_paid ? "text-green-600" : "text-red-600"
                }`}
              >
                {booking.is_paid ? "Paid" : "Unpaid"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Platform</span>
              <span className="text-sm">{booking.platform}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Information */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4 text-primary-bg">
          Operator Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Company Name</p>
            <p className="font-semibold">{booking.operator?.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Contact</p>
            <p className="font-semibold">
              {booking.operator.company_metadata?.phone || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {booking.operator.company_metadata?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-primary-bg text-white text-center">
        <p className="text-xs">
          © {new Date().getFullYear()} GoBusly. All rights reserved. Electronic
          ticket - No signature required.
        </p>
      </div>
    </div>
  );
}
