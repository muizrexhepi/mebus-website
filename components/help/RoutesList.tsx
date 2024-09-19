"use client"; // Mark this as a Client Component

import { Route } from "@/models/route";

interface RoutesListProps {
  routes: Route[];
}

export default function RoutesList({ routes }: RoutesListProps) {
  if (routes.length === 0) {
    return <p>No routes available.</p>;
  }

  return (
    <div className="space-y-8">
      {routes.map((route) => (
        <div key={route._id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">
            {route.destination.from} to {route.destination.to}
          </h2>
          <p className="text-gray-500">
            Operator:{" "}
            {typeof route.operator === "string"
              ? route.operator
              : route.operator.name}
          </p>
          <p>
            Luggage: {route.luggages.free} free, extra luggage costs{" "}
            {route.luggages.price_for_extra}.
          </p>
          <p>Active: {route.is_active ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}
