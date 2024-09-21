"use client";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { Station } from "@/models/station"; // Adjust the import path as necessary

interface MapProps {
  stations: Station[];
}

const Map: React.FC<MapProps> = ({ stations }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const baseUrl = "https://example.com/path/to/your/tiles.pmtiles"; // Replace with your actual PMTiles URL

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: {
        version: 8,
        sources: {
          custom: {
            type: "vector",
            url: "pmtiles://https://mybucket.s3.amazonaws.com/my-map.pmtiles",
          },
        },
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#eeeeee" },
          },
          {
            id: "land",
            type: "fill",
            source: "protomaps",
            "source-layer": "land",
            paint: { "fill-color": "#dddddd" },
          },
          // Add more layers as needed
        ],
      },
      center: [0, 0], // Set this to the center of your stations
      zoom: 2,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add a layer for stations
      map.current.addLayer({
        id: "stations",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: stations.map((station) => ({
              type: "Feature",
              properties: {
                name: station.name,
                city: station.city,
                country: station.country,
                address: station.address,
                code: station.code,
              },
              geometry: {
                type: "Point",
                coordinates: [
                  station.location.lng || 0,
                  station.location.lat || 0,
                ],
              },
            })),
          },
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#007cbf",
        },
      });

      // Add a layer for station labels
      map.current.addLayer({
        id: "station-labels",
        type: "symbol",
        source: "stations",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular"],
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
        },
      });

      // Add popup on click
      map.current.on(
        "click",
        "stations",
        (e: maplibregl.MapMouseEvent & { features?: any[] }) => {
          if (!e.features || e.features.length === 0) return;

          const feature = e.features[0];
          const geometry = feature.geometry as GeoJSON.Point;

          if (geometry.type !== "Point") return;

          const coordinates = geometry.coordinates.slice() as [number, number];
          const properties = feature.properties as {
            name: string;
            city: string;
            country: string;
            address: string;
            code: string;
          };

          if (!map.current) return;

          new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `
            <h3>${properties.name}</h3>
            <p>City: ${properties.city}</p>
            <p>Country: ${properties.country}</p>
            <p>Address: ${properties.address}</p>
            <p>Code: ${properties.code}</p>
          `
            )
            .addTo(map.current);
        }
      );

      // Change cursor to pointer when hovering over a station
      map.current.on("mouseenter", "stations", () => {
        if (map.current) map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "stations", () => {
        if (map.current) map.current.getCanvas().style.cursor = "";
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [stations]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
