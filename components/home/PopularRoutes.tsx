"use client";

import { Route } from "@/models/route";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const popularRoutes = [
  { from: "Madrid", to: "Barcelona", href: "/routes/madrid-barcelona" },
  { from: "Lisbon", to: "Porto", href: "/routes/lisbon-porto" },
  { from: "Berlin", to: "Prague", href: "/routes/berlin-prague" },
  { from: "Paris", to: "Amsterdam", href: "/routes/paris-amsterdam" },
  { from: "Rome", to: "Florence", href: "/routes/rome-florence" },
  { from: "Vienna", to: "Budapest", href: "/routes/vienna-budapest" },
  { from: "Warsaw", to: "Krakow", href: "/routes/warsaw-krakow" },
  { from: "Munich", to: "Vienna", href: "/routes/munich-vienna" },
  { from: "Prague", to: "Vienna", href: "/routes/prague-vienna" },
  { from: "Barcelona", to: "Valencia", href: "/routes/barcelona-valencia" },
  { from: "Milan", to: "Venice", href: "/routes/milan-venice" },
  { from: "Brussels", to: "Amsterdam", href: "/routes/brussels-amsterdam" },
  { from: "Zagreb", to: "Split", href: "/routes/zagreb-split" },
  { from: "Sofia", to: "Plovdiv", href: "/routes/sofia-plovdiv" },
  { from: "Bucharest", to: "Brasov", href: "/routes/bucharest-brasov" },
  { from: "Athens", to: "Thessaloniki", href: "/routes/athens-thessaloniki" },
  { from: "Porto", to: "Faro", href: "/routes/porto-faro" },
  { from: "Valencia", to: "Malaga", href: "/routes/valencia-malaga" },
  { from: "Berlin", to: "Hamburg", href: "/routes/berlin-hamburg" },
  { from: "Paris", to: "Lyon", href: "/routes/paris-lyon" },
  { from: "Rome", to: "Naples", href: "/routes/rome-naples" },
  { from: "Budapest", to: "Belgrade", href: "/routes/budapest-belgrade" },
  { from: "Prague", to: "Brno", href: "/routes/prague-brno" },
  { from: "Krakow", to: "Gdansk", href: "/routes/krakow-gdansk" },
  { from: "Ljubljana", to: "Zagreb", href: "/routes/ljubljana-zagreb" },
  { from: "Copenhagen", to: "Malmö", href: "/routes/copenhagen-malmo" },
  { from: "Geneva", to: "Zurich", href: "/routes/geneva-zurich" },
  { from: "Brussels", to: "Paris", href: "/routes/brussels-paris" },
];

export default function PopularBusRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  useEffect(() => {
    async function fetchRoutes() {
      const routesRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/route`
      );
      const routes: Route[] = routesRes.data.data;
      console.log({ routes });
      setRoutes(routes);
    }
    fetchRoutes();
  }, []);
  const { t } = useTranslation();
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto paddingX">
        <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full mb-6">
          <span className="text-sm font-medium text-primary">
            {t("popularBusRoutes.tag", "Multiple Routes")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-8">
          {t("popularBusRoutes.heading", "Popular Bus Routes")}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
          {routes.map((route) => (
            <Link
              key={`${route.destination.from}-${route.destination.to}`}
              href={`/search/${route.destination.from}-${
                route.destination.to
              }?departureStation=${route.stations.from}&arrivalStation=${
                route.stations.to
              }&departureDate=${new Date()
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")}&adult=1&children=0`}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-all duration-200 line-clamp-1"
            >
              <span className="text-sm capitalize">
                {route.destination.from} <span className="lowercase">to</span>{" "}
                {route.destination.to} bus
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
