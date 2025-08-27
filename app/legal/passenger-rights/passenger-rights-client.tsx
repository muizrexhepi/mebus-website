"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  Shield,
  Users,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Heart,
  HelpCircle,
} from "lucide-react";

export default function PassengerRightsPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: any) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Passenger Rights</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              As a bus passenger in Europe, you have comprehensive rights
              protected by EU law. Learn what you're entitled to and how GoBusly
              supports your journey.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg">
              <Info className="w-5 h-5 mr-2" />
              <span className="font-medium">
                Protected by EU Regulation 181/2011
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Navigation
                </h2>
                <nav className="space-y-2">
                  {[
                    { id: "overview", title: "Rights Overview", icon: Shield },
                    {
                      id: "delays-cancellations",
                      title: "Delays & Cancellations",
                      icon: Clock,
                    },
                    { id: "compensation", title: "Compensation", icon: Heart },
                    {
                      id: "accessibility",
                      title: "Accessibility Rights",
                      icon: Users,
                    },
                    {
                      id: "accidents-safety",
                      title: "Safety & Accidents",
                      icon: AlertCircle,
                    },
                    {
                      id: "complaints",
                      title: "Making Complaints",
                      icon: HelpCircle,
                    },
                    {
                      id: "gobusly-support",
                      title: "GoBusly's Support",
                      icon: Phone,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        {item.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-8">
                {/* Important Notice */}
                <div className="mb-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-amber-800 font-semibold mb-2">
                        Important: GoBusly's Role
                      </p>
                      <p className="text-amber-700 leading-relaxed mb-3">
                        GoBusly is a booking platform that connects you with
                        independent bus operators (carriers). While we
                        facilitate your booking and provide customer support,
                        your passenger rights are primarily enforced by the bus
                        operators who provide the actual transportation service.
                      </p>
                      <div className="bg-white p-3 rounded border border-amber-200">
                        <p className="text-sm text-amber-900 font-medium">
                          We're here to help you understand your rights and
                          assist with refund processing when you have Travel
                          Flex coverage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  {/* Section 1: Rights Overview */}
                  <section id="overview">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <Shield className="w-7 h-7 mr-3 text-blue-600" />
                      Your Rights Overview
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        EU Regulation 181/2011 protects passengers on bus and
                        coach services of 250km or more. These rights ensure
                        fair treatment, adequate information, and compensation
                        when things go wrong.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="text-lg font-semibold text-green-800 mb-4">
                            Your Fundamental Rights
                          </h3>
                          <ul className="space-y-2 text-green-700">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Non-discriminatory treatment regardless of
                              nationality
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Clear information about your journey and rights
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Assistance during delays and cancellations
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Compensation for eligible disruptions
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              Equal access for passengers with disabilities
                            </li>
                          </ul>
                        </div>

                        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                          <h3 className="text-lg font-semibold text-blue-800 mb-4">
                            When Rights Apply
                          </h3>
                          <div className="space-y-4">
                            <div className="p-3 bg-white rounded border border-blue-200">
                              <p className="text-blue-800 font-medium mb-1">
                                Distance Requirement
                              </p>
                              <p className="text-blue-700 text-sm">
                                Routes of 250km or more within the EU
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded border border-blue-200">
                              <p className="text-blue-800 font-medium mb-1">
                                Geographic Coverage
                              </p>
                              <p className="text-blue-700 text-sm">
                                EU member states, plus Iceland, Norway,
                                Switzerland
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded border border-blue-200">
                              <p className="text-blue-800 font-medium mb-1">
                                Service Types
                              </p>
                              <p className="text-blue-700 text-sm">
                                Regular scheduled bus and coach services
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Delays and Cancellations */}
                  <section id="delays-cancellations">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <Clock className="w-7 h-7 mr-3 text-blue-600" />
                      Delays and Cancellations
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                        <h3 className="text-red-800 font-semibold mb-3">
                          When Your Journey is Disrupted
                        </h3>
                        <p className="text-red-700 mb-4">
                          If your bus is cancelled or delayed by more than 120
                          minutes, you have specific rights to assistance and
                          alternative arrangements.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Information Rights
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Notification Timeline
                              </h5>
                              <p className="text-blue-700 text-sm">
                                Carriers must inform passengers about
                                cancellations or delays within 30 minutes of
                                scheduled departure time
                              </p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Required Information
                              </h5>
                              <p className="text-blue-700 text-sm">
                                Expected departure time, alternative
                                connections, and your rights must be
                                communicated clearly
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-purple-800 mb-4">
                            Your Options for Major Disruptions (120+ minutes)
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-purple-200">
                              <h5 className="font-medium text-purple-800 mb-2">
                                Option 1: Alternative Transport
                              </h5>
                              <p className="text-purple-700 text-sm mb-2">
                                Re-routing to your destination at no extra cost
                                under comparable conditions
                              </p>
                              <ul className="text-purple-600 text-xs space-y-1">
                                <li>• At the earliest opportunity</li>
                                <li>• Similar transport conditions</li>
                                <li>• No additional charges</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-purple-200">
                              <h5 className="font-medium text-purple-800 mb-2">
                                Option 2: Full Refund
                              </h5>
                              <p className="text-purple-700 text-sm mb-2">
                                Complete ticket price refund plus free return
                                trip if needed
                              </p>
                              <ul className="text-purple-600 text-xs space-y-1">
                                <li>• Full ticket price returned</li>
                                <li>• Free return to departure point</li>
                                <li>• If journey purpose can't be fulfilled</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-yellow-800 mb-4">
                            Assistance During Delays (90+ minutes)
                          </h4>
                          <p className="text-yellow-700 mb-4">
                            For journeys over 3 hours, carriers must provide
                            assistance if departure is delayed by 90 minutes or
                            more:
                          </p>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-3 bg-white rounded border border-yellow-200">
                              <h5 className="font-medium text-yellow-800 mb-1">
                                Food & Drink
                              </h5>
                              <p className="text-yellow-700 text-sm">
                                Snacks, meals, and refreshments proportionate to
                                waiting time
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded border border-yellow-200">
                              <h5 className="font-medium text-yellow-800 mb-1">
                                Accommodation
                              </h5>
                              <p className="text-yellow-700 text-sm">
                                Hotel if overnight stay required (up to
                                €80/night, max 2 nights)
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded border border-yellow-200">
                              <h5 className="font-medium text-yellow-800 mb-1">
                                Communication
                              </h5>
                              <p className="text-yellow-700 text-sm">
                                Access to phone calls, emails, or messages as
                                reasonable
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Compensation */}
                  <section id="compensation">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <Heart className="w-7 h-7 mr-3 text-blue-600" />
                      Compensation Rights
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                        <h3 className="text-green-800 font-semibold mb-3">
                          When You're Entitled to Compensation
                        </h3>
                        <p className="text-green-700">
                          If the carrier doesn't offer you the choice between
                          refund and re-routing during major disruptions, you're
                          entitled to 50% of your fare as compensation.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Compensation Scenarios
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <h5 className="font-medium text-red-800 mb-2">
                                Carrier Fails to Provide Options
                              </h5>
                              <p className="text-red-700 text-sm mb-2">
                                If the carrier doesn't offer refund OR
                                re-routing during 120+ minute disruptions
                              </p>
                              <div className="flex items-center justify-between p-2 bg-white rounded border border-red-200">
                                <span className="text-red-800 font-medium">
                                  Compensation:
                                </span>
                                <span className="text-red-900 font-bold">
                                  50% of ticket fare
                                </span>
                              </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Overbooking Situations
                              </h5>
                              <p className="text-blue-700 text-sm mb-2">
                                If you're denied boarding due to overbooking
                                despite valid tickets
                              </p>
                              <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                                <span className="text-blue-800 font-medium">
                                  Right to:
                                </span>
                                <span className="text-blue-900 font-bold">
                                  Alternative transport OR full refund
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-amber-800 mb-4">
                            Important Compensation Notes
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <p className="text-amber-800 font-medium mb-1">
                                  Additional Claims Possible
                                </p>
                                <p className="text-amber-700 text-sm">
                                  Compensation doesn't prevent you from seeking
                                  additional damages through national courts for
                                  further losses
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <p className="text-amber-800 font-medium mb-1">
                                  Weather Exceptions
                                </p>
                                <p className="text-amber-700 text-sm">
                                  Carriers may limit accommodation costs if
                                  disruptions are caused by severe weather or
                                  natural disasters
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 4: Accessibility Rights */}
                  <section id="accessibility">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <Users className="w-7 h-7 mr-3 text-blue-600" />
                      Rights for Passengers with Disabilities
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                        <h3 className="text-purple-800 font-semibold mb-3">
                          Equal Access Rights
                        </h3>
                        <p className="text-purple-700">
                          Passengers with disabilities and reduced mobility have
                          the same right to travel as all other citizens, with
                          additional protections and assistance.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Non-Discrimination Protections
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h5 className="font-medium text-green-800">
                                Carriers Cannot:
                              </h5>
                              <ul className="space-y-2 text-green-700 text-sm">
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Charge extra fees for bookings or tickets
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Refuse reservations due to disability
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Remove passengers from vehicles due to
                                  disability
                                </li>
                              </ul>
                            </div>
                            <div className="space-y-3">
                              <h5 className="font-medium text-blue-800">
                                Exceptions Only When:
                              </h5>
                              <ul className="space-y-2 text-blue-700 text-sm">
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Safety regulations prevent transport
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Vehicle/infrastructure design limitations
                                </li>
                                <li className="flex items-start">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  Transport not operationally feasible
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-blue-800 mb-4">
                            Assistance Services
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-white rounded-lg border border-blue-200">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Pre-Travel Requirements
                              </h5>
                              <p className="text-blue-700 text-sm mb-2">
                                To receive assistance, you must:
                              </p>
                              <ul className="text-blue-600 text-sm space-y-1">
                                <li>
                                  • Notify the carrier at least 36 hours in
                                  advance
                                </li>
                                <li>• Specify your assistance needs clearly</li>
                                <li>
                                  • Arrive at the designated location up to 60
                                  minutes early
                                </li>
                              </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-white rounded-lg border border-blue-200">
                                <h5 className="font-medium text-blue-800 mb-2">
                                  At Terminals
                                </h5>
                                <ul className="text-blue-700 text-sm space-y-1">
                                  <li>• Assistance boarding and alighting</li>
                                  <li>
                                    • Help with luggage and mobility equipment
                                  </li>
                                  <li>• Information in accessible formats</li>
                                </ul>
                              </div>
                              <div className="p-4 bg-white rounded-lg border border-blue-200">
                                <h5 className="font-medium text-blue-800 mb-2">
                                  During Journey
                                </h5>
                                <ul className="text-blue-700 text-sm space-y-1">
                                  <li>• Appropriate seating arrangements</li>
                                  <li>• Assistance with onboard services</li>
                                  <li>• Communication support as needed</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-green-800 mb-4">
                            Mobility Equipment Protection
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-green-200">
                              <h5 className="font-medium text-green-800 mb-2">
                                Damage Compensation
                              </h5>
                              <p className="text-green-700 text-sm">
                                If wheelchairs or mobility equipment are lost or
                                damaged through carrier fault, compensation must
                                cover replacement value or repair costs
                              </p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-green-200">
                              <h5 className="font-medium text-green-800 mb-2">
                                Temporary Replacement
                              </h5>
                              <p className="text-green-700 text-sm">
                                Carriers must make every effort to provide
                                temporary replacement equipment while yours is
                                being repaired or replaced
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 5: Safety and Accidents */}
                  <section id="accidents-safety">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <AlertCircle className="w-7 h-7 mr-3 text-blue-600" />
                      Safety and Accident Rights
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                        <h3 className="text-red-800 font-semibold mb-3">
                          In Case of Accidents
                        </h3>
                        <p className="text-red-700">
                          Passengers have rights to compensation and immediate
                          assistance in the event of accidents resulting in
                          injury, death, or luggage damage.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Compensation for Injury and Death
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <h5 className="font-medium text-red-800 mb-2">
                                Personal Injury Claims
                              </h5>
                              <p className="text-red-700 text-sm">
                                Passengers are entitled to compensation for
                                personal injuries resulting from bus accidents.
                                Compensation amounts are determined by national
                                legislation with EU minimum standards.
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <h5 className="font-medium text-gray-800 mb-2">
                                Legal Process
                              </h5>
                              <p className="text-gray-700 text-sm">
                                Compensation is not automatic and may need to be
                                enforced through national courts if carriers
                                don't cooperate voluntarily.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-orange-800 mb-4">
                            Immediate Assistance After Accidents
                          </h4>
                          <p className="text-orange-700 mb-4">
                            Carriers must provide reasonable and appropriate
                            immediate assistance:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-3 bg-white rounded border border-orange-200">
                              <h6 className="font-medium text-orange-800 mb-1">
                                Emergency Needs
                              </h6>
                              <ul className="text-orange-700 text-sm space-y-1">
                                <li>• First aid and medical assistance</li>
                                <li>• Emergency accommodation</li>
                                <li>• Food and essential supplies</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-white rounded border border-orange-200">
                              <h6 className="font-medium text-orange-800 mb-1">
                                Practical Support
                              </h6>
                              <ul className="text-orange-700 text-sm space-y-1">
                                <li>• Alternative transport arrangements</li>
                                <li>• Clothing if needed</li>
                                <li>• Communication with family/contacts</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-yellow-800 mb-4">
                            Luggage Loss and Damage
                          </h4>
                          <div className="space-y-4">
                            <p className="text-yellow-700">
                              Carriers are liable for loss or damage to luggage
                              during transport, with compensation based on the
                              value and circumstances of the loss.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-3 bg-white rounded border border-yellow-200">
                                <h6 className="font-medium text-yellow-800 mb-1">
                                  Coverage Includes
                                </h6>
                                <ul className="text-yellow-700 text-sm space-y-1">
                                  <li>• Lost or stolen luggage</li>
                                  <li>• Damaged contents</li>
                                  <li>• Delayed delivery</li>
                                </ul>
                              </div>
                              <div className="p-3 bg-white rounded border border-yellow-200">
                                <h6 className="font-medium text-yellow-800 mb-1">
                                  Exceptions
                                </h6>
                                <ul className="text-yellow-700 text-sm space-y-1">
                                  <li>• Inadequately packed items</li>
                                  <li>• Items unfit for transport</li>
                                  <li>
                                    • Special nature goods (with warnings)
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 6: Complaints */}
                  <section id="complaints">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <HelpCircle className="w-7 h-7 mr-3 text-blue-600" />
                      Filing Complaints and Seeking Resolution
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <h3 className="text-blue-800 font-semibold mb-3">
                          Your Right to Complain
                        </h3>
                        <p className="text-blue-700">
                          If you believe your passenger rights have been
                          violated, you have the right to file complaints and
                          seek resolution through multiple channels.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Step-by-Step Complaint Process
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                                1
                              </div>
                              <div>
                                <h5 className="font-medium text-green-800 mb-1">
                                  Contact the Carrier First
                                </h5>
                                <p className="text-green-700 text-sm">
                                  File your complaint directly with the bus
                                  operator. They must respond within 1 month and
                                  provide a definitive answer within 3 months.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                                2
                              </div>
                              <div>
                                <h5 className="font-medium text-blue-800 mb-1">
                                  Contact GoBusly for Support
                                </h5>
                                <p className="text-blue-700 text-sm">
                                  We can help you understand your rights,
                                  provide carrier contact information, and
                                  assist with Travel Flex refund processing if
                                  applicable.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                                3
                              </div>
                              <div>
                                <h5 className="font-medium text-purple-800 mb-1">
                                  National Enforcement Bodies
                                </h5>
                                <p className="text-purple-700 text-sm">
                                  If unsatisfied with the carrier's response,
                                  contact your country's national enforcement
                                  body for passenger rights violations.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                                4
                              </div>
                              <div>
                                <h5 className="font-medium text-orange-800 mb-1">
                                  EU Online Dispute Resolution
                                </h5>
                                <p className="text-orange-700 text-sm">
                                  Use the EU's online platform at
                                  ec.europa.eu/consumers/odr for alternative
                                  dispute resolution.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-indigo-800 mb-4">
                              Documentation Tips
                            </h4>
                            <ul className="text-indigo-700 text-sm space-y-2">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Keep all tickets, receipts, and booking
                                confirmations
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Take photos of delays, cancellations, or
                                conditions
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Record names and times of staff interactions
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Keep records of additional expenses incurred
                              </li>
                            </ul>
                          </div>

                          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                              Time Limits to Remember
                            </h4>
                            <div className="space-y-3">
                              <div className="p-3 bg-white rounded border border-gray-300">
                                <p className="font-medium text-gray-800 text-sm">
                                  Carrier Response
                                </p>
                                <p className="text-gray-600 text-sm">
                                  1 month acknowledgment, 3 months resolution
                                </p>
                              </div>
                              <div className="p-3 bg-white rounded border border-gray-300">
                                <p className="font-medium text-gray-800 text-sm">
                                  Travel Flex Refunds
                                </p>
                                <p className="text-gray-600 text-sm">
                                  Within flex period specified at booking
                                </p>
                              </div>
                              <div className="p-3 bg-white rounded border border-gray-300">
                                <p className="font-medium text-gray-800 text-sm">
                                  Legal Claims
                                </p>
                                <p className="text-gray-600 text-sm">
                                  Varies by country and claim type
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 7: GoBusly Support */}
                  <section id="gobusly-support">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200 flex items-center">
                      <Phone className="w-7 h-7 mr-3 text-blue-600" />
                      How GoBusly Supports Your Rights
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <h3 className="text-blue-800 font-semibold mb-3">
                          Our Commitment to You
                        </h3>
                        <p className="text-blue-700">
                          While we're a booking platform rather than a carrier,
                          we're committed to helping you understand and exercise
                          your passenger rights effectively.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-800 mb-4">
                              What We Provide
                            </h4>
                            <ul className="text-green-700 text-sm space-y-3">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Clear information about your passenger rights
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Carrier contact information for complaints
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Travel Flex refund processing (when purchased)
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Customer support for booking-related issues
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Guidance on complaint procedures
                              </li>
                            </ul>
                          </div>

                          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-amber-800 mb-4">
                              Travel Flex Benefits
                            </h4>
                            <p className="text-amber-700 text-sm mb-3">
                              When you purchase Travel Flex, we provide
                              additional protection:
                            </p>
                            <div className="space-y-2">
                              <div className="p-3 bg-white rounded border border-amber-200">
                                <p className="font-medium text-amber-800 text-sm">
                                  70% Refund
                                </p>
                                <p className="text-amber-700 text-xs">
                                  Processed directly by GoBusly within 14 days
                                </p>
                              </div>
                              <div className="p-3 bg-white rounded border border-amber-200">
                                <p className="font-medium text-amber-800 text-sm">
                                  Flexible Cancellation
                                </p>
                                <p className="text-amber-700 text-xs">
                                  Cancel within your flex period without carrier
                                  approval
                                </p>
                              </div>
                              <div className="p-3 bg-white rounded border border-amber-200">
                                <p className="font-medium text-amber-800 text-sm">
                                  Simple Process
                                </p>
                                <p className="text-amber-700 text-xs">
                                  One-click refund requests through your account
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-blue-800 mb-4">
                            Getting Help from GoBusly
                          </h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                                <h5 className="font-medium text-blue-800">
                                  Email Support
                                </h5>
                              </div>
                              <p className="text-blue-700 text-sm mb-2">
                                contact@gobusly.com
                              </p>
                              <p className="text-blue-600 text-xs">
                                Response within 24 hours
                              </p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Phone className="w-5 h-5 text-blue-600 mr-2" />
                                <h5 className="font-medium text-blue-800">
                                  Phone Support
                                </h5>
                              </div>
                              <p className="text-blue-700 text-sm mb-2">
                                (+389) 70-250-259
                              </p>
                              <p className="text-blue-600 text-xs">
                                Business hours: 9AM-6PM CET
                              </p>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-blue-200">
                              <div className="flex items-center mb-2">
                                <ExternalLink className="w-5 h-5 text-blue-600 mr-2" />
                                <h5 className="font-medium text-blue-800">
                                  Account Portal
                                </h5>
                              </div>
                              <p className="text-blue-700 text-sm mb-2">
                                My Bookings section
                              </p>
                              <p className="text-blue-600 text-xs">
                                24/7 self-service options
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <h4 className="text-lg font-semibold text-purple-800 mb-4">
                            Working Together for Your Rights
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-purple-800 mb-2">
                                Our Role
                              </h5>
                              <ul className="text-purple-700 text-sm space-y-1">
                                <li>• Provide clear booking information</li>
                                <li>• Process Travel Flex refunds promptly</li>
                                <li>• Connect you with carriers when needed</li>
                                <li>
                                  • Advocate for customer-friendly policies
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-purple-800 mb-2">
                                Your Actions
                              </h5>
                              <ul className="text-purple-700 text-sm space-y-1">
                                <li>
                                  • Contact carriers directly for service issues
                                </li>
                                <li>
                                  • Document problems with photos/receipts
                                </li>
                                <li>• Know your rights under EU law</li>
                                <li>
                                  • Use official complaint channels when needed
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Need More Information?
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        For detailed legal information about EU passenger
                        rights, visit the official sources:
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a
                          href="https://transport.ec.europa.eu/transport-themes/passenger-rights_en"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          EU Transport Commission
                        </a>
                        <a
                          href="http://ec.europa.eu/consumers/odr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          EU Online Dispute Resolution
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm text-center">
                      This page provides general information about your rights.
                      For specific legal advice, please consult with qualified
                      legal professionals in your jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
