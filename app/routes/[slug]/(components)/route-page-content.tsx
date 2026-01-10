"use client";

import { useState } from "react";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Wifi,
  Zap,
  Snowflake,
  Bus,
  CheckCircle2,
  Shield,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

interface RoutePageContentProps {
  routeData: {
    fromCity: string;
    toCity: string;
    fromStation: any;
    toStation: any;
    distance: string;
    duration: string;
    minPrice: number;
    maxPrice: number;
    operators: any[];
    schedules: any[];
    reviews: any[];
    relatedRoutes: any[];
    faqs: any[];
  };
}

export default function RoutePageContent({ routeData }: RoutePageContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const {
    fromCity,
    toCity,
    fromStation,
    toStation,
    distance,
    duration,
    minPrice,
    maxPrice,
    operators,
    schedules,
    reviews,
    relatedRoutes,
  } = routeData;

  // ✅ SEO-OPTIMIZED FAQs with keywords
  const seoFaqs = [
    {
      question: `How long is the bus from ${fromCity} to ${toCity}?`,
      answer: `The bus journey from ${fromCity} to ${toCity} takes approximately ${duration}. Travel time may vary depending on traffic conditions and the specific route taken by the operator.`,
    },
    {
      question: `How much is a bus ticket from ${fromCity} to ${toCity}?`,
      answer: `Bus tickets from ${fromCity} to ${toCity} range from €${minPrice} to €${maxPrice}. Prices vary based on the operator, departure time, and how far in advance you book. Early bookings typically offer the best rates.`,
    },
    {
      question: `Are there direct buses from ${fromCity} to ${toCity}?`,
      answer: `Yes, there are direct bus connections from ${fromCity} to ${toCity}. Most operators provide non-stop service covering the ${distance} route. Check the schedule below for available direct departures.`,
    },
    {
      question: `How many buses run from ${fromCity} to ${toCity} per day?`,
      answer: `There are ${schedules.length} daily bus departures from ${fromCity} to ${toCity}. Buses operate throughout the day with multiple departure times to suit your schedule.`,
    },
    {
      question: `What bus operators service the ${fromCity} to ${toCity} route?`,
      answer: `The ${fromCity} to ${toCity} route is serviced by ${
        operators.length
      } reliable bus operators including ${operators
        .slice(0, 3)
        .map((op) => op.name)
        .join(
          ", "
        )}. All operators offer comfortable modern buses with various amenities.`,
    },
    {
      question: `Where does the bus depart from in ${fromCity}?`,
      answer: `Buses from ${fromCity} to ${toCity} depart from ${
        fromStation?.name || `${fromCity} Bus Station`
      }. The station is centrally located and easily accessible by public transport.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-20 md:pb-0">
      {/* ✅ HERO SECTION - Clean & Modern */}
      <div className="relative bg-gradient-to-br from-[#ff284d]/5 via-white to-orange-50/30 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-[#ff284d]/10 to-orange-100/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto paddingX py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-gray-600">
            <Link href="/" className="hover:text-[#ff284d] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/routes"
              className="hover:text-[#ff284d] transition-colors"
            >
              Routes
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {fromCity} to {toCity}
            </span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Bus className="w-4 h-4 text-[#ff284d]" />
              <span className="text-sm font-medium text-gray-700">
                Direct Route
              </span>
            </div>

            {/* ✅ CRITICAL: Proper H1 with full keyword */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
              Bus from <span className="text-[#ff284d]">{fromCity}</span> to{" "}
              <span className="text-[#ff284d]">{toCity}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Compare schedules and book your bus ticket from {fromCity} to{" "}
              {toCity}. Starting from{" "}
              <strong className="text-gray-900">€{minPrice}</strong> with{" "}
              {operators.length} trusted operators.
            </p>

            {/* Key Info Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  <strong>{duration}</strong> travel time
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">
                  <strong>{distance}</strong> distance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">
                  <strong>{schedules.length}</strong> daily buses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT - Clean Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-12">
        {/* ✅ SEO CONTENT SECTION - 600-800 words (Server-rendered HTML) */}
        <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#ff284d]/10 rounded-lg">
              <Bus className="w-6 h-6 text-[#ff284d]" />
            </div>
            <h2 className="text-3xl text-gray-900">
              Bus from {fromCity} to {toCity}: Complete Travel Guide
            </h2>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-5 leading-relaxed">
            <p>
              Traveling by bus from {fromCity} to {toCity} is a convenient,
              affordable, and comfortable way to reach your destination. With
              multiple daily departures and competitive prices starting from
              just €{minPrice}, finding the perfect bus for your journey has
              never been easier. Whether you're traveling for business, leisure,
              or visiting family, our bus services connect these two cities with
              reliable and modern transportation.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff284d]" />
                Route Overview and Travel Time
              </h3>
              <p>
                The bus route from {fromCity} to {toCity} covers approximately{" "}
                {distance}, with an average travel time of {duration}. The
                journey takes you through scenic landscapes and well-maintained
                highways, ensuring a smooth and pleasant trip. Most buses on
                this route are direct connections, meaning you won't need to
                worry about transfers or changing buses along the way.
              </p>
              <p className="mt-3">
                Departure points are conveniently located at{" "}
                {fromStation?.name || `${fromCity} Bus Station`}, while arrival
                is at {toStation?.name || `${toCity} Bus Station`}, both
                offering easy access to city centers and onward connections.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Ticket Prices and How to Save
            </h3>
            <p>
              Bus tickets from {fromCity} to {toCity} are priced between €
              {minPrice} and €{maxPrice}, depending on several factors including
              the operator, departure time, and booking date. To get the best
              deals on your {fromCity} to {toCity} bus tickets, we recommend
              booking as early as possible. Early bird tickets can save you up
              to 30% compared to last-minute bookings.
            </p>
            <p>
              Midweek departures (Tuesday through Thursday) are generally
              cheaper than weekend travel, and overnight buses often offer lower
              fares than daytime services. Booking through GoBusly ensures
              transparent pricing with no hidden fees, so the price you see is
              the price you pay.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Bus Operators and Fleet Quality
            </h3>
            <p>
              The {fromCity} to {toCity} route is serviced by {operators.length}{" "}
              reputable bus companies, each maintaining high standards of safety
              and comfort. These operators run modern buses equipped with
              reclining seats, air conditioning, onboard restrooms, and
              entertainment systems. Many buses also feature free WiFi, power
              outlets at each seat, and ample luggage space.
            </p>
            <p>
              Popular operators on this route include{" "}
              {operators
                .slice(0, 3)
                .map((op) => op.name)
                .join(", ")}
              , all known for their punctuality, professional drivers, and
              excellent customer service. All vehicles undergo regular
              maintenance and safety inspections to ensure passenger safety
              throughout the journey.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Departure and Arrival Stations
            </h3>
            <p>
              Buses depart from {fromStation?.name || `${fromCity} Bus Station`}
              , which is easily accessible by local public transport and offers
              parking facilities for those driving to the station. The station
              features comfortable waiting areas, clean restrooms, cafes, and
              ticket counters for any last-minute needs or questions.
            </p>
            <p>
              Upon arrival in {toCity}, you'll disembark at{" "}
              {toStation?.name || `${toCity} Central Bus Station`},
              strategically located near the city center with excellent
              connections to hotels, tourist attractions, and onward
              transportation options including local buses, taxis, and
              ride-sharing services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Why Book with GoBusly
            </h3>
            <p>
              GoBusly makes booking bus tickets from {fromCity} to {toCity}{" "}
              simple, fast, and secure. Our platform allows you to compare all
              available buses, operators, and departure times in one place,
              helping you find the best option for your schedule and budget. We
              offer instant booking confirmation, secure payment processing, and
              24/7 customer support to assist you at every step of your journey.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5 my-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Quick Tips for Your Journey
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 ml-7 list-disc">
                <li>Arrive at the station 15-20 minutes before departure</li>
                <li>
                  Bring a valid ID and your booking confirmation (digital or
                  printed)
                </li>
                <li>Pack light snacks and water for the journey</li>
                <li>Download your ticket to your phone for easy access</li>
                <li>Check luggage allowances for your specific operator</li>
                <li>Charge your devices - most buses have power outlets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ✅ AVAILABLE BUSES - Clean Schedule Display */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl text-gray-900">Available Buses</h2>
              <p className="text-gray-600 mt-2">
                Select your preferred departure time
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 text-[#ff284d]" />
              <span className="text-sm text-gray-600">Today</span>
            </div>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-6">
                  {/* Time Info */}
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {schedule.departureTime}
                      </div>
                      <div className="text-sm text-gray-500">{fromCity}</div>
                    </div>

                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 border-t-2 border-dashed border-gray-200"></div>
                      <div className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-600">
                        {schedule.duration}
                      </div>
                      <div className="flex-1 border-t-2 border-dashed border-gray-200"></div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {schedule.arrivalTime}
                      </div>
                      <div className="text-sm text-gray-500">{toCity}</div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#ff284d] mb-2">
                      €{schedule.price}
                    </div>
                    <button className="bg-[#ff284d] hover:bg-[#ff284d]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                      Select
                    </button>
                  </div>
                </div>

                {/* Operator & Amenities */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {schedule.operator}
                    </span>
                    <div className="flex items-center gap-2">
                      {schedule.amenities?.includes("wifi") && (
                        <div
                          className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"
                          title="WiFi"
                        >
                          <Wifi className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                      {schedule.amenities?.includes("ac") && (
                        <div
                          className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"
                          title="AC"
                        >
                          <Snowflake className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                      {schedule.amenities?.includes("charging") && (
                        <div
                          className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"
                          title="Charging"
                        >
                          <Zap className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {schedule.seatsAvailable} seats available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ FAQ SECTION - SEO Optimized with Keywords */}
        <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
          <h2 className="text-3xl text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {seoFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ✅ RELATED ROUTES - Clean Grid */}
        {relatedRoutes.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl text-gray-900">Related Routes</h2>
              <p className="text-gray-600 mt-2">
                Popular bus connections from nearby cities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedRoutes.map((route, index) => (
                <Link
                  key={index}
                  href={`/routes/${route.slug}`}
                  className="group bg-white rounded-lg border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Bus className="w-5 h-5 text-gray-500" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#ff284d] transition-colors" />
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-sm text-gray-600">
                    From{" "}
                    <span className="font-semibold text-[#ff284d]">
                      €{route.price}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
