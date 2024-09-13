import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BusIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  BuildingIcon,
} from "lucide-react";
import moment from "moment-timezone";
import { Booking } from "@/models/booking";
import InfoBlock from "@/components/InfoBlock";

const TripInformation = ({ booking }: { booking: Booking }) => {
  const departureDate = moment
    .utc(booking.departure_date)
    .format("dddd, DD-MM-YYYY");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BusIcon className="mr-2" />
          Trip Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="text-primary" />
            <div className="flex flex-col font-medium capitalize">
              {booking?.labels?.from_city}
              <span className="text-black/60 font-normal text-sm">
                {booking?.destinations.departure_station_label}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="text-primary" />
            <div className="flex flex-col font-medium capitalize">
              {booking?.labels?.to_city}
              <span className="text-black/60 font-normal text-sm">
                {booking?.destinations.arrival_station_label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="text-primary" />
          <span>{departureDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="text-primary" />
          <span>{moment.utc(booking.departure_date).format("HH:mm")}</span>
        </div>

        <InfoBlock
          desc="This trip will be operated by"
          title={booking.operator.name}
          href={booking.operator._id}
        />
      </CardContent>
    </Card>
  );
};

export default TripInformation;
