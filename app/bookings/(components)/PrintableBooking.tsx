import { format } from "date-fns";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  QrCode,
  ArrowRight,
  Building2,
  User,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Booking } from "@/models/booking";

interface PrintableBookingProps {
  booking: Booking;
}

export default function ProfessionalBookingTicket({
  booking,
}: PrintableBookingProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2642] to-[#2c3e50] p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/logo.svg"
            alt="GoBusly Logo"
            width={180}
            height={60}
            className="mb-2"
          />
          <div className="border-l border-white/30 pl-4">
            <h1 className="text-2xl text-white font-semibold tracking-wider">
              Electronic Ticket
            </h1>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QrCode className="w-24 h-24 text-[#1a2642]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Journey Details */}
        <div className="border-2 border-[#1a2642]/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1a2642]/10">
            {/* Departure Station */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#1a2642]" />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Departure
                </span>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {booking.destinations.departure_station_label}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(
                    new Date(booking.departure_date),
                    "dd MMM yyyy, HH:mm"
                  )}
                </p>
              </div>
            </div>

            {/* Route Indicator */}
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <ArrowRight className="w-12 h-12 text-[#1a2642] rotate-90 md:rotate-0 mb-3" />
                <Badge variant="outline" className="font-semibold text-sm">
                  {booking.operator?.name || "N/A"}
                </Badge>
              </div>
            </div>

            {/* Arrival Station */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#1a2642]" />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Arrival
                </span>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {booking.destinations.arrival_station_label}
                </h3>
                <p className="text-sm text-gray-600">Ticket Type: Standard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Information */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#1a2642] mb-4 flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Booking Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Booking ID</span>
                <span className="font-mono text-sm font-bold">
                  {booking._id}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Price</span>
                <span className="font-bold text-lg">
                  €{booking.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <Badge
                  variant={booking.is_paid ? "default" : "destructive"}
                  className="px-3 py-1"
                >
                  {booking.is_paid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Platform</span>
                <span className="font-medium">{booking.platform}</span>
              </div>
            </div>
          </div>

          {/* Operator Information */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#1a2642] mb-4 flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              Operator Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-bold text-lg mt-1">
                  {booking.operator?.name || "N/A"}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500">Contact Information</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">
                      {booking.operator.company_metadata?.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">
                      {booking.operator.company_metadata?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#1a2642] mb-4 flex items-center gap-3">
            <User className="w-6 h-6" />
            Passenger Details
          </h2>
          <div className="space-y-4">
            {booking?.passengers?.map((passenger, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <Badge variant="outline" className="font-medium">
                      {passenger.full_name}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{passenger.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{passenger.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gradient-to-r from-[#1a2642] to-[#2c3e50] text-white text-center">
        <p className="text-sm tracking-wider">
          © {new Date().getFullYear()} GoBusly • Electronic Ticket • No
          Signature Required
        </p>
      </div>
    </div>
  );
}
