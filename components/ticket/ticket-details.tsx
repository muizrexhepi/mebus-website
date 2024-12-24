import { Ticket } from "@/models/ticket";
import {
  MapPin,
  Calendar,
  Clock,
  Bus,
  Snowflake,
  Plug,
  Locate,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoBlock from "../InfoBlock";
import { Fragment } from "react";
import { toast } from "../hooks/use-toast";
import { Stop } from "@/models/stop";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { IoMdLocate } from "react-icons/io";
import { HiMapPin } from "react-icons/hi2";
import { FaCalendarAlt } from "react-icons/fa";

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
  const { t } = useTranslation();
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLocation = (location: { lat?: number; lng?: number }) => {
    console.log({ location });
    if (!location || !location.lat || !location.lng) {
      return toast({
        description: t("ticketDetails.invalidCoordinates"),
        variant: "destructive",
      });
    }

    const { lat, lng } = location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  if (!ticket) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-4 items-center justify-between px-4 pt-4">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(ticket?.stops[0]?.from?.location)}
        >
          <IoMdLocate className="size-5 text-primary-accent" />
          <div>
            <p className="font-medium capitalize">
              {ticket.stops[0].from.city}
            </p>
            <p className="text-black/60 text-sm">
              {t("ticketDetails.viewLocation")}
            </p>
          </div>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(ticket?.stops[0]?.to?.location)}
        >
          <HiMapPin className="size-5 text-primary-accent" />
          <div>
            <p className="font-medium capitalize">
              {ticket.stops[ticket.stops.length - 1].to.city}
            </p>
            <p className="text-black/60 text-sm">
              {t("ticketDetails.viewLocation")}
            </p>
          </div>
        </div>
      </div>
      <Separator />

      <div className="flex sm:items-center sm:flex-row flex-col items-start justify-between px-4 py gap-2">
        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="size-5 text-primary-accent" />
          <span className="font-medium">
            {formatDate(ticket.departure_date)}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Clock className="h-5 w-5 text-primary-bg" />
          <span className="font-medium">
            {moment.utc(ticket.stops[0].departure_date).format("HH:mm")}
          </span>
        </div>
      </div>
      <Separator />

      <div className="px-5">
        {ticket?.stops?.map((stop: Stop, index: number) => (
          <Fragment key={stop._id}>
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-primary-accent rounded-full" />
                <div className="w-0.5 h-2 bg-gray-300 mt-1" />
                <div className="w-0.5 h-2 bg-gray-300 my-1" />
                <div className="w-3 h-3 bg-primary-accent rounded-full" />
              </div>
              <div className="flex-1 ml-1 -mt-1">
                <div className="flex w-full justify-between items-center mb-1">
                  <p className="text-black/70 font-medium text-sm capitalize line-clamp-1 truncate">
                    {stop.from.name}
                  </p>
                  <span className="font-medium shrink-0">
                    {moment.utc(stop.departure_date).format("HH:mm")}
                  </span>
                </div>
                <div className="flex w-full justify-between items-end">
                  <p className="text-black/70 font-medium text-sm capitalize line-clamp-1 truncate mt-3">
                    {stop.to.name}
                  </p>
                  <span className="font-medium shrink-0">
                    {moment.utc(stop.arrival_time).format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
            {!ticket.is_direct_route && index < ticket.stops.length - 1 && (
              <div className="w-full my-4 bg-gray-100 p-2 rounded-lg">
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {(() => {
                      const duration = moment.duration(
                        moment
                          .utc(ticket.stops[index + 1].departure_date)
                          .diff(moment.utc(stop.arrival_time))
                      );

                      const hours = Math.floor(duration.asHours());
                      const minutes = duration.minutes();

                      return `${t("ticketDetails.transferTime")} ${
                        hours > 0 ? `${hours} ${t("ticketDetails.hours")} ` : ""
                      }${minutes} ${t("ticketDetails.minutes")}`;
                    })()}
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <Separator />
      <div className="px-4 space-y-2">
        {ticket.metadata?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-4">
            {feature === "ac/heating" ? (
              <Snowflake className="h-5 w-5 shrink-0 text-primary-bg" />
            ) : feature === "usb charging ports" ? (
              <Plug className="h-5 w-5 shrink-0 text-primary-bg" />
            ) : (
              <Bus className="h-5 w-5 shrink-0 text-primary-bg" />
            )}
            <span className="capitalize">
              {feature === "ac/heating"
                ? t(`ticketDetails.features.acHeating`)
                : t("ticketDetails.features.usbChargingPorts")}
            </span>
          </div>
        ))}
      </div>
      {/* <Separator /> */}
      <InfoBlock
        desc={t("ticketDetails.operatedBy")}
        title={ticket?.operatorInfo?.name}
        href={ticket?.operatorInfo?._id}
      />
    </div>
  );
}
