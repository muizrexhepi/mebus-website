import React from "react";

export const metadata = {
  title: "GoBusly - Privacy Policy",
  description:
    "GoBusly's GDPR-compliant privacy policy detailing how we process, protect, and manage your personal data when using our bus ticket booking service.",
  keywords:
    "GoBusly, Privacy Policy, GDPR Compliance, Data Protection, Personal Data Processing, Bus Booking",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Privacy Policy",
    description:
      "Learn how GoBusly processes and protects your personal data in compliance with GDPR regulations.",
    url: "https://www.gobusly.com/legal/privacy-policy",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/privacy-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Privacy Policy",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8 text-gray-700">
          At GoBusly ("we," "us," or "our"), your privacy is a top priority.
          This Privacy Policy explains how we collect, use, and protect your
          personal data in compliance with the General Data Protection
          Regulation (GDPR) and other applicable data protection laws. By using
          our bus ticket booking platform and services, you agree to the
          practices described in this policy.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8 text-gray-700">
          <li>
            <a
              href="#data-controller-info"
              className="text-blue-600 hover:underline"
            >
              Who We Are: Data Controller
            </a>
          </li>
          <li>
            <a
              href="#personal-data-collected"
              className="text-blue-600 hover:underline"
            >
              Personal Data We Collect
            </a>
          </li>
          <li>
            <a
              href="#how-we-use-data"
              className="text-blue-600 hover:underline"
            >
              How and Why We Use Your Data
            </a>
          </li>
          <li>
            <a
              href="#legal-basis-processing"
              className="text-blue-600 hover:underline"
            >
              Legal Basis for Processing Your Data
            </a>
          </li>
          <li>
            <a href="#data-sharing" className="text-blue-600 hover:underline">
              How and With Whom We Share Your Data
            </a>
          </li>
          <li>
            <a
              href="#data-security-measures"
              className="text-blue-600 hover:underline"
            >
              Data Security
            </a>
          </li>
          <li>
            <a
              href="#data-retention-period"
              className="text-blue-600 hover:underline"
            >
              Data Retention
            </a>
          </li>
          <li>
            <a href="#your-rights" className="text-blue-600 hover:underline">
              Your Data Protection Rights
            </a>
          </li>
          <li>
            <a href="#cookies" className="text-blue-600 hover:underline">
              Cookies and Tracking Technologies
            </a>
          </li>
          <li>
            <a href="#policy-changes" className="text-blue-600 hover:underline">
              Changes to This Policy
            </a>
          </li>
          <li>
            <a href="#contact-us" className="text-blue-600 hover:underline">
              Contact Us
            </a>
          </li>
        </ol>

        <section id="data-controller-info" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            1. Who We Are: Data Controller
          </h2>
          <p className="mb-4 text-gray-700">
            GoBusly L.L.C. is the data controller for the personal data we
            process. This means we are responsible for determining the purposes
            and means of the processing of your data.
          </p>
          <p className="text-gray-700">
            Our registered office is located at:
            <br />
            254 Chapman Rd, Ste 208 #20780
            <br />
            Newark, Delaware 19702, US
          </p>
        </section>

        <section id="personal-data-collected" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            2. Personal Data We Collect
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Information You Provide Directly
            </h3>
            <p className="text-gray-700">
              When you use our platform, you may provide us with the following
              personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              <li>
                <strong>Identity and Contact Data:</strong> Your name, email
                address, and phone number, which are essential for booking and
                communication.
              </li>
              <li>
                <strong>Financial Data:</strong> We collect payment information
                to process your transactions. This data is securely handled by
                our payment service provider and is not stored on our servers.
              </li>
              <li>
                <strong>Travel Data:</strong> Details of your bus journey,
                including the departure and destination, date of travel, and any
                travel preferences or special requests you make.
              </li>
              <li>
                <strong>Communications Data:</strong> Information you provide
                when you contact our customer support team.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Information Collected Automatically
            </h3>
            <p className="text-gray-700">
              When you visit our website, we may automatically collect certain
              information from your device, including:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              <li>
                <strong>Technical Data:</strong> Your IP address, browser type
                and version, time zone setting, operating system, and platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                website, such as the pages you visit, the duration of your
                session, and the referral source.
              </li>
            </ul>
          </div>
        </section>

        <section id="how-we-use-data" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            3. How and Why We Use Your Data
          </h2>
          <p className="mb-4 text-gray-700">
            We use your personal data for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Service Provision:</strong> To process your bus ticket
              bookings, issue tickets, and manage your journey.
            </li>
            <li>
              <strong>Payment Processing:</strong> To securely handle your
              transactions and prevent fraudulent activities.
            </li>
            <li>
              <strong>Customer Support:</strong> To communicate with you and
              provide assistance regarding your bookings or any inquiries.
            </li>
            <li>
              <strong>Service Improvement:</strong> To analyze how our services
              are used and to enhance the functionality, user experience, and
              performance of our platform.
            </li>
            <li>
              <strong>Marketing:</strong> With your consent, to send you
              promotional communications, updates, and special offers.
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with legal
              obligations and to protect our rights and the rights of our users.
            </li>
          </ul>
        </section>

        <section id="legal-basis-processing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            4. Legal Basis for Processing Your Data
          </h2>
          <p className="mb-4 text-gray-700">
            We only process your personal data when we have a valid legal basis
            to do so, as defined by the GDPR:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Contractual Necessity:</strong> Processing is necessary to
              fulfill our contract with you (e.g., to issue a ticket for a
              booking you made).
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Processing is necessary for
              our legitimate interests, such as improving our services, ensuring
              platform security, and preventing fraud. We always balance our
              interests against your rights and freedoms.
            </li>
            <li>
              <strong>Legal Obligation:</strong> Processing is necessary to
              comply with legal requirements (e.g., maintaining transaction
              records for tax and accounting purposes).
            </li>
            <li>
              <strong>Consent:</strong> When you provide your explicit consent
              for a specific purpose, such as for receiving marketing emails.
              You have the right to withdraw your consent at any time.
            </li>
          </ul>
        </section>

        <section id="data-sharing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            5. How and With Whom We Share Your Data
          </h2>
          <p className="mb-4 text-gray-700">
            We do not sell your personal data. We only share it with trusted
            third parties as necessary to provide our services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Bus Operators:</strong> We share essential booking
              information with the bus operator you have selected to ensure your
              ticket is valid and your journey can be fulfilled.
            </li>
            <li>
              <strong>Payment Processors:</strong> We use secure, third-party
              payment processors to handle your payment information.
            </li>
            <li>
              <strong>Cloud Service Providers:</strong> We use cloud-based
              services to host our platform and store data, primarily within the
              European Union.
            </li>
            <li>
              <strong>Legal Authorities:</strong> We may share your data with
              government and law enforcement bodies when required by law or to
              protect our legal rights.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            For transfers of data outside of the EU/EEA, we ensure that
            appropriate safeguards are in place, such as Standard Contractual
            Clauses, to guarantee the security and privacy of your personal
            data.
          </p>
        </section>

        <section id="data-security-measures" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            6. Data Security
          </h2>
          <p className="mb-4 text-gray-700">
            We are committed to protecting your personal data and have
            implemented appropriate technical and organizational security
            measures to prevent unauthorized access, loss, or alteration. These
            measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Secure encryption for data transmission (SSL/TLS).</li>
            <li>
              Access controls and authentication protocols to limit who can view
              your data.
            </li>
            <li>
              Regular security assessments and employee training on data
              protection.
            </li>
          </ul>
        </section>

        <section id="data-retention-period" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            7. Data Retention
          </h2>
          <p className="mb-4 text-gray-700">
            We will only retain your personal data for as long as necessary to
            fulfill the purposes for which it was collected, including for
            satisfying any legal, accounting, or reporting requirements.
            Typically, we retain:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Account Information:</strong> For the duration of your
              active account, plus a reasonable period afterward to allow for
              account recovery or to meet legal obligations.
            </li>
            <li>
              <strong>Booking Records:</strong> For up to 7 years, as required
              by accounting and tax laws.
            </li>
          </ul>
        </section>

        <section id="your-rights" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            8. Your Data Protection Rights
          </h2>
          <p className="mb-4 text-gray-700">
            Under the GDPR, you have the following rights regarding your
            personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Right to Access:</strong> You can request a copy of the
              personal data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You can ask us to correct
              any inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You can request the deletion of
              your personal data ("the right to be forgotten").
            </li>
            <li>
              <strong>Right to Restriction of Processing:</strong> You can ask
              us to temporarily stop processing your data.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You can request your
              data in a structured, commonly used, and machine-readable format.
            </li>
            <li>
              <strong>Right to Object:</strong> You can object to the processing
              of your data, especially for direct marketing purposes.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> If we rely on your
              consent to process your data, you can withdraw it at any time.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            To exercise any of these rights, please contact us using the details
            provided in the "Contact Us" section below.
          </p>
        </section>

        <section id="cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            9. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4 text-gray-700">
            We use cookies and similar technologies to enhance your user
            experience, improve our services, and analyze website usage. Cookies
            are small text files stored on your device that help us recognize
            you when you return to our site.
          </p>
          <p className="mb-4 text-gray-700">
            We use the following types of cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Essential Cookies:</strong> These are necessary for the
              website to function properly.
            </li>
            <li>
              <strong>Performance and Analytics Cookies:</strong> These help us
              understand how our site is being used, so we can make
              improvements. We use tools like Google Analytics for this purpose.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            You can manage or disable cookies through your browser settings.
            Please note that disabling certain cookies may impact the
            functionality of our website. For more details on how we use
            cookies, please see our dedicated{" "}
            <a
              href="/legal/cookie-policy"
              className="text-blue-600 hover:underline"
            >
              Cookie Policy
            </a>
            .
          </p>
        </section>

        <section id="policy-changes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            10. Changes to This Policy
          </h2>
          <p className="mb-4 text-gray-700">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any significant changes by
            posting the new policy on our website and updating the "Last
            Updated" date at the bottom of this page. Your continued use of our
            services constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section id="contact-us" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            11. Contact Us
          </h2>
          <p className="mb-4 text-gray-700">
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact our Data Protection Officer at:
          </p>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:contact@gobusly.com"
              className="text-blue-600 hover:underline"
            >
              contact@gobusly.com
            </a>
            <br />
            Phone: (+389) 70-250-259
          </p>
          <p className="mt-4 text-gray-700">
            You also have the right to lodge a complaint with your local data
            protection authority if you believe we have not adequately addressed
            your privacy concerns.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            <strong>Last Updated:</strong> February 23, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
