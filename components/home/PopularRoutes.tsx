"use client";

import Link from "next/link";

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
  return (
    <section className="w-full py-12 bg-[#f3f4f5]">
      <div className="max-w-6xl mx-auto paddingX">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Popular Bus Routes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
          {popularRoutes.map((route) => (
            <Link
              key={`${route.from}-${route.to}`}
              href={route.href}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-all duration-200"
            >
              <span className="text-sm">
                {route.from} to {route.to} bus
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
