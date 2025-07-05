"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { useTranslation } from "react-i18next";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// Component to update map view
const ChangeView = ({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface LocationMapProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    lat: number;
    lng: number;
  };
  stationName: string;
  stationAddress?: string;
  city?: string;
}

export default function LocationMap({
  isOpen,
  onClose,
  location,
  stationName,
  stationAddress,
  city,
}: LocationMapProps) {
  const { toast } = useToast();
  const { t } = useTranslation();

  const mapCenter: L.LatLngExpression = [location.lat, location.lng];
  const mapZoom = 15;

  // Format the address for display
  const displayAddress = stationAddress || `${stationName}, ${city || ""}`;
  const coordinatesText = `${location.lat.toFixed(6)}, ${location.lng.toFixed(
    6
  )}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(displayAddress);
      toast({
        description: t(
          "locationMap.addressCopied",
          "Address copied to clipboard"
        ),
        variant: "default",
      });
    } catch (err) {
      toast({
        description: t("locationMap.copyFailed", "Failed to copy address"),
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-0 rounded-l-xl">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">
              {stationName}
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Address section */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 flex-1">{displayAddress}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                className="ml-2 h-8 bg-transparent"
              >
                <Copy className="h-3 w-3 mr-1" />
                {t("locationMap.copy", "Copy")}
              </Button>
            </div>
          </div>

          {/* Map section */}
          <div className="h-1/2">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
            >
              <ChangeView center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapCenter}>
                <Popup>
                  <div className="text-center">
                    <p className="font-medium">{stationName}</p>
                    {city && <p className="text-sm text-gray-600">{city}</p>}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>

            {/* Map attribution overlay */}
            <div className="absolute bottom-0 right-0 bg-white bg-opacity-80 px-2 py-1 text-xs text-gray-600 z-[1000]">
              MapLibre | Protomaps © OpenStreetMap
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
