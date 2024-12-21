import { format } from "date-fns";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  User,
  Circle,
  QrCodeIcon,
  Banknote,
  Info,
  Globe,
} from "lucide-react";
import { Booking } from "@/models/booking";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";

interface PrintableBookingProps {
  booking: Booking;
}

const PrintableBooking = forwardRef<HTMLDivElement, PrintableBookingProps>(
  ({ booking }, ref) => {
    return (
      <div ref={ref} className="w-full">
        <div
          id="printable-ticket"
          className="bg-white shadow-md border rounded-xl overflow-hidden font-sans print:shadow-none print:border-none"
        >
          <div className="p-4 md:p-6 flex justify-between items-center border-b">
            <div className="flex items-center space-x-4">
              <h1 className="text-black font-semibold text-xl">GoBusly</h1>
            </div>
            <div className="text-sm text-gray-500">
              Booking ID: {booking._id}
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dashed">
            <div className="grid gap-6 divide-y divide-dashed">
              <DestinationInfo booking={booking} />
              <PassengerInfo booking={booking} />
            </div>
            <div className="grid gap-6 divide-y divide-dashed">
              <AdditionalInfo booking={booking} />
              <MapInfo booking={booking} />
            </div>
          </div>

          <div className="p-4 md:p-6 text-primary-bg border-t text-center text-sm">
            <p className="tracking-wider">
              © {new Date().getFullYear()} GoBusly • Electronic Ticket • No
              Signature Required
            </p>
          </div>
        </div>
      </div>
    );
  }
);

PrintableBooking.displayName = "PrintableBooking";

export default PrintableBooking;

const DestinationInfo = ({ booking }: { booking: Booking }) => (
  <div className="flex flex-col gap-2 p-6">
    <p className="font-medium">
      {format(new Date(booking.departure_date), "EEEE, dd LLL yyyy")}
    </p>
    <div className="flex items-start gap-4 h-36">
      <div className="flex flex-col justify-between h-full">
        <p className="font-medium">
          {format(new Date(booking.departure_date), "HH:mm")}
        </p>
        <p className="font-medium">
          {format(new Date(booking.departure_date), "HH:mm")}
        </p>
      </div>
      <div className="flex flex-col items-center h-full py-1">
        <Circle size={20} className="text-primary-accent" />
        <div className="bg-primary-accent h-full w-0.5 rounded-full" />
        <Circle size={20} className="text-primary-accent" />
      </div>
      <div className="flex flex-col justify-between gap-2 h-full">
        <div className="flex flex-col items-start">
          <p className="font-medium capitalize">
            {booking.destinations.departure_station_label}
          </p>
          <p className="text-sm text-primary-bg/70">
            {booking.destinations.departure_station_label}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-medium capitalize">
            {booking.destinations.departure_station_label}
          </p>
          <p className="text-sm text-primary-bg/70">
            {booking.destinations.departure_station_label}
          </p>
        </div>
      </div>
    </div>

    {/* Simplified Operator Information for Print */}
    <div className="mt-6">
      <p className="font-medium">
        Operated by:{" "}
        <span className="font-bold">{booking?.operator?.name}</span>
      </p>
      <p className="text-sm text-primary-bg/70 mt-2">
        Enjoy a safe and reliable journey with {booking?.operator?.name}.
      </p>
    </div>
  </div>
);

const PassengerInfo = ({ booking }: { booking: Booking }) => (
  <div className="p-4 md:p-6 space-y-6">
    <div className="flex justify-center">
      <QRCodeSVG
        value={`https://www.gobusly.com/authorize-booking?id=${booking._id}`}
        size={160}
        level="H"
        className="bg-white p-2 rounded-lg"
      />
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-primary-bg/70">Name</p>
            <p className="font-medium truncate">
              {booking.passengers[0].full_name}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-primary-bg/70">Email</p>
            <p className="font-medium truncate">
              {booking.passengers[0].email}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-primary-bg/70">Phone</p>
            <p className="font-medium truncate">
              {booking.passengers[0].phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdditionalInfo = ({ booking }: { booking: Booking }) => (
  <div className="p-4 md:p-6 space-y-6">
    <p className="font-medium text-lg">Additional Information</p>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Banknote className="w-5 h-5 shrink-0" />
        <p className="text-primary-bg/70">Total Price: </p>
        <p className="font-medium">&euro;{booking.price?.toFixed(2)}</p>
      </div>
      <div className="flex items-start gap-3">
        <Globe className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1 flex items-center gap-2">
          <p className="text-primary-bg/70">View your booking: </p>
          <a
            target="_blank"
            href={`https://www.gobusly.com/bookings/${booking?._id}`}
            className="font-medium hover:underline truncate block"
          >
            Click here!
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Info className="w-5 h-5 shrink-0" />
        <p className="text-primary-bg/70">FAQ: </p>
        <a
          target="_blank"
          href="https://www.gobusly.com/help"
          className="font-medium hover:underline"
        >
          gobusly.com/help
        </a>
      </div>
    </div>

    <div className="pt-6 space-y-4">
      <p className="font-medium">Terms & Conditions</p>
      <div className="space-y-2 text-xs text-primary-bg/70">
        <p>
          By booking with GoBusly, you agree to our{" "}
          <a
            href="https://www.gobusly.com/legal/terms-of-service"
            target="_blank"
            className="text-primary-accent hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://www.gobusly.com/legal/privacy-policy"
            target="_blank"
            className="text-primary-accent hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
        <p>
          The{" "}
          <a
            href="https://www.gobusly.com/legal/terms-and-conditions-of-carriage"
            target="_blank"
            className="text-primary-accent hover:underline"
          >
            Terms of Carriage
          </a>{" "}
          of the carrier apply to travel.
        </p>
        <p>GoBusly is an equal-opportunity service for all passengers.</p>
      </div>
    </div>
  </div>
);

const MapInfo = ({ booking }: { booking: Booking }) => (
  <div className="p-4 md:p-6 space-y-6">
    <p className="font-medium text-lg">Map & Directions</p>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-primary-bg/70">Departure Location: </p>
          <p className="font-medium truncate">
            {booking.destinations.departure_station_label}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-primary-bg/70">Arrival Location: </p>
          <p className="font-medium truncate">
            {booking.destinations.arrival_station_label}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <QrCodeIcon className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-primary-bg/70">Scan for Location on Map: </p>
          <a
            target="_blank"
            href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
              booking.destinations.arrival_station_label
            )}`}
            className="font-medium hover:underline"
          >
            Open in Maps
          </a>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-primary-bg/70">Departure Date: </p>
          <p className="font-medium">
            {format(
              new Date(booking.departure_date),
              "EEEE, dd LLL yyyy, HH:mm"
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);
