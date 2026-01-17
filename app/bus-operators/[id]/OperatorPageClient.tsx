"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  BusFront,
  Star,
  AlertCircle,
  MoveRight,
} from "lucide-react";

import { Route } from "@/models/route";
import { Operator } from "@/models/operator";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Minimalistic Route Card ---
const RouteCard = ({ route }: { route: Route }) => {
  const { t } = useTranslation();

  const searchUrl = `/search/${route.destination.from}-${route.destination.to}`;

  return (
    <Link href={searchUrl} className="block">
      <div className="bg-white rounded-2xl p-6 mb-2 duration-200 hover:shadow transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Route Layout Grid */}
          <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
            {/* Origin */}
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-gray-900 capitalize leading-tight">
                {route.destination.from}
              </span>
              <span className="text-sm text-gray-400 capitalize mt-1">
                {route.stations.from.name || t("operatorDetails.mainStation")}
              </span>
              {!route.is_active && (
                <Badge
                  variant="secondary"
                  className="mt-2 text-[10px] bg-red-50 text-red-600 hover:bg-red-50 font-normal border-none"
                >
                  {t("operatorDetails.unavailable")}
                </Badge>
              )}
            </div>

            {/* Visual Connector */}
            <div className="flex flex-col items-center justify-center w-16 md:w-32">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="h-[2px] w-full bg-gray-100 rounded-full" />
                <BusFront className="w-4 h-4 text-gray-300 shrink-0" />
                <div className="h-[2px] w-full bg-gray-100 rounded-full" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-medium uppercase tracking-wider">
                {t("operatorDetails.direct")}
              </span>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-end text-right">
              <span className="text-lg font-bold text-gray-900 capitalize leading-tight">
                {route.destination.to}
              </span>
              <span className="text-sm text-gray-400 capitalize mt-1">
                {route.stations.to.name || t("operatorDetails.mainStation")}
              </span>
            </div>
          </div>

          {/* Action Section */}
          {/* <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:border-gray-100 md:pl-6 min-w-[160px]">
            <Button
              size="sm"
              className="rounded-full px-6 bg-primary-accent hover:bg-gray-800 text-white shadow-none transition-all"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {t("operatorDetails.bookNow")}
            </Button>
          </div> */}
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
  countryCode: string;
  countryName: string;
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
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto paddingX py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="w-3 h-3 mx-2 text-gray-300" />
            <Link
              href="/bus-operators"
              className="hover:text-gray-900 transition-colors"
            >
              {t("nav.busoperators")}
            </Link>
            <ChevronRight className="w-3 h-3 mx-2 text-gray-300" />
            <span className="text-gray-900 font-medium capitalize">
              {operator.name}
            </span>
          </div>

          {/* Title Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight">
              {operator.name}
            </h1>
            {operator.confirmation?.is_confirmed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("operatorDetails.verified")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto paddingX py-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Operator Profile */}
          <div className="lg:col-span-4 sticky top-8 space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 bg-white mb-4 border border-gray-100">
                  <AvatarImage
                    src={operator.company_metadata.logo}
                    className="object-contain p-3"
                  />
                  <AvatarFallback className="text-2xl font-bold text-gray-300">
                    {operator.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold text-gray-900 mb-1 capitalize">
                  {operator.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-1.5 capitalize">
                  <MapPin className="w-3.5 h-3.5" /> {countryName}
                </p>

                <div className="flex items-center justify-center gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < mockRating
                          ? "fill-black text-black"
                          : "fill-gray-100 text-gray-100"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-2">
                    {mockRating.toFixed(1)}
                  </span>
                </div>

                <div className="w-full space-y-4 text-left pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
                      <Mail className="w-4 h-4 text-gray-500" />
                    </div>
                    <a
                      href={`mailto:${operator.company_metadata.email}`}
                      className="text-gray-600 hover:text-black truncate transition-colors font-medium"
                    >
                      {operator.company_metadata.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-sm group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
                      <Phone className="w-4 h-4 text-gray-500" />
                    </div>
                    <a
                      href={`tel:${operator.company_metadata.phone}`}
                      className="text-gray-600 hover:text-black transition-colors font-medium"
                    >
                      {operator.company_metadata.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-gray-600 font-medium">
                      {t("operatorDetails.since")}{" "}
                      {new Date(operator.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">{children}</div>
              </div>
            </div>

            {/* Trust Box - Simplified */}
            <div className="p-5 rounded-2xl bg-blue-50/50 flex gap-4 items-start">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900/80 leading-relaxed">
                <p className="font-bold mb-1 text-blue-900">
                  {t("operatorDetails.trustedPartner")}
                </p>
                <p>
                  {t("operatorDetails.trustDescription").replace(
                    "{name}",
                    operator.name
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content: Routes */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="text-lg font-bold text-gray-900">
                {t("operatorDetails.availableRoutes")}
              </h3>
              <span className="text-xs font-medium text-gray-500">
                {safeRoutes.length} {t("operatorDetails.routesFound")}
              </span>
            </div>

            {safeRoutes.length > 0 ? (
              <div className="space-y-0">
                {safeRoutes.map((route) => (
                  <RouteCard key={route._id} route={route} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-300" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {t("operatorDetails.noRoutesTitle")}
                </h4>
                <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                  {t("operatorDetails.noRoutesDescription")}
                </p>
                <Link href="/bus-operators">
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-200 hover:bg-gray-50 text-gray-900"
                  >
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
