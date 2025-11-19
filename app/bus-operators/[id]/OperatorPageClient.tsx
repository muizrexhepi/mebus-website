"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight, // Used for breadcrumbs
  ShieldCheck,
  ArrowRight,
  BusFront,
  Star,
  AlertCircle,
} from "lucide-react";

// Assuming types are defined correctly
import { Route } from "@/models/route";
import { Operator } from "@/models/operator";

// Imports needed for this file's UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Route Card Component (Client) ---

const RouteCard = ({ route }: { route: Route }) => {
  const { t } = useTranslation();

  // Search URL Builder (remains the same)
  const searchUrl = `/search/${route.destination.from}-${
    route.destination.to
  }?departureStation=${route.stations.from._id}&arrivalStation=${
    route.stations.to._id
  }&departureDate=${new Date()
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-")}&adult=1&children=0`;

  return (
    // Link makes the entire card clickable, fixing the button issue
    <Link href={searchUrl} className="block group">
      <div className="bg-white rounded-xl border-none shadow-sm p-5 transition-all duration-200 hover:shadow-lg relative overflow-hidden">
        {/* Active Status Line (removed as it clashed with the minimalistic look) */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Route Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="secondary"
                className="text-xs font-normal text-gray-500 bg-gray-100 rounded-md"
              >
                {t("operatorDetails.route")} {route.code}
              </Badge>
              {!route.is_active && (
                <Badge variant="destructive" className="text-xs rounded-md">
                  {t("operatorDetails.unavailable")}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 capitalize">
                  {route.destination.from}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[120px] capitalize">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {route.stations.from.name || t("operatorDetails.mainStation")}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center px-2">
                <div className="w-full h-[1px] bg-gray-300 relative flex items-center justify-center">
                  <BusFront className="w-4 h-4 text-gray-400 bg-white px-1 absolute" />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 uppercase font-medium">
                  {t("operatorDetails.direct")}
                </span>
              </div>

              <div className="flex flex-col text-right">
                <span className="text-lg font-bold text-gray-900 capitalize">
                  {route.destination.to}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[120px] capitalize">
                  {route.stations.to.name || t("operatorDetails.mainStation")}
                  <MapPin className="w-3 h-3 inline ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="sm:border-l sm:pl-6 flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 min-w-[120px]">
            <div className="text-right sm:text-center">
              <p className="text-xs text-gray-500">
                {t("operatorDetails.ticketPrice")}
              </p>
              <p className="text-xl font-bold text-primary-accent">
                {t("operatorDetails.check")}
              </p>
            </div>
            {/* The button is now inside the link, ensuring the whole area is clickable */}
            <Button
              size="sm"
              className="w-full bg-primary-accent hover:bg-primary-accent/90 rounded-xl transition-colors shadow-sm"
              onClick={(e) => {
                e.preventDefault(); /* Prevent button click handling if needed, but link handles navigation */
              }}
            >
              {t("operatorDetails.bookNow")}{" "}
              <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Main Page Client Component ---
interface OperatorPageClientProps {
  operator: Operator;
  routes: Route[];
  mockRating: number;
  activeRoutesCount: number;
  countryCode: string; // <-- FIX: Declared missing prop
  countryName: string; // Declared new prop
  children: React.ReactNode;
}

export default function OperatorPageClient({
  operator,
  routes,
  mockRating,
  countryName,
  activeRoutesCount,
  children,
}: OperatorPageClientProps) {
  const { t } = useTranslation();
  const safeRoutes = Array.isArray(routes) ? routes : [];

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
      {/* 1. Header with Breadcrumbs (Restored) */}
      <div className="bg-white border-none shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
            <Link
              href="/bus-operators"
              className="hover:text-gray-900 transition-colors"
            >
              {t("nav.operators")}
            </Link>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
            <span className="text-gray-900 font-medium capitalize">
              {operator.name}
            </span>
          </div>

          {/* Title and Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight capitalize">
              {operator.name} {t("operatorDetails.overview")}
            </h1>
            {operator.confirmation?.is_confirmed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border-none shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("operatorDetails.verified")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 2. Left Sidebar: Operator Profile (Restored Clean Design) */}
          <div className="lg:col-span-4 sticky top-8 space-y-6">
            <Card className="shadow-xl border-none overflow-hidden rounded-xl">
              <div className="p-6 flex flex-col items-center text-center bg-white">
                <Avatar className="w-24 h-24 bg-gray-50 border border-gray-100 mb-4">
                  <AvatarImage
                    src={operator.company_metadata.logo}
                    className="object-contain p-2"
                  />
                  <AvatarFallback className="text-2xl font-bold text-gray-400">
                    {operator.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold text-gray-900 mb-1 capitalize">
                  {operator.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-1 capitalize">
                  <MapPin className="w-3 h-3" /> {countryName}
                </p>

                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < mockRating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-2">
                    {mockRating.toFixed(1)} / 5.0
                  </span>
                </div>

                <div className="w-full space-y-4 text-left">
                  <Separator />
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${operator.company_metadata.email}`}
                      className="text-gray-700 hover:text-primary-accent truncate"
                    >
                      {operator.company_metadata.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href={`tel:${operator.company_metadata.phone}`}
                      className="text-gray-700 hover:text-primary-accent truncate"
                    >
                      {operator.company_metadata.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {t("operatorDetails.since")}{" "}
                      {new Date(operator.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 bg-gray-50/50 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {children}{" "}
                  {/* Renders the StatCards from the Server Component */}
                </div>
              </CardContent>
            </Card>

            {/* Trust Box (Styled clean) */}
            <div className="p-4 rounded-xl border-none shadow-sm bg-blue-50 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-semibold">
                  {t("operatorDetails.trustedPartner")}
                </span>
                <span className="block mt-1">
                  {t("operatorDetails.trustDescription").replace(
                    "{name}",
                    operator.name
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* 3. Main Content: Routes */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BusFront className="w-5 h-5 text-primary-accent" />
                {t("operatorDetails.availableRoutes")}
              </h3>
              <span className="text-sm text-gray-500">
                {safeRoutes.length} {t("operatorDetails.routesFound")}
              </span>
            </div>

            {safeRoutes.length > 0 ? (
              <div className="space-y-4">
                {safeRoutes.map((route) => (
                  <RouteCard key={route._id} route={route} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border-none shadow-sm p-12 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("operatorDetails.noRoutesTitle")}
                </h4>
                <p className="text-gray-500 max-w-md mx-auto">
                  {t("operatorDetails.noRoutesDescription")}
                </p>
                <Link href="/bus-operators">
                  <Button variant="outline" className="mt-6 rounded-xl">
                    {t("operatorDetails.browseOthers")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
