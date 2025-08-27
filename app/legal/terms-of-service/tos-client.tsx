"use client";
import React, { useState, useEffect } from "react";

export default function TermsOfServiceClient() {
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            These terms govern your use of GoBusly's bus ticket booking
            platform. Please read them carefully to understand your rights and
            obligations.
          </p>
          <div className="mt-6 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Last Updated: February 23, 2025
            </span>
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
                  Table of Contents
                </h2>
                <nav className="space-y-2">
                  {[
                    { id: "acceptance", title: "1. Agreement" },
                    { id: "definitions", title: "2. Definitions" },
                    { id: "service-scope", title: "3. Our Service" },
                    { id: "user-eligibility", title: "4. User Eligibility" },
                    { id: "user-obligations", title: "5. User Obligations" },
                    {
                      id: "bookings-payments",
                      title: "6. Bookings & Payments",
                    },
                    { id: "consumer-rights", title: "7. Consumer Rights" },
                    { id: "refunds-cancellations", title: "8. Refunds" },
                    {
                      id: "carrier-responsibilities",
                      title: "9. Carrier Duties",
                    },
                    { id: "intellectual-property", title: "10. IP Rights" },
                    { id: "limitation-liability", title: "11. Liability" },
                    { id: "dispute-resolution", title: "12. Disputes" },
                    { id: "term-modifications", title: "13. Modifications" },
                    { id: "contact-information", title: "14. Contact" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-8">
                {/* Introduction */}
                <div className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms of Service constitute a legally binding
                    agreement between you and GoBusly L.L.C. governing your use
                    of our bus ticket booking platform. By using our services,
                    you agree to these terms and our Privacy Policy.
                  </p>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium mb-2">
                      Important Notice:
                    </p>
                    <p className="text-sm text-blue-800">
                      GoBusly operates as a booking intermediary. The actual
                      transportation service is provided by independent bus
                      operators (Carriers).
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  {/* Section 1: Agreement */}
                  <section id="acceptance">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      1. Agreement to Terms
                    </h2>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        By accessing or using the GoBusly platform (website,
                        mobile app, or any related services), you acknowledge
                        that you have read, understood, and agree to be bound by
                        these Terms of Service.
                      </p>
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                        <p className="text-amber-800 font-medium mb-2">
                          Before You Continue:
                        </p>
                        <ul className="text-amber-700 text-sm space-y-1">
                          <li>
                            • You must be at least 18 years old or have parental
                            consent
                          </li>
                          <li>• You agree to provide accurate information</li>
                          <li>
                            • You understand we are not a transportation
                            provider
                          </li>
                          <li>
                            • You accept our Privacy Policy and Cookie Policy
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Definitions */}
                  <section id="definitions">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      2. Key Definitions
                    </h2>
                    <div className="grid gap-4">
                      {[
                        {
                          term: "Platform",
                          definition:
                            "GoBusly's website, mobile application, and all associated booking services.",
                        },
                        {
                          term: "Service",
                          definition:
                            "Bus ticket search, booking, payment processing, and customer support services provided by GoBusly.",
                        },
                        {
                          term: "User/You",
                          definition:
                            "Any person who accesses, browses, or uses the Platform.",
                        },
                        {
                          term: "Carrier/Operator",
                          definition:
                            "Independent bus companies that provide the actual transportation services.",
                        },
                        {
                          term: "Booking",
                          definition:
                            "A confirmed reservation for transportation services made through our Platform.",
                        },
                        {
                          term: "Ticket",
                          definition:
                            "Electronic or physical proof of purchase for transportation services.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <dt className="font-semibold text-gray-800 mb-2">
                            {item.term}
                          </dt>
                          <dd className="text-gray-600 text-sm">
                            {item.definition}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 3: Service Scope */}
                  <section id="service-scope">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      3. Our Role and Service Scope
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <p className="text-green-800 font-medium mb-2">
                          What We Do:
                        </p>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>
                            • Provide a platform to search and compare bus
                            tickets
                          </li>
                          <li>
                            • Process payments securely as merchant of record
                          </li>
                          <li>• Issue electronic tickets and confirmations</li>
                          <li>
                            • Offer customer support for booking-related issues
                          </li>
                          <li>
                            • Handle refunds according to carrier policies
                          </li>
                        </ul>
                      </div>
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-red-800 font-medium mb-2">
                          What We Don't Do:
                        </p>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>
                            • We are not a bus operator or transportation
                            provider
                          </li>
                          <li>
                            • We don't control bus schedules, routes, or service
                            quality
                          </li>
                          <li>
                            • We're not responsible for delays, cancellations,
                            or missed connections
                          </li>
                          <li>
                            • We don't handle baggage or provide on-board
                            services
                          </li>
                        </ul>
                      </div>
                      <p className="text-gray-700">
                        The transportation contract is between you and the
                        Carrier. All service-related issues should be addressed
                        with the Carrier first, though we'll assist with refund
                        processing when applicable.
                      </p>
                    </div>
                  </section>

                  {/* Section 4: User Eligibility */}
                  <section id="user-eligibility">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      4. User Eligibility and Account Requirements
                    </h2>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        To use our services, you must meet the following
                        requirements:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Age Requirements
                          </h4>
                          <p className="text-gray-600 text-sm">
                            You must be 18 years or older, or have
                            parental/guardian consent if under 18.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Legal Capacity
                          </h4>
                          <p className="text-gray-600 text-sm">
                            You must have the legal capacity to enter into
                            binding agreements.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Accurate Information
                          </h4>
                          <p className="text-gray-600 text-sm">
                            All information provided must be current, accurate,
                            and complete.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Lawful Use
                          </h4>
                          <p className="text-gray-600 text-sm">
                            You must comply with all applicable laws and
                            regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 5: User Obligations */}
                  <section id="user-obligations">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      5. User Responsibilities and Prohibited Activities
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          You Agree To:
                        </h3>
                        <div className="grid gap-3">
                          {[
                            "Provide accurate personal and payment information",
                            "Maintain confidentiality of your account credentials",
                            "Follow all Carrier rules and travel requirements",
                            "Arrive on time with valid identification and tickets",
                            "Notify us immediately of any unauthorized account use",
                            "Respect other users and staff during your interactions",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-green-800 text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Prohibited Activities:
                        </h3>
                        <div className="grid gap-3">
                          {[
                            "Using automated tools, bots, or scrapers on our platform",
                            "Attempting to access restricted areas or other users' accounts",
                            "Making fraudulent bookings or using invalid payment methods",
                            "Reselling tickets without proper authorization",
                            "Violating any applicable laws or carrier regulations",
                            "Interfering with the platform's functionality or security",
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-red-800 text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 6: Bookings and Payments */}
                  <section id="bookings-payments">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      6. Booking Process and Payment Terms
                    </h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Booking Process
                          </h4>
                          <ul className="text-gray-600 text-sm space-y-2">
                            <li>• All bookings subject to seat availability</li>
                            <li>• Prices include VAT and mandatory fees</li>
                            <li>
                              • Final confirmation depends on Carrier approval
                            </li>
                            <li>
                              • You'll receive electronic tickets via email
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Payment Terms
                          </h4>
                          <ul className="text-gray-600 text-sm space-y-2">
                            <li>• Secure processing via licensed providers</li>
                            <li>• Major credit/debit cards accepted</li>
                            <li>
                              • Service fees clearly displayed before payment
                            </li>
                            <li>
                              • Payment processed immediately upon confirmation
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-blue-800 font-medium mb-2">
                          Important Payment Notice:
                        </p>
                        <p className="text-blue-700 text-sm">
                          By completing a booking, you authorize us to charge
                          your payment method for the full amount, including
                          tickets and any applicable service fees. Additional
                          carrier fees (such as baggage) are your responsibility
                          and may be charged separately.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 7: Consumer Rights */}
                  <section id="consumer-rights">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      7. Your Consumer Rights Under EU Law
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <p className="text-purple-800 font-medium mb-2">
                          EU Passenger Rights:
                        </p>
                        <p className="text-purple-700 text-sm">
                          For journeys of 250km or more, you're protected by EU
                          Regulation 181/2011 concerning passenger rights in bus
                          and coach transport.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Right to Information
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Clear information about journey times, stops,
                            accessibility, and carrier contact details.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Delay Compensation
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Rights to assistance, alternative transport, or
                            refunds for significant delays (handled by
                            Carriers).
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Accessibility Rights
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Equal access for passengers with disabilities and
                            reduced mobility (subject to carrier capabilities).
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Complaint Procedures
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Right to file complaints with carriers and national
                            enforcement bodies for service issues.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 8: Refunds and Cancellations */}
                  <section id="refunds-cancellations">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      8. Cancellations and Refund Policy
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                        <p className="text-amber-800 font-medium mb-2">
                          Important Note:
                        </p>
                        <p className="text-amber-700 text-sm">
                          EU withdrawal rights don't apply to transport bookings
                          for specific dates. Refunds are processed by GoBusly
                          based on your ticket's flex options.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">
                            Travel Flex Refunds
                          </h4>
                          <p className="text-blue-700 text-sm mb-3">
                            If you purchased Travel Flex with your ticket,
                            GoBusly will process your refund directly:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border border-blue-200">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Refund Amount
                              </h5>
                              <p className="text-blue-700 text-sm">
                                70% of the total ticket price paid
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-200">
                              <h5 className="font-medium text-blue-800 mb-2">
                                Time Limit
                              </h5>
                              <p className="text-blue-700 text-sm">
                                Within the days specified by your flex option
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Standard Tickets (No Travel Flex)
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Standard tickets without Travel Flex are subject to
                            the Carrier's cancellation policy, which varies by
                            operator and is typically more restrictive.
                          </p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Most standard tickets are non-refundable</li>
                            <li>
                              • Some operators may allow changes with fees
                            </li>
                            <li>
                              • Promotional tickets are usually non-refundable
                            </li>
                          </ul>
                        </div> */}

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Service Disruptions by Carrier
                          </h4>
                          <p className="text-gray-600 text-sm">
                            For cancellations or significant delays caused by
                            the Carrier, you may be entitled to full refunds or
                            alternative arrangements under EU passenger rights
                            legislation, regardless of flex options.
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">
                            Refund Processing
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>
                                • Travel Flex refunds processed within 14 days
                              </li>
                              <li>• Returned to original payment method</li>
                              <li>
                                • Automatic processing for eligible requests
                              </li>
                            </ul>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Service fees are not refunded</li>
                              <li>• Email confirmation sent upon processing</li>
                              <li>
                                • Customer support available for questions
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          How to Request a Refund
                        </h4>
                        <ol className="text-yellow-700 text-sm space-y-1">
                          <li>1. Log into your GoBusly account</li>
                          <li>2. Navigate to your booking details</li>
                          <li>
                            3. Click "Request Refund" (available for Travel Flex
                            tickets)
                          </li>
                          <li>
                            4. Confirm cancellation within your flex period
                          </li>
                          <li>
                            5. Receive email confirmation and refund within 14
                            days
                          </li>
                        </ol>
                      </div>
                    </div>
                  </section>

                  {/* Section 9: Carrier Responsibilities */}
                  <section id="carrier-responsibilities">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      9. Carrier Responsibilities and Service Issues
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        The bus operators (Carriers) are solely responsible for
                        the actual transportation service. This includes all
                        aspects of your journey experience.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Carrier Responsibilities:
                          </h3>
                          <div className="space-y-3">
                            {[
                              "Operating buses safely and punctually",
                              "Managing schedule changes and delays",
                              "Providing onboard services and amenities",
                              "Handling baggage and personal belongings",
                              "Ensuring passenger safety and comfort",
                              "Complying with EU passenger rights regulations",
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start p-3 bg-blue-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <p className="text-blue-800 text-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            For Service Issues:
                          </h3>
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <ol className="text-yellow-800 text-sm space-y-2">
                              <li>1. Contact the Carrier directly first</li>
                              <li>
                                2. Document the issue with photos/receipts
                              </li>
                              <li>
                                3. Request compensation per EU regulations
                              </li>
                              <li>4. Contact us if refund processing needed</li>
                              <li>
                                5. File complaints with national authorities if
                                unresolved
                              </li>
                            </ol>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-700 text-sm">
                              While we'll assist with refund processing and
                              provide carrier contact information, we cannot
                              directly resolve service-related issues as we're
                              not the transportation provider.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 10: Intellectual Property */}
                  <section id="intellectual-property">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      10. Intellectual Property Rights
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                        <p className="text-indigo-800 font-medium mb-2">
                          Platform Ownership:
                        </p>
                        <p className="text-indigo-700 text-sm">
                          All content, features, and functionality of the
                          GoBusly platform are owned by us or our licensors and
                          protected by copyright, trademark, and other IP laws.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            What You Can Do:
                          </h4>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Use the platform for personal bookings</li>
                            <li>• Download your tickets and receipts</li>
                            <li>
                              • Share trip information with travel companions
                            </li>
                            <li>• Access platform features as intended</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            What You Cannot Do:
                          </h4>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Copy, modify, or distribute our content</li>
                            <li>• Use our trademarks or branding</li>
                            <li>• Reverse engineer our platform</li>
                            <li>• Create derivative works</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 11: Limitation of Liability */}
                  <section id="limitation-liability">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      11. Limitation of Liability
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-red-800 font-medium mb-2">
                          Important Legal Notice:
                        </p>
                        <p className="text-red-700 text-sm">
                          Our liability is limited to the service fees you paid
                          to us. We are not responsible for transportation
                          services provided by Carriers.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Platform Services
                          </h4>
                          <p className="text-gray-600 text-sm">
                            We provide the platform "as-is" and make no
                            warranties about uninterrupted service, error-free
                            operation, or complete accuracy of information.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Transportation Issues
                          </h4>
                          <p className="text-gray-600 text-sm">
                            We're not liable for delays, cancellations, missed
                            connections, lost baggage, or any other
                            transportation-related issues - these are Carrier
                            responsibilities.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Maximum Liability
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Our total liability to you is limited to the service
                            fees you paid to us, excluding ticket prices paid to
                            Carriers.
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-medium mb-2">
                          Your Rights Remain Protected:
                        </p>
                        <p className="text-green-700 text-sm">
                          These limitations don't affect your statutory consumer
                          rights under EU law, which cannot be excluded or
                          restricted.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 12: Dispute Resolution */}
                  <section id="dispute-resolution">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      12. Governing Law and Dispute Resolution
                    </h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Governing Law
                          </h4>
                          <p className="text-gray-600 text-sm">
                            These Terms are governed by the laws of North
                            Macedonia, subject to mandatory consumer protection
                            laws of your residence.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Jurisdiction
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Disputes will be subject to North Macedonia courts,
                            unless your local consumer protection laws provide
                            otherwise.
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">
                          Alternative Dispute Resolution
                        </h4>
                        <p className="text-blue-700 text-sm mb-3">
                          Before pursuing legal action, we encourage using these
                          resolution options:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-blue-800 text-sm mb-1">
                              EU Online Dispute Resolution
                            </p>
                            <p className="text-blue-700 text-xs">
                              EU consumers can access the ODR platform at
                              ec.europa.eu/consumers/odr
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 text-sm mb-1">
                              Direct Resolution
                            </p>
                            <p className="text-blue-700 text-xs">
                              Contact our customer service team to resolve
                              issues amicably
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 13: Term Modifications */}
                  <section id="term-modifications">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      13. Modifications to These Terms
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We may update these Terms periodically to reflect
                        changes in our services, legal requirements, or business
                        practices.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            Notice of Changes
                          </h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>
                              • Posted on our platform 30 days before effective
                              date
                            </li>
                            <li>
                              • Email notification for significant changes
                            </li>
                            <li>
                              • Updated "Last Updated" date clearly displayed
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Your Options
                          </h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            <li>• Review changes during notice period</li>
                            <li>• Continue using = acceptance of new terms</li>
                            <li>• Stop using platform if you disagree</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 14: Contact Information */}
                  <section id="contact-information">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      14. Contact Information
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        For questions about these Terms of Service or our
                        platform, please contact us using the information below:
                      </p>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-4">
                          GoBusly L.L.C.
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-blue-800 mb-1">
                                Email Support:
                              </p>
                              <a
                                href="mailto:contact@gobusly.com"
                                className="text-blue-600 hover:underline"
                              >
                                contact@gobusly.com
                              </a>
                            </div>
                            <div>
                              <p className="font-medium text-blue-800 mb-1">
                                Phone:
                              </p>
                              <p className="text-blue-700">(+389) 70-250-259</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 mb-1">
                              Registered Address:
                            </p>
                            <address className="text-blue-700 not-italic text-sm">
                              254 Chapman Rd, Ste 208 #20780
                              <br />
                              Newark, Delaware 19702, US
                            </address>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">
                            Booking Issues
                          </h4>
                          <p className="text-green-700 text-sm">
                            Payment problems, ticket delivery, booking
                            modifications
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="font-medium text-purple-800 mb-2">
                            Travel Issues
                          </h4>
                          <p className="text-purple-700 text-sm">
                            Contact Carrier first, then us for refund assistance
                          </p>
                        </div>
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-2">
                            Legal Matters
                          </h4>
                          <p className="text-orange-700 text-sm">
                            Terms questions, privacy concerns, compliance issues
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-gray-500 text-sm text-center">
                    <span className="font-medium">Last Updated:</span> February
                    23, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
