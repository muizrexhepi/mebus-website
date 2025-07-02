import React, { useState } from "react";
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
import LocationMap from "./location-map";

export default function ConnectedTicketDetails({
  ticket,
}: {
  ticket: ConnectedTicket;
}) {
  const { t } = useTranslation();
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    city: string;
    address: string;
  } | null>(null);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLocation = (
    location: { lat?: number; lng?: number },
    name: string,
    city: string,
    address: string
  ) => {
    if (!location || !location.lat || !location.lng) {
      return toast({
        description: t("ticketDetails.invalidCoordinates"),
        variant: "destructive",
      });
    }

    setSelectedLocation({
      lat: location.lat,
      lng: location.lng,
      name,
      city,
      address,
    });
    setMapOpen(true);
  };

  if (!ticket) return null;

  const firstLeg = ticket.legs[0];
  const lastLeg = ticket.legs[ticket.legs.length - 1];

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4 text-sm items-center justify-between px-4 pt-4">
          <div
            className="flex items-center space-x-4 cursor-pointer rounded-lg transition-colors"
            onClick={() =>
              handleLocation(
                firstLeg.from_station.location,
                firstLeg.from_station.name,
                firstLeg.from_station.city,
                firstLeg.from_station.address
              )
            }
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
            className="flex items-center space-x-4 cursor-pointer rounded-lg transition-colors"
            onClick={() =>
              handleLocation(
                lastLeg.to_station.location,
                lastLeg.to_station.name,
                lastLeg.to_station.city,
                lastLeg.to_station.address
              )
            }
          >
            <HiMapPin className="size-5 text-primary-bg" />
            <div>
              <p className="font-medium capitalize">
                {lastLeg.to_station.city}
              </p>
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
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          handleLocation(
                            leg.from_station.location,
                            leg.from_station.name,
                            leg.from_station.city,
                            leg.from_station.address
                          )
                        }
                      >
                        <p className="text-black font-medium text-sm capitalize line-clamp-1 truncate">
                          {leg.from_station.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {leg.from_station.city}
                        </p>
                      </div>
                      <span className="font-medium shrink-0">{leg.time}</span>
                    </div>
                    <div className="bg-primary-bg text-white text-xs px-2 py-1 rounded-full font-medium w-fit">
                      {leg.operator.name}
                    </div>
                    <div className="flex w-full justify-between items-end mt-4">
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          handleLocation(
                            leg.to_station.location,
                            leg.to_station.name,
                            leg.to_station.city,
                            leg.to_station.address
                          )
                        }
                      >
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
                      Wait time:{" "}
                      {(() => {
                        const totalMinutes = Math.abs(ticket.connection_time);
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        return `${hours.toString().padStart(2, "0")}:${minutes
                          .toString()
                          .padStart(2, "0")}`;
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
                  : feature === "usb charging ports"
                  ? t("ticketDetails.features.usbChargingPorts")
                  : feature}
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

      {/* Location Map Modal */}
      {selectedLocation && (
        <LocationMap
          isOpen={mapOpen}
          onClose={() => setMapOpen(false)}
          stationAddress={selectedLocation.address}
          location={selectedLocation}
          stationName={selectedLocation.name}
          city={selectedLocation.city}
        />
      )}
    </>
  );
}
