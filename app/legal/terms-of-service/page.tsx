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
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Terms of Service
      </h1>
      <div className="max-w-4xl mx-auto text-gray-700">
        <p className="mb-8">
          These Terms of Service ("Terms") constitute a legally binding
          agreement between you ("User," "you") and GoBusly L.L.C. ("GoBusly,"
          "we," "us," "our"), a company registered at 254 Chapman Rd, Ste 208
          #20780, Newark, Delaware. These Terms govern your access to and use of
          the GoBusly platform and services, available via our website and
          mobile application (collectively, the "Platform").
        </p>
        <p className="mb-8">
          Please read these Terms carefully before using our Platform. By
          accessing or using any part of the Platform, you agree to be bound by
          these Terms and our Privacy Policy. If you do not agree to all the
          terms and conditions, you may not access the Platform or use any
          services.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900" id="toc">
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
              Scope of Service and Our Role
            </a>
          </li>
          <li>
            <a
              href="#user-obligations"
              className="text-blue-600 hover:underline"
            >
              User Obligations
            </a>
          </li>
          <li>
            <a href="#bookings" className="text-blue-600 hover:underline">
              Booking Process and Payments
            </a>
          </li>
          <li>
            <a href="#cancellations" className="text-blue-600 hover:underline">
              Cancellations, Refunds, and Consumer Rights
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
            <a href="#disclaimer" className="text-blue-600 hover:underline">
              Disclaimer of Warranties
            </a>
          </li>
          <li>
            <a href="#liability" className="text-blue-600 hover:underline">
              Limitation of Liability and Indemnification
            </a>
          </li>
          <li>
            <a
              href="#dispute-resolution"
              className="text-blue-600 hover:underline"
            >
              Governing Law and Dispute Resolution
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            1. Definitions
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              "Platform" refers to the GoBusly mobile application and website,
              along with all associated services.
            </li>
            <li>
              "Service" means the bus ticket booking, payment processing, and
              related services provided by GoBusly.
            </li>
            <li>
              "User" means any person who accesses, browses, or uses the
              Platform.
            </li>
            <li>
              "Carrier" means the third-party bus operator or transportation
              provider who offers and performs the actual transportation
              services.
            </li>
            <li>
              "Booking" means a confirmed reservation for a transportation
              service, made by a User through the Platform.
            </li>
          </ul>
        </section>

        <section id="acceptance" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            2. Agreement to Terms
          </h2>
          <p className="mb-4">
            By accessing or using the Platform, you acknowledge and agree that:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              You are at least 18 years old or have legal parental/guardian
              consent to use the Service.
            </li>
            <li>
              You have read, understood, and accept these Terms in their
              entirety.
            </li>
            <li>
              You agree to comply with all applicable laws and regulations,
              including those of your country of residence and the countries of
              travel.
            </li>
            <li>
              You consent to our Privacy Policy and Cookie Policy, which
              describe how we collect, use, and protect your data.
            </li>
          </ul>
        </section>

        <section id="service-scope" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            3. Scope of Service and Our Role
          </h2>
          <p className="mb-4">
            GoBusly operates as a booking platform and an intermediary for bus
            ticket sales. We are not a bus or coach operator. Our Service is
            limited to providing a Platform that facilitates the search,
            comparison, and purchase of bus tickets on behalf of third-party
            Carriers.
          </p>
          <p className="mb-4">
            The transportation contract is concluded directly between you and
            the respective Carrier.
          </p>
          <p className="mb-4 font-semibold text-gray-800">
            Our responsibilities as the merchant of record include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Processing your ticket purchase and payment securely.</li>
            <li>
              Delivering a confirmed electronic ticket to your provided email.
            </li>
            <li>
              Providing customer support for issues related to the booking
              process (e.g., payment errors, ticket delivery).
            </li>
            <li>
              Processing refunds for tickets in accordance with our terms and
              the policies of the Carrier.
            </li>
          </ul>
          <p className="mt-4">
            Conversely, all responsibilities and liabilities related to the
            actual transportation service rest <b>solely with the Carrier.</b>{" "}
            This includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>The performance of the bus journey.</li>
            <li>Timeliness of departures and arrivals.</li>
            <li>Handling of delays, cancellations, or missed connections.</li>
            <li>Baggage handling and loss or damage to personal belongings.</li>
            <li>The safety and comfort of passengers during the journey.</li>
            <li>
              Compliance with all applicable laws and regulations, including{" "}
              <span className="font-semibold text-gray-800">
                EU Regulation (EU) No 181/2011 concerning the rights of
                passengers in bus and coach transport
              </span>
              , which applies to scheduled services of 250 km or more.
            </li>
          </ul>
          <p className="mt-4">
            For any claims regarding delays, cancellations, or service-related
            issues, you must first direct your inquiries to the Carrier.
            However, <b>all refunds will be processed by GoBusly,</b> in
            accordance with the Carrier's refund policy and our own terms.
          </p>
        </section>

        <section id="user-obligations" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            4. User Obligations
          </h2>
          <p className="mb-4">You agree to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Provide accurate, current, and complete information when making a
              booking or creating an account.
            </li>
            <li>
              Maintain the confidentiality and security of your account
              credentials.
            </li>
            <li>
              Comply with all rules and regulations of the Carrier, including
              check-in procedures, baggage policies, and conduct during travel.
            </li>
            <li>
              Use the Platform for lawful purposes only and not engage in any
              activities that may harm the Platform or its users.
            </li>
            <li>
              Refrain from unauthorized access to the Platform, including but
              not limited to data scraping, bot usage, or any form of automated
              access without our prior written consent.
            </li>
          </ul>
        </section>

        <section id="bookings" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            5. Booking Process and Payments
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              All bookings are subject to availability and final confirmation by
              the Carrier.
            </li>
            <li>
              All prices displayed on the Platform are inclusive of Value Added
              Tax (VAT) and any mandatory fees. Any additional fees imposed by
              the Carrier (e.g., for extra luggage) are your responsibility.
            </li>
            <li>
              We accept payments via major credit/debit cards and other select
              payment methods as indicated on the Platform. All payments are
              processed securely through licensed third-party payment providers.
            </li>
            <li>
              A Platform service fee may be applied to your booking, which will
              be clearly displayed before you complete your payment.
            </li>
          </ul>
        </section>

        <section id="cancellations" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            6. Cancellations, Refunds, and Consumer Rights
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              Your right to a refund is governed by the specific cancellation
              and refund policy of the respective Carrier, as detailed during
              the booking process.
            </li>
            <li>
              For bookings of a specific date or period (e.g., bus tickets for a
              fixed travel date), the right of withdrawal under EU Directive
              2011/83/EU does not apply.
            </li>
            <li>
              GoBusly's service fee is generally non-refundable unless otherwise
              stated.
            </li>
            <li>
              Any refunds will be processed within a reasonable time frame,
              typically within 14 days of a confirmed cancellation.
            </li>
          </ul>
        </section>

        <section id="data-protection" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            7. Data Protection and Privacy
          </h2>
          <p className="mb-4">
            We are committed to protecting your privacy. We collect and process
            your personal data in accordance with:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>The General Data Protection Regulation (GDPR)</li>
            <li>Our Privacy Policy</li>
            <li>Applicable national data protection laws</li>
          </ul>
          <p className="mt-4">
            By using the Platform, you consent to the processing of your data as
            described in our Privacy Policy.
          </p>
        </section>

        <section id="intellectual-property" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            8. Intellectual Property
          </h2>
          <p className="mb-4">
            All content on the Platform, including but not limited to software,
            designs, text, graphics, logos, and trademarks, is the intellectual
            property of GoBusly or its licensors and is protected by copyright,
            trademark, and other intellectual property laws. You are granted a
            limited, non-exclusive, non-transferable license to use the Platform
            for personal, non-commercial purposes only.
          </p>
        </section>

        <section id="disclaimer" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            9. Disclaimer of Warranties
          </h2>
          <p className="mb-4">
            The Platform is provided on an "as-is" and "as-available" basis. To
            the fullest extent permitted by law, GoBusly disclaims all
            warranties, express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Platform will be
            uninterrupted, error-free, or secure.
          </p>
        </section>

        <section id="liability" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            10. Limitation of Liability and Indemnification
          </h2>
          <p className="mb-4">
            GoBusly's liability for any damages arising from your use of the
            Platform is limited to the amount of the Platform service fees you
            paid. We shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from the use or
            inability to use the Platform.
          </p>
          <p className="mb-4">
            You agree to indemnify and hold GoBusly, its affiliates, and their
            respective officers, agents, and employees harmless from any claims,
            damages, or expenses arising from your violation of these Terms or
            your use of the Service.
          </p>
          <p className="mt-4">
            These limitations do not affect your statutory rights as a consumer
            under EU law, which cannot be excluded.
          </p>
        </section>

        <section id="dispute-resolution" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            11. Governing Law and Dispute Resolution
          </h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of the Republic of North Macedonia.
          </p>
          <p className="mb-4">
            Any dispute, controversy, or claim arising out of or in connection
            with these Terms shall be subject to the exclusive jurisdiction of
            the courts of North Macedonia.
          </p>
          <p>
            As a consumer, you may have the right to access alternative dispute
            resolution (ADR) or the EU's Online Dispute Resolution (ODR)
            platform.
          </p>
        </section>

        <section id="modifications" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            12. Modifications to Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will
            provide notice of any material changes by posting the updated Terms
            on the Platform at least 30 days before they become effective. Your
            continued use of the Platform after the effective date constitutes
            your acceptance of the updated Terms.
          </p>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            13. Contact Information
          </h2>
          <p className="mb-4">
            For any legal or service-related questions, please contact us at:
          </p>
          <p>
            <strong>GoBusly L.L.C.</strong>
            <br />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@gobusly.com"
              className="text-blue-600 hover:underline"
            >
              contact@gobusly.com
            </a>
            <br />
            <strong>Address:</strong> 254 Chapman Rd, Ste 208 #20780, Newark,
            Delaware
            <br />
            <strong>Phone:</strong> (+389) 70-250-259
          </p>
          <p className="mt-4">
            For general customer support, please use the contact form within the
            Platform.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            <strong>Last Updated:</strong> August 18, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
