import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight, // Changed back to ChevronRight for breadcrumbs
  ShieldCheck,
  BusFront,
  ChevronLeft, // Kept for the 'Back to operators' link in the old header
} from "lucide-react";

// Assuming types are defined correctly
import { Route } from "@/models/route";
import { Operator } from "@/models/operator";

// Imports needed for this file's helper components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OperatorPageClient from "./OperatorPageClient";

// Import the new Client Component

// --- Server Component Helper: StatCard ---
const StatCard = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
    <div className="p-2 bg-white rounded-md shadow-sm text-primary-accent">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// --- Metadata Generation (Server) ---
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // ... (Metadata logic remains the same)
  try {
    const operatorRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/operator/${params.id}`
    );
    const operator = operatorRes.data?.data;

    if (!operator) {
      return { title: "Operator Not Found" };
    }

    return {
      title: `${operator.name} | Book Bus Tickets`,
      description: `Book tickets with ${operator.name}. View ${operator.company_metadata.country} bus routes, schedules, and contact info on GoBusly.`,
    };
  } catch (error) {
    return { title: "Bus Operator Page" };
  }
}

// --- Main Page Component (Server) ---
const OperatorRoutesPage: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  let routes: Route[] = [];
  let operator: Operator | null = null;
  let error: string | null = null;

  try {
    const [routesRes, operatorRes] = await Promise.all([
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/route/operator/${id}`)
        .catch(() => ({ data: { data: [] } })),
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/operator/${id}`)
        .catch(() => ({ data: { data: null } })),
    ]);

    routes = routesRes.data?.data || [];
    operator = operatorRes.data?.data;

    if (!operator) {
      error = "Operator not found.";
    }
  } catch (e) {
    console.error("Server Fetch Error:", e);
    error = "Failed to load data due to a server error.";
  }

  if (error || !operator) {
    return (
      <div className="min-h-screen pt-48 flex flex-col items-center bg-gray-50/50">
        <h1 className="text-3xl font-bold text-gray-900">404</h1>
        <p className="text-lg text-gray-600 mt-2">
          {error || "Operator not found."}
        </p>
        <Link href="/bus-operators">
          <Button className="mt-8">Go Back to Operators</Button>
        </Link>
      </div>
    );
  }

  const mockRating = 4.8;
  const activeRoutesCount = routes.filter((r) => r.is_active).length;
  const countryCode = operator.company_metadata.country
    .substring(0, 3)
    .toUpperCase();
  const countryName = operator.company_metadata.country;

  return (
    <OperatorPageClient
      operator={operator}
      routes={routes}
      mockRating={mockRating}
      activeRoutesCount={activeRoutesCount}
      countryCode={countryCode} // Passing the required string prop
      countryName={countryName} // Passing country name for UI rendering
    >
      <StatCard icon={BusFront} label="Routes" value={activeRoutesCount} />
      <StatCard icon={MapPin} label="Country" value={countryCode} />
    </OperatorPageClient>
  );
};

export default OperatorRoutesPage;
