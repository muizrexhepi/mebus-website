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
  Circle,
  QrCodeIcon,
  EuroIcon,
  Banknote,
  Info,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Booking } from "@/models/booking";
import InfoBlock from "@/components/InfoBlock";

interface PrintableBookingProps {
  booking: Booking;
}

export default function ProfessionalBookingTicket({
  booking,
}: PrintableBookingProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md border rounded-xl overflow-hidden font-sans">
      <div className="p-6 flex justify-between items-center border-b">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/dark-logo.svg"
            alt="GoBusly Logo"
            width={120}
            height={60}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 divide-x divide-y divide-dashed">
        <DestinationInfo booking={booking} />
        <PassengerInfo booking={booking} />
        <AdditionalInfo booking={booking} />
        <MapInfo booking={booking} />
      </div>

      <div className="p-6 bg-[#1a2642] text-white text-center">
        <p className="text-sm tracking-wider">
          © {new Date().getFullYear()} GoBusly • Electronic Ticket • No
          Signature Required
        </p>
      </div>
    </div>
  );
}

const DestinationInfo = ({ booking }: { booking: Booking }) => {
  return (
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
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col items-start">
            <p className="font-medium capitalize">
              {booking.destinations.departure_station_label}
            </p>
            <p className="text-sm text-primary-bg/70">
              {booking.destinations.departure_station_label}
            </p>
          </div>
          <InfoBlock title={booking.operator.name} desc="" />
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
          <span className="font-bold">{booking.operator.name}</span>
        </p>
        <p className="text-sm text-primary-bg/70 mt-2">
          Enjoy a safe and reliable journey with {booking.operator.name}.
        </p>
      </div>
    </div>
  );
};

const PassengerInfo = ({ booking }: { booking: Booking }) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <QrCodeIcon className="size-40 mx-auto" />
      <div className="grid sm:grid-cols-2 gap-4 truncate line-clamp-1">
        <div className="flex items-center gap-2">
          <User />
          <div className="font-medium">
            <p className="text-sm text-primary-bg/70">Name</p>
            <p>{booking.passengers[0].full_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="shrink-0" />
          <div className="font-medium">
            <p className="text-sm text-primary-bg/70">Email</p>
            <p> {booking.passengers[0].email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="shrink-0" />
          <div className="font-medium">
            <p className="text-sm text-primary-bg/70">Phone</p>
            <p> {booking.passengers[0].phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdditionalInfo = ({ booking }: { booking: Booking }) => {
  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <p className="font-medium">Additional Information</p>
      <div className="gap-4">
        <div className="flex items-center gap-2">
          <Banknote size={20} />
          <p className="text-primary-bg/70">Total Price: </p>
          <p className="font-medium">&euro;{booking.price?.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={20} className="shrink-0" />
          <p className="text-primary-bg/70">View your booking: </p>
          <a
            target="_blank"
            href={`https://www.gobusly.com/bookings/${booking?._id}`}
            className="font-medium underline line-clamp-1 "
          >
            https://www.gobusly.com/bookings/{booking?._id}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Info size={20} />
          <p className="text-primary-bg/70">FAQ: </p>
          <a
            target="_blank"
            href="https://www.gobusly.com/help"
            className="font-medium underline"
          >
            https://www.gobusly.com/help
          </a>
        </div>
        <div className="mt-20">
          <p className="font-medium">Terms & Conditions</p>
          <p className="text-primary-bg/70 text-xs">
            By booking with GoBusly, you agree to our{" "}
            <a
              href="https://www.gobusly.com/legal/terms-of-service"
              target="_blank"
              className="text-primary-accent underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://www.gobusly.com/legal/privacy-policy"
              target="_blank"
              className="text-primary-accent underline"
            >
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-primary-bg/70 text-xs mt-2">
            The{" "}
            <a
              href="https://www.gobusly.com/legal/terms-and-conditions-of-carriage"
              target="_blank"
              className="text-primary-accent underline"
            >
              Terms of Carriage
            </a>{" "}
            of the carrier apply to travel.
          </p>
          <p className="text-primary-bg/70 text-xs mt-2">
            GoBusly is an equal-opportunity service for all passengers.
          </p>
        </div>
      </div>
    </div>
  );
};

const MapInfo = ({ booking }: { booking: Booking }) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <p className="font-medium">Map & Directions</p>
      <div className="grid gap-4 truncate line-clamp-1">
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <p className="text-primary-bg/70">Departure Location: </p>
          <p className="font-medium">
            {booking.destinations.departure_station_label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <p className="text-primary-bg/70">Arrival Location: </p>
          <p className="font-medium">
            {booking.destinations.arrival_station_label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <QrCodeIcon size={20} />
          <p className="text-primary-bg/70">Scan for Location on Map: </p>
          <a
            target="_blank"
            href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
              booking.destinations.arrival_station_label
            )}`}
            className="font-medium underline"
          >
            Open in Maps
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={20} />
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
  );
};
