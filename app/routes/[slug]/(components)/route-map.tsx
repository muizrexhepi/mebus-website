"use client";

import { MapPin } from "lucide-react";

interface RouteMapProps {
  fromStation: any;
  toStation: any;
  stops: any[];
}

export default function RouteMap({
  fromStation,
  toStation,
  stops,
}: RouteMapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 text-center">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mb-2"></div>
          <div className="text-sm font-medium">
            {fromStation?.city || "Departure"}
          </div>
          <div className="text-xs text-gray-600">{fromStation?.name}</div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
          <MapPin className="w-5 h-5 text-gray-400 mx-2" />
          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mb-2"></div>
          <div className="text-sm font-medium">
            {toStation?.city || "Arrival"}
          </div>
          <div className="text-xs text-gray-600">{toStation?.name}</div>
        </div>
      </div>

      {stops.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Stops:</span>{" "}
          {stops.map((stop) => stop.name).join(", ")}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Interactive map will be loaded here
      </div>
    </div>
  );
}
