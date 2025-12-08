import type { Metadata } from "next";
import Link from "next/link";
import {
  Bus,
  MapPin,
  Clock,
  Calendar,
  Euro,
  Users,
  CheckCircle2,
  TrendingDown,
  Navigation,
  Zap,
  Info,
  ArrowRight,
  ShieldCheck,
  Wifi,
  Coffee,
  Plug,
} from "lucide-react";
import { SearchForm } from "@/components/forms/SearchForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hamburg to Skopje Bus Tickets from €100 | Book Direct & Save",
  description:
    "Travel from Hamburg to Skopje by bus. Multiple daily departures, 25h journey, tickets from €100. Compare schedules, prices & operators. Book securely on GoBusly.",
  alternates: {
    canonical: "https://www.gobusly.com/buses/hamburg-skopje",
  },
  openGraph: {
    title: "Hamburg to Skopje Bus - From €100 | GoBusly",
    description:
      "Compare bus tickets from Hamburg to Skopje. Best prices, real-time schedules.",
    url: "https://www.gobusly.com/buses/hamburg-skopje",
    siteName: "GoBusly",
    type: "website",
  },
};

// JSON-LD Structured Data
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.gobusly.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buses",
        item: "https://www.gobusly.com/buses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hamburg to Skopje",
        item: "https://www.gobusly.com/buses/hamburg-skopje",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the average price for a bus ticket from Hamburg to Skopje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bus tickets from Hamburg to Skopje typically range from €100 to €130. Prices vary depending on the season, day of the week, and how far in advance you book.",
        },
      },
      {
        "@type": "Question",
        name: "How long is the journey from Hamburg to Skopje by bus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The journey from Hamburg to Skopje takes approximately 25 hours and 30 minutes, including rest stops and border crossings.",
        },
      },
      {
        "@type": "Question",
        name: "How many buses run daily from Hamburg to Skopje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are multiple buses per day from Hamburg to Skopje, with services starting at 08:00 AM.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BusTrip",
    provider: {
      "@type": "Organization",
      name: "GoBusly",
    },
    busName: "Hamburg to Skopje",
    departureBusStop: {
      "@type": "BusStop",
      name: "Hamburg ZOB",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamburg",
        addressCountry: "Germany",
      },
    },
    arrivalBusStop: {
      "@type": "BusStop",
      name: "Skopje Bus Station",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Skopje",
        addressCountry: "North Macedonia",
      },
    },
  },
];

export default function HamburgSkopjePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100 selection:text-red-600">
      <div className="relative bg-gradient-to-br from-[#ff284d]/5 via-white to-orange-50/30 overflow-hidden pb-16">
        {/* Decorative background blurs/gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-[#ff284d]/10 to-orange-100/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto paddingX py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-6 text-gray-400 font-light">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/buses"
              className="hover:text-gray-900 transition-colors"
            >
              Buses
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-normal">Hamburg to Skopje</span>
          </nav>

          {/* Hero Content */}
          <div className="space-y-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Bus className="w-4 h-4 text-[#ff284d]" />
              <span className="text-sm font-medium text-gray-700">
                Intercity Bus Route
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light leading-tight">
              Bus from{" "}
              <span className="font-normal text-[#ff284d]">Hamburg</span> to{" "}
              <span className="font-normal text-[#ff284d]">Skopje</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
              Travel comfortably from Hamburg, Germany to Skopje, North
              Macedonia by bus. Compare schedules, prices, and operators to find
              the best journey for you.
            </p>

            {/* Quick Stats (Using the new light style) */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500 font-light">From</div>
                  <div className="text-lg text-gray-900 font-normal">€100</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500 font-light">
                    Duration
                  </div>
                  <div className="text-lg text-gray-900 font-normal">
                    ~25h 30min
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-500 font-light">
                    First Departure
                  </div>
                  <div className="text-lg text-gray-900 font-normal">08:00</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-500 font-light">
                    Distance
                  </div>
                  <div className="text-lg text-gray-900 font-normal">
                    ~1,954 km
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Form - Original Placement */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* ========================================
        MAIN CONTENT (Using the improved, non-cluttered structure)
        ========================================
      */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {/* SECTION 1: JOURNEY TIMELINE (Consolidated Route Info) */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Journey Overview
              </h2>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                The route crosses through Central Europe and the Balkans. Expect
                a scenic ride through Germany, Austria, Slovenia, Croatia, and
                Serbia before reaching North Macedonia.
              </p>
            </div>
            <Link
              href="/search/hamburg-skopje"
              className="hidden md:inline-flex items-center gap-2 text-[#ff284d] font-medium hover:underline"
            >
              Check availability <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-gray-100 relative overflow-hidden">
            {/* Timeline Visual */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-px bg-gray-200"></div>

              {/* DEPARTURE */}
              <div className="relative pl-12 sm:pl-20 pb-12">
                <div className="absolute left-4 sm:left-8 top-2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-[#ff284d] rounded-full z-10 ring-4 ring-white"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Departure
                    </span>
                    <h3 className="text-2xl font-normal text-gray-900 mt-1">
                      Hamburg ZOB
                    </h3>
                    <p className="text-gray-500 font-light mt-1">
                      ZOB Hamburg, Adenauerallee, 20097 Hamburg, Germany
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 px-4 py-1.5 bg-gray-50 text-gray-900 rounded-full font-medium text-sm border border-gray-100 self-start">
                    08:00 AM
                  </div>
                </div>
                {/* Info Box */}
                <div className="mt-4 inline-flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg text-blue-800 text-sm font-light">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Check-in closes 30 minutes before departure.</span>
                </div>
              </div>

              {/* JOURNEY MIDDLE */}
              <div className="relative pl-12 sm:pl-20 pb-12">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500 font-light">
                    ~25 hours 30 minutes duration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500 font-light">
                    5 Border Crossings & Multiple Scheduled Rest Stops
                  </span>
                </div>
              </div>

              {/* ARRIVAL */}
              <div className="relative pl-12 sm:pl-20">
                <div className="absolute left-4 sm:left-8 top-2 -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full z-10 ring-4 ring-white"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Arrival
                    </span>
                    <h3 className="text-2xl font-normal text-gray-900 mt-1">
                      Skopje Bus Station
                    </h3>
                    <p className="text-gray-500 font-light mt-1">
                      Skopje Bus Station, Bul. Kuzman Josifovski Pitu, North
                      Macedonia
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 px-4 py-1.5 bg-gray-50 text-gray-900 rounded-full font-medium text-sm border border-gray-100 self-start">
                    Next Day (Time Varies)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AMENITIES GRID */}
        <section>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#ff284d] font-medium">
                <Zap className="w-5 h-5" />
                <span>Travel in Comfort</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
                Why choose the bus <br /> over flying?
              </h2>
              <p className="text-gray-500 font-light text-lg leading-relaxed">
                Besides saving up to 70% compared to air travel, taking the bus
                is an eco-friendly choice. Modern coaches are equipped for
                long-haul comfort, allowing you to relax, work, or sleep during
                the journey.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "2 checked bags included (up to 20kg)",
                  "Electronic tickets - no printing needed",
                  "Flexible cancellation options available",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 font-light"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Wifi, title: "Free Wi-Fi", desc: "Stay connected" },
                { icon: Plug, title: "Power Outlets", desc: "Charge devices" },
                {
                  icon: CheckCircle2,
                  title: "Reclining Seats",
                  desc: "Extra legroom",
                },
                { icon: Coffee, title: "Rest Stops", desc: "Scheduled breaks" },
                { icon: Info, title: "Restroom", desc: "Onboard facilities" },
                {
                  icon: Users,
                  title: "Comfortable Ride",
                  desc: "Modern Coaches",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 border border-transparent hover:border-gray-100 group"
                >
                  <feature.icon
                    className="w-6 h-6 text-gray-400 group-hover:text-[#ff284d] transition-colors mb-3"
                    strokeWidth={1.5}
                  />
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-400 font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: FAQ (Accordion Style) */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 font-light">
              Everything you need to know about the Hamburg to Skopje route
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is the price for a bus ticket from Hamburg to Skopje?",
                a: "Bus tickets from Hamburg to Skopje typically range from €100 to €130. Prices vary depending on the season, day of the week, and how far in advance you book. Early bird bookings can be as low as €100.",
              },
              {
                q: "How long is the bus journey from Hamburg to Skopje?",
                a: "The journey from Hamburg to Skopje takes approximately 25 hours and 30 minutes. This includes scheduled rest stops and time for border crossings through multiple countries.",
              },
              {
                q: "What time does the first bus depart from Hamburg to Skopje?",
                a: "The first bus from Hamburg to Skopje typically departs at 08:00 AM. We recommend arriving at the station at least 30 minutes before departure for check-in.",
              },
              {
                q: "How many countries does the bus pass through?",
                a: "The bus travels through 6 countries: Germany, Austria, Slovenia, Croatia, Serbia, and North Macedonia, crossing 5 international borders.",
              },
              {
                q: "Do I need a visa to travel from Hamburg to Skopje?",
                a: "EU citizens do not need a visa for North Macedonia for stays up to 90 days. Non-EU travelers should check visa requirements before booking. Ensure your passport is valid for at least 6 months.",
              },
              {
                q: "What amenities are available on the bus?",
                a: "Most buses on this route offer reclining seats, air conditioning, onboard restrooms, WiFi, and power outlets. Specific amenities may vary by operator.",
              },
              {
                q: "Can I bring luggage on the bus?",
                a: "Yes, tickets typically include one checked bag (up to 20kg) and one carry-on. Additional luggage may incur extra fees. Check your operator's specific luggage policy when booking.",
              },
              {
                q: "Are there rest stops during the journey?",
                a: "Yes, there are multiple scheduled rest stops along the route where you can stretch, use facilities, and purchase food and drinks.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden open:shadow-md transition-shadow duration-200"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none hover:bg-gray-50/50 transition-colors">
                  <span className="text-lg text-gray-800 font-normal pr-4 group-hover:text-[#ff284d] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-gray-300 group-open:rotate-180 group-open:text-[#ff284d] transition-all duration-300">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-500 font-light leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION */}
        <section className="relative rounded-[2rem] overflow-hidden bg-[#ff284d] text-center px-6 py-20 shadow-2xl shadow-[#ff284d]/20">
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="text-white/90 text-lg font-light leading-relaxed">
              Book your tickets online today to secure the best seats and
              prices. Avoid the queues at Hamburg ZOB.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/search/hamburg-skopje"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#ff284d] font-semibold px-8 py-4 rounded-full hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Book Tickets Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <span className="text-white/80 text-sm font-light">
                Prices starting from €100
              </span>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
