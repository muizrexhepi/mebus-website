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
import { ArrowRight } from "lucide-react";

// Updating the view without reinitializing the map
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
  selectedRoute: Route | null;
  fromStation: Station | null;
  toStation: Station | null;
}

export default function MapComponent({
  selectedRoute,
  fromStation,
  toStation,
}: MapComponentProps) {
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>([
    51.1657,
    10.4515, // Latitude and longitude of Germany
  ]); // Default to Germany center

  const [mapZoom, setMapZoom] = useState<number>(4);

  useEffect(() => {
    if (fromStation && toStation) {
      const bounds = L.latLngBounds(
        [fromStation.location.lat, fromStation.location.lng],
        [toStation.location.lat, toStation.location.lng]
      );
      setMapCenter(bounds.getCenter());
      setMapZoom(5);
    } else if (fromStation) {
      setMapCenter([fromStation.location.lat, fromStation.location.lng]);
      setMapZoom(8);
    } else if (toStation) {
      setMapCenter([toStation.location.lat, toStation.location.lng]);
      setMapZoom(10);
    } else if (selectedRoute) {
      const bounds = L.latLngBounds(
        [
          selectedRoute.stations.from.location.lat,
          selectedRoute.stations.from.location.lng,
        ],
        [
          selectedRoute.stations.to.location.lat,
          selectedRoute.stations.to.location.lng,
        ]
      );
      setMapCenter(bounds.getCenter());
      setMapZoom(7);
    }
  }, [fromStation, toStation, selectedRoute]);

  return (
    <Card className="h-[calc(100vh-200px)] shadow-lg overflow-hidden">
      <CardContent className="p-0 h-full relative">
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
          {fromStation && (
            <Marker
              position={[fromStation.location.lat, fromStation.location.lng]}
            >
              <Popup>{fromStation.name}</Popup>
            </Marker>
          )}
          {toStation && (
            <Marker position={[toStation.location.lat, toStation.location.lng]}>
              <Popup>{toStation.name}</Popup>
            </Marker>
          )}
          {fromStation && toStation && (
            <Polyline
              positions={[
                [fromStation.location.lat, fromStation.location.lng],
                [toStation.location.lat, toStation.location.lng],
              ]}
              color="blue"
              weight={4}
            />
          )}
          {selectedRoute && !fromStation && !toStation && (
            <>
              <Marker
                position={[
                  selectedRoute.stations.from.location.lat as number,
                  selectedRoute.stations.from.location.lng as number,
                ]}
              >
                <Popup>{selectedRoute.destination.from}</Popup>
              </Marker>
              <Marker
                position={[
                  selectedRoute.stations.to.location.lat as number,
                  selectedRoute.stations.to.location.lng as number,
                ]}
              >
                <Popup>{selectedRoute.destination.to}</Popup>
              </Marker>
              <Polyline
                positions={[
                  [
                    selectedRoute.stations.from.location.lat,
                    selectedRoute.stations.from.location.lng,
                  ],
                  [
                    selectedRoute.stations.to.location.lat,
                    selectedRoute.stations.to.location.lng,
                  ],
                ]}
                color="blue"
                weight={4}
              />
            </>
          )}
        </MapContainer>
        {(selectedRoute || (fromStation && toStation)) && (
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md">
            <h3 className="font-semibold text-lg mb-2">
              {fromStation ? fromStation.name : selectedRoute?.destination.from}{" "}
              <ArrowRight className="inline h-4 w-4" />{" "}
              {toStation ? toStation.name : selectedRoute?.destination.to}
            </h3>
            <p className="text-sm text-gray-600">
              Distance:{" "}
              {calculateDistance(
                fromStation || selectedRoute?.stations.from,
                toStation || selectedRoute?.stations.to
              )}{" "}
              km
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function calculateDistance(
  from: Station | undefined,
  to: Station | undefined
): number {
  if (!from || !to) return 0;

  const R = 6371; // Earth's radius in kilometers
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
