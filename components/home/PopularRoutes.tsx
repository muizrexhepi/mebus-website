"use client";

import { Route } from "@/models/route";
import useSearchStore from "@/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PopularBusRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const { setFromCity, setToCity } = useSearchStore();
  const router = useRouter();

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

  const handleClick = (route: Route) => {
    console.log({ stations: route.destination });
    setFromCity(route.destination.from);
    setToCity(route.destination.to);
    router.push(
      `/search/${route.destination.from}-${
        route.destination.to
      }?departureStation=${route.stations.from}&arrivalStation=${
        route.stations.to
      }&departureDate=${new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-")}&adult=1&children=0`
    );
  };

  const { t } = useTranslation();
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto paddingX">
        {/* <div className="inline-flex px-4 py-1 bg-primary/5 rounded-full mb-6">
          <span className="text-sm font-medium text-primary">
            {t("popularBusRoutes.tag", "Multiple Routes")}
          </span>
        </div> */}
        <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-8">
          {t("popularBusRoutes.heading", "Popular Bus Routes")}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
          {routes.map((route) => (
            <button
              onClick={() => handleClick(route)}
              key={`${route.destination.from}-${route.destination.to}`}
              // href={`/search/${route.destination.from}-${
              //   route.destination.to
              // }?departureStation=${route.stations.from}&arrivalStation=${
              //   route.stations.to
              // }&departureDate=${new Date()
              //   .toLocaleDateString("en-GB", {
              //     day: "2-digit",
              //     month: "2-digit",
              //     year: "numeric",
              //   })
              //   .replace(/\//g, "-")}&adult=1&children=0`}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-all duration-200 line-clamp-1 text-left"
            >
              <span className="text-sm capitalize">
                {route.destination.from}{" "}
                <span className="lowercase">{t("searchForm.to")}</span>{" "}
                {route.destination.to} {t("ticketDetails.features.bus")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
