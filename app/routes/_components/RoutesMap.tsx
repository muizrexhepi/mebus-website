"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Route } from "@/models/route";
import { Station } from "@/models/station";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChangeView = ({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [center, zoom, map]);

  return null;
};

// Custom marker icons
const createStationIcon = (isSelected: boolean, type?: "from" | "to") => {
  let color = "#f43f5e"; // rose/accent color for regular stations
  if (type === "from" || type === "to") color = "#22c55e"; // green for selected stations

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: ${isSelected ? "20px" : "14px"};
        height: ${isSelected ? "20px" : "14px"};
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.2s;
      "></div>
    `,
    iconSize: [isSelected ? 20 : 14, isSelected ? 20 : 14],
    iconAnchor: [isSelected ? 10 : 7, isSelected ? 10 : 7],
  });
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

interface MapComponentProps {
  stations: Station[];
  routes: Route[];
  fromStation: Station | null;
  toStation: Station | null;
  onStationSelect: (station: Station, type: "from" | "to") => void;
}

export default function MapComponent({
  stations,
  routes,
  fromStation,
  toStation,
  onStationSelect,
}: MapComponentProps) {
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>([
    51.1657, 10.4515,
  ]);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  useEffect(() => {
    if (fromStation && toStation) {
      const bounds = L.latLngBounds(
        [fromStation.location.lat, fromStation.location.lng],
        [toStation.location.lat, toStation.location.lng]
      );

      // Calculate distance to determine appropriate zoom level
      const distance = calculateDistance(fromStation, toStation);

      // Determine zoom based on distance
      let zoom = 6;
      if (distance < 100) zoom = 9;
      else if (distance < 300) zoom = 7;
      else if (distance < 600) zoom = 6;
      else if (distance < 1000) zoom = 5;
      else zoom = 4;

      setMapCenter(bounds.getCenter());
      setMapZoom(zoom);
    } else if (fromStation) {
      setMapCenter([fromStation.location.lat, fromStation.location.lng]);
      setMapZoom(8);
    } else if (toStation) {
      setMapCenter([toStation.location.lat, toStation.location.lng]);
      setMapZoom(8);
    }
  }, [fromStation, toStation]);

  const handleStationSelect = (station: Station, type: "from" | "to") => {
    onStationSelect(station, type);
    setOpenPopup(null); // Close the popup
  };

  return (
    <div className="w-full h-full relative">
      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* All Stations */}
        {stations.map((station) => {
          const isFrom = fromStation?._id === station._id;
          const isTo = toStation?._id === station._id;
          const isSelected = isFrom || isTo;
          const type = isFrom ? "from" : isTo ? "to" : undefined;

          return (
            <Marker
              key={station._id}
              position={[station.location.lat, station.location.lng]}
              icon={createStationIcon(isSelected, type)}
              eventHandlers={{
                click: () => setOpenPopup(station._id!),
              }}
            >
              {openPopup === station._id && (
                <Popup autoClose={false} closeOnClick={false}>
                  <div className="p-2">
                    <div className="font-semibold text-base mb-1">
                      {station.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {station.city}, {station.country}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleStationSelect(station, "from")}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        From
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleStationSelect(station, "to")}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        To
                      </Button>
                    </div>
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}

        {/* Route Lines - Only show when no selection is made */}
        {!fromStation &&
          !toStation &&
          routes.map((route) => (
            <Polyline
              key={route._id}
              positions={[
                [
                  route.stations.from.location.lat,
                  route.stations.from.location.lng,
                ],
                [
                  route.stations.to.location.lat,
                  route.stations.to.location.lng,
                ],
              ]}
              color="#94a3b8"
              weight={2}
              opacity={0.6}
              dashArray="5, 10"
            />
          ))}

        {/* Selected Route Line */}
        {fromStation && toStation && (
          <Polyline
            positions={[
              [fromStation.location.lat, fromStation.location.lng],
              [toStation.location.lat, toStation.location.lng],
            ]}
            color="#22c55e"
            weight={3}
            dashArray="10, 10"
          />
        )}
      </MapContainer>

      {/* Route Info */}
      {fromStation && toStation && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md">
          <h3 className="font-semibold text-lg mb-2">
            {fromStation.name} <ArrowRight className="inline h-4 w-4 mx-1" />{" "}
            {toStation.name}
          </h3>
          <p className="text-sm text-gray-600">
            Distance: {calculateDistance(fromStation, toStation)} km
          </p>
        </div>
      )}
    </div>
  );
}

function calculateDistance(
  from: Station | undefined,
  to: Station | undefined
): number {
  if (!from || !to) return 0;

  const R = 6371;
  const lat1 = (from.location.lat * Math.PI) / 180;
  const lat2 = (to.location.lat * Math.PI) / 180;
  const dLat = lat2 - lat1;
  const dLon = ((to.location.lng - from.location.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
