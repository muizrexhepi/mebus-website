import React from "react";

export const metadata = {
  title: "GoBusly - Terms of Service",
  description:
    "Legal terms and conditions governing the use of GoBusly's bus ticket booking platform in compliance with EU regulations.",
  keywords:
    "GoBusly, Terms of Service, Legal Agreement, Bus Booking Terms, EU Compliance, User Rights",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Terms of Service",
    description:
      "Understanding your rights and obligations when using GoBusly's bus ticket booking platform.",
    url: "https://www.gobusly.com/legal/terms-of-service",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/terms-of-service-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Terms of Service",
      },
    ],
  },
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8">
          These Terms of Service ("Terms") constitute a legally binding
          agreement between you and GoBusly L.L.C ("we," "us," "our"),
          registered at 254 Chapman Rd, Ste 208 #20780, Newark, Delaware. These
          Terms govern your use of the GoBusly platform and services.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a href="#definitions" className="text-blue-600 hover:underline">
              Definitions
            </a>
          </li>
          <li>
            <a href="#acceptance" className="text-blue-600 hover:underline">
              Agreement to Terms
            </a>
          </li>
          <li>
            <a href="#service-scope" className="text-blue-600 hover:underline">
              Scope of Service
            </a>
          </li>
          <li>
            <a href="#user-rights" className="text-blue-600 hover:underline">
              User Rights and Obligations
            </a>
          </li>
          <li>
            <a href="#bookings" className="text-blue-600 hover:underline">
              Booking Process and Payments
            </a>
          </li>
          <li>
            <a href="#cancellations" className="text-blue-600 hover:underline">
              Cancellations and Refunds
            </a>
          </li>
          <li>
            <a
              href="#data-protection"
              className="text-blue-600 hover:underline"
            >
              Data Protection and Privacy
            </a>
          </li>
          <li>
            <a
              href="#intellectual-property"
              className="text-blue-600 hover:underline"
            >
              Intellectual Property
            </a>
          </li>
          <li>
            <a href="#liability" className="text-blue-600 hover:underline">
              Liability and Indemnification
            </a>
          </li>
          <li>
            <a
              href="#dispute-resolution"
              className="text-blue-600 hover:underline"
            >
              Dispute Resolution
            </a>
          </li>
          <li>
            <a href="#modifications" className="text-blue-600 hover:underline">
              Modifications to Terms
            </a>
          </li>
          <li>
            <a href="#contact" className="text-blue-600 hover:underline">
              Contact Information
            </a>
          </li>
        </ol>

        <section id="definitions" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              "Platform" refers to the GoBusly mobile application and website
            </li>
            <li>"Service" means the bus ticket booking and related services</li>
            <li>"User" means any person who accesses or uses the Platform</li>
            <li>
              "Carrier" means the bus operators providing transportation
              services
            </li>
            <li>
              "Booking" means a reservation for bus transportation services
            </li>
          </ul>
        </section>

        <section id="acceptance" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Agreement to Terms</h2>
          <p className="mb-4">By accessing or using the Platform, you:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Confirm you are at least 18 years old or have parental consent
            </li>
            <li>Accept these Terms in their entirety</li>
            <li>Agree to comply with all applicable laws and regulations</li>
            <li>Consent to our Privacy Policy and Cookie Policy</li>
          </ul>
        </section>

        <section id="service-scope" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Scope of Service</h2>
          <p className="mb-4">GoBusly provides:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>A platform for searching and comparing bus tickets</li>
            <li>Booking and payment processing services</li>
            <li>Customer support for booking-related issues</li>
            <li>Electronic ticket delivery</li>
          </ul>
          <p className="mt-4">
            We act as an intermediary between Users and Carriers. The
            transportation contract is between you and the Carrier.
          </p>
        </section>

        <section id="user-rights" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. User Rights and Obligations
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Your Rights:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Access and use the Platform's features</li>
              <li>Receive accurate booking information</li>
              <li>Access customer support</li>
              <li>
                Exercise your rights under applicable consumer protection laws
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Your Obligations:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate personal and payment information</li>
              <li>Maintain account security</li>
              <li>Comply with Carrier requirements and policies</li>
              <li>Not engage in fraudulent or harmful activities</li>
            </ul>
          </div>
        </section>

        <section id="bookings" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Booking Process and Payments
          </h2>
          <p className="mb-4">Booking Process:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              Bookings are subject to availability and Carrier confirmation
            </li>
            <li>Prices include VAT and mandatory fees</li>
            <li>Additional Carrier fees may apply</li>
            <li>Booking confirmation is sent via email</li>
          </ul>
          <p className="mb-4">Payments:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              We accept major credit/debit cards and selected payment methods
            </li>
            <li>Payments are processed securely through licensed providers</li>
            <li>All prices are in the displayed currency</li>
            <li>Platform service fees are clearly displayed before payment</li>
          </ul>
        </section>

        <section id="cancellations" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Cancellations and Refunds
          </h2>
          <p className="mb-4">Cancellation Rights:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              14-day cooling-off period for non-travel date specific bookings
            </li>
            <li>Carrier-specific cancellation policies apply</li>
            <li>Refunds processed within 14 days of cancellation</li>
            <li>Service fees may be non-refundable</li>
          </ul>
          <p>
            For date-specific travel services, special cancellation terms apply
            in accordance with EU Directive 2011/83/EU.
          </p>
        </section>

        <section id="data-protection" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Data Protection and Privacy
          </h2>
          <p className="mb-4">We process personal data in accordance with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The General Data Protection Regulation (GDPR)</li>
            <li>Our Privacy Policy</li>
            <li>Applicable national data protection laws</li>
            <li>Data processing agreements with Carriers</li>
          </ul>
        </section>

        <section id="intellectual-property" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Intellectual Property
          </h2>
          <p className="mb-4">
            All Platform content, including but not limited to software,
            designs, text, and graphics, is protected by intellectual property
            rights owned by or licensed to GoBusly. Users receive a limited,
            non-transferable license to use the Platform for its intended
            purpose.
          </p>
        </section>

        <section id="liability" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Liability and Indemnification
          </h2>
          <p className="mb-4">Our Liability:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>We are liable for our Platform's functionality</li>
            <li>Not liable for Carrier service delivery</li>
            <li>Limitation of liability as permitted by law</li>
            <li>Force majeure exclusions apply</li>
          </ul>
          <p>
            These limitations do not affect your statutory rights as a consumer.
          </p>
        </section>

        <section id="dispute-resolution" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            10. Dispute Resolution
          </h2>
          <p className="mb-4">
            Any disputes shall be resolved in accordance with EU consumer
            protection laws. You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access the EU Online Dispute Resolution platform</li>
            <li>Contact your local consumer protection authority</li>
            <li>Pursue legal action in your country of residence</li>
          </ul>
        </section>

        <section id="modifications" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            11. Modifications to Terms
          </h2>
          <p className="mb-4">
            We may modify these Terms with prior notice. Material changes will
            be notified 30 days in advance. Continued use after modifications
            constitutes acceptance of updated Terms.
          </p>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            12. Contact Information
          </h2>
          <p className="mb-4">For legal inquiries:</p>
          <p>GoBusly Legal Department</p>
          <p>Email: legal@gobusly.com</p>
          <p>Address: 254 Chapman Rd, Ste 208 #20780, Newark, Delaware</p>
          <p>Phone: (+389) 70-250-259</p>
          <p className="mt-4">
            For immediate assistance, contact our customer support through the
            Platform.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> February 23, 2025
          </p>
          <p className="mt-4">
            These Terms are available in multiple languages. In case of
            discrepancies, the English version prevails.
          </p>
        </div>
      </div>
    </div>
  );
}
