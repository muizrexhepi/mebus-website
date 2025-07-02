import {
  MapPin,
  Calendar,
  Clock,
  Bus,
  Snowflake,
  Plug,
  ArrowRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoBlock from "../InfoBlock";
import { Fragment } from "react";
import { toast } from "../hooks/use-toast";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { IoMdLocate } from "react-icons/io";
import { HiMapPin } from "react-icons/hi2";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { ConnectedTicket } from "@/models/connected-ticket";

export default function ConnectedTicketDetails({
  ticket,
}: {
  ticket: ConnectedTicket;
}) {
  const { t } = useTranslation();

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLocation = (location: { lat?: number; lng?: number }) => {
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

  const firstLeg = ticket.legs[0];
  const lastLeg = ticket.legs[ticket.legs.length - 1];

  return (
    <div className="space-y-4">
      <div className="space-y-4 text-sm items-center justify-between px-4 pt-4">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(firstLeg.from_station.location)}
        >
          <IoMdLocate className="size-5 text-primary-bg" />
          <div>
            <p className="font-medium capitalize">
              {firstLeg.from_station.city}
            </p>
            <p className="text-black/60 text-sm">
              {t("ticketDetails.viewLocation")}
            </p>
          </div>
        </div>

        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleLocation(lastLeg.to_station.location)}
        >
          <HiMapPin className="size-5 text-primary-bg" />
          <div>
            <p className="font-medium capitalize">{lastLeg.to_station.city}</p>
            <p className="text-black/60 text-sm">
              {t("ticketDetails.viewLocation")}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex sm:items-center text-sm sm:flex-row flex-col items-start justify-between px-4 py gap-2">
        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="size-5 text-primary-bg" />
          <span className="font-medium">
            {formatDate(firstLeg.departure_date)}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <FaClock className="size-5 text-primary-bg" />
          <span className="font-medium">
            {moment.utc(firstLeg.departure_date).format("HH:mm")}
          </span>
        </div>
      </div>

      <Separator />

      <div className="px-4">
        {/* <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Bus className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              Connected Journey - {ticket.legs.length}{" "}
              {ticket.legs.length === 1 ? "Transfer" : "Transfers"}
            </span>
          </div>
          <p className="text-xs text-orange-700">
            This journey requires transfers between different buses/operators
          </p>
        </div> */}

        {ticket.legs.map((leg, legIndex) => (
          <Fragment key={`${leg.ticket}-${legIndex}`}>
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-primary-bg rounded-full" />
                  <div className="w-0.5 h-16 bg-gray-300 my-1" />
                  <div className="w-3 h-3 bg-primary-bg rounded-full" />
                </div>
                <div className="flex-1 ml-1 -mt-1">
                  <div className="flex w-full justify-between items-center mb-1">
                    <div>
                      <p className="text-black font-medium text-sm capitalize line-clamp-1 truncate">
                        {leg.from_station.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {leg.from_station.city}
                      </p>
                    </div>
                    <span className="font-medium shrink-0">
                      {leg.time}
                      {/* {moment.utc(leg.departure_date).format("HH:mm")} */}
                    </span>
                  </div>
                  <div className="bg-primary-bg text-white text-xs px-2 py-1 rounded-full font-medium w-fit">
                    {leg.operator.name}
                  </div>
                  <div className="flex w-full justify-between items-end mt-4">
                    <div>
                      <p className="text-black font-medium text-sm capitalize line-clamp-1 truncate">
                        {leg.to_station.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {leg.to_station.city}
                      </p>
                    </div>
                    <span className="font-medium shrink-0">
                      {moment.utc(leg.arrival_time).format("HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {legIndex < ticket.legs.length - 1 && (
              <div className="w-full my-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                  <p className="text-sm text-yellow-800 font-medium">
                    Transfer at{" "}
                    {ticket.intermediate_station?.name || leg.to_station.name}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-1">
                  <ArrowRight className="w-3 h-3 mr-1 text-yellow-600" />
                  <p className="text-xs text-yellow-700">
                    Wait time: {Math.abs(ticket.connection_time)} minutes
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <Separator />

      <div className="px-4 space-y-2">
        {firstLeg.metadata?.features?.map((feature, index) => (
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

      <InfoBlock
        desc={t("ticketDetails.operatedBy")}
        title={`${firstLeg.operator.name}${
          ticket.legs.length > 1 ? ` + ${ticket.legs.length - 1} more` : ""
        }`}
        href={firstLeg.operator._id}
      />
    </div>
  );
}
