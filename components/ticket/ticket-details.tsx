"use client";

import type { Ticket } from "@/models/ticket";
import {
  Clock,
  Bus,
  Snowflake,
  ChevronDown,
  ChevronUp,
  Plug,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InfoBlock from "../InfoBlock";
import { Fragment, useState } from "react";
import { toast } from "../hooks/use-toast";
import type { Stop } from "@/models/stop";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { IoMdLocate } from "react-icons/io";
import { HiMapPin } from "react-icons/hi2";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import LocationMap from "./location-map";

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
  const { t } = useTranslation();
  const [mapOpen, setMapOpen] = useState(false);
  const [showStops, setShowStops] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    city: string;
    address: string;
  } | null>(null);

  const formatDate = (date: Date) => {
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

  const firstStop = ticket.stops[0];
  const lastStop = ticket.stops[ticket.stops.length - 1];

  // Check if we have intermediate stops in stop_sequence
  const hasIntermediateStops =
    ticket.stop_sequence && ticket.stop_sequence.length > 0;
  const intermediateStopsCount = hasIntermediateStops
    ? ticket.stop_sequence.length
    : 0;

  return (
    <>
      <div className="space-y-4">
        {/* Location Selection Section */}
        <div className="space-y-3 text-sm px-4 pt-4">
          <div
            className="flex items-center space-x-3 cursor-pointer rounded-lg transition-colors hover:bg-gray-50"
            onClick={() =>
              handleLocation(
                firstStop?.from?.location,
                firstStop.from.name,
                firstStop.from.city,
                firstStop.from.address
              )
            }
          >
            <IoMdLocate className="w-5 h-5 text-primary-bg flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium capitalize text-sm sm:text-base truncate">
                {firstStop.from.city}
              </p>
              <p className="text-black/60 text-xs sm:text-sm">
                {t("ticketDetails.viewLocation")}
              </p>
            </div>
          </div>

          <div
            className="flex items-center space-x-3 cursor-pointer rounded-lg transition-colors hover:bg-gray-50"
            onClick={() =>
              handleLocation(
                lastStop?.to?.location,
                lastStop.to.name,
                lastStop.to.city,
                lastStop.from.address
              )
            }
          >
            <HiMapPin className="w-5 h-5 text-primary-bg flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium capitalize text-sm sm:text-base truncate">
                {lastStop.to.city}
              </p>
              <p className="text-black/60 text-xs sm:text-sm">
                {t("ticketDetails.viewLocation")}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Date and Time Info */}
        <div className="flex flex-col sm:flex-row sm:items-center text-sm justify-between px-4 py-2 gap-3 sm:gap-2">
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-primary-bg flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              {formatDate(ticket.departure_date)}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-bg flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              {moment.utc(firstStop.departure_date).format("HH:mm")}
            </span>
          </div>
        </div>

        <Separator />

        {/* Journey Timeline */}
        <div className="px-4">
          {/* Departure Station */}
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-3 sm:mr-4">
              <div className="w-3 h-3 bg-primary-bg rounded-full" />
              {(hasIntermediateStops || !ticket.is_direct_route) && (
                <div className="w-0.5 h-6 sm:h-8 bg-gray-300 mt-1" />
              )}
            </div>

            <div className="flex-1 min-w-0 ml-1 -mt-1">
              <div className="flex w-full justify-between items-start sm:items-center mb-1 gap-2">
                <div
                  className="cursor-pointer min-w-0 flex-1"
                  onClick={() =>
                    handleLocation(
                      firstStop?.from?.location,
                      firstStop.from.name,
                      firstStop.from.city,
                      firstStop.from.address
                    )
                  }
                >
                  <p className="text-black font-medium text-sm sm:text-base capitalize truncate">
                    {firstStop.from.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 capitalize truncate">
                    {firstStop.from.city}
                  </p>
                </div>
                <span className="font-medium text-sm sm:text-base shrink-0 ml-2">
                  {moment.utc(firstStop.departure_date).format("HH:mm")}
                </span>
              </div>
            </div>
          </div>

          {/* Arrival Station */}
          <div className="flex items-start mt-4">
            <div className="flex flex-col items-center mr-3 sm:mr-4">
              <div className="w-3 h-3 bg-primary-bg rounded-full" />
            </div>

            <div className="flex-1 min-w-0 ml-1 -mt-1">
              <div className="flex w-full justify-between items-start sm:items-end gap-2">
                <div
                  className="cursor-pointer min-w-0 flex-1"
                  onClick={() =>
                    handleLocation(
                      lastStop?.to?.location,
                      lastStop.to.name,
                      lastStop.to.city,
                      lastStop.to.address
                    )
                  }
                >
                  <p className="text-black font-medium text-sm sm:text-base capitalize truncate">
                    {lastStop.to.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 capitalize truncate">
                    {lastStop.to.city}
                  </p>
                </div>
                <span className="font-medium text-sm sm:text-base shrink-0 ml-2">
                  {moment.utc(lastStop.arrival_time).format("HH:mm")}
                </span>
              </div>
            </div>
          </div>

          {/* Transfer Time Info for Non-Direct Routes */}
          {!ticket.is_direct_route && ticket.stops.length > 1 && (
            <div className="w-full my-4 bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                <p className="text-sm text-gray-500 text-center">
                  {(() => {
                    const totalStops = ticket.stops.length;
                    if (totalStops > 1) {
                      const duration = moment.duration(
                        moment
                          .utc(ticket.stops[1].departure_date)
                          .diff(moment.utc(ticket.stops[0].arrival_time))
                      );
                      const hours = Math.floor(duration.asHours());
                      const minutes = duration.minutes();
                      return `${t("ticketDetails.transferTime")} ${
                        hours > 0 ? `${hours} ${t("ticketDetails.hours")} ` : ""
                      }${minutes} ${t("ticketDetails.minutes")}`;
                    }
                    return "";
                  })()}
                </p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Amenities Section */}
        <div className="px-4 space-y-2">
          {ticket.metadata?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              {feature === "ac/heating" ? (
                <Snowflake className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-bg" />
              ) : feature === "usb charging ports" ? (
                <Plug className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-bg" />
              ) : (
                <Bus className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary-bg" />
              )}
              <span className="capitalize text-sm sm:text-base">
                {feature === "ac/heating"
                  ? t(`ticketDetails.features.acHeating`)
                  : feature === "usb charging ports"
                  ? t("ticketDetails.features.usbChargingPorts")
                  : feature}
              </span>
            </div>
          ))}
        </div>

        {/* Operator Info */}
        <InfoBlock
          desc={t("ticketDetails.operatedBy")}
          title={ticket?.operatorInfo?.name}
          href={ticket?.operatorInfo?._id}
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
