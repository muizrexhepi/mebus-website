"use client";
import React, { useState, useEffect } from "react";

export default function PrivacyPolicyClient() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Your privacy matters to us. This policy explains how we collect,
            use, and protect your personal data when you use GoBusly's services.
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
                    { id: "data-controller-info", title: "1. Data Controller" },
                    {
                      id: "personal-data-collected",
                      title: "2. Data Collection",
                    },
                    { id: "how-we-use-data", title: "3. How We Use Data" },
                    { id: "legal-basis-processing", title: "4. Legal Basis" },
                    { id: "data-sharing", title: "5. Data Sharing" },
                    { id: "data-security-measures", title: "6. Security" },
                    { id: "data-retention-period", title: "7. Data Retention" },
                    { id: "your-rights", title: "8. Your Rights" },
                    { id: "cookies", title: "9. Cookies" },
                    { id: "policy-changes", title: "10. Policy Changes" },
                    { id: "contact-us", title: "11. Contact Us" },
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
                  <p className="text-gray-700 leading-relaxed">
                    At GoBusly ("we," "us," or "our"), your privacy is a top
                    priority. This Privacy Policy explains how we collect, use,
                    and protect your personal data in compliance with the
                    General Data Protection Regulation (GDPR) and other
                    applicable data protection laws. By using our bus ticket
                    booking platform and services, you agree to the practices
                    described in this policy.
                  </p>
                </div>

                <div className="space-y-12">
                  {/* Section 1 */}
                  <section id="data-controller-info">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      1. Who We Are: Data Controller
                    </h2>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        GoBusly L.L.C. is the data controller for the personal
                        data we process. This means we are responsible for
                        determining the purposes and means of the processing of
                        your data.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-gray-700 font-medium mb-2">
                          Our registered office:
                        </p>
                        <address className="text-gray-600 not-italic">
                          254 Chapman Rd, Ste 208 #20780
                          <br />
                          Newark, Delaware 19702, US
                        </address>
                      </div>
                    </div>
                  </section>

                  {/* Section 2 */}
                  <section id="personal-data-collected">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      2. Personal Data We Collect
                    </h2>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Information You Provide Directly
                        </h3>
                        <p className="text-gray-700 mb-4">
                          When you use our platform, you may provide us with the
                          following personal data:
                        </p>
                        <div className="grid gap-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Identity and Contact Data
                            </h4>
                            <p className="text-gray-600">
                              Your name, email address, and phone number, which
                              are essential for booking and communication.
                            </p>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Financial Data
                            </h4>
                            <p className="text-gray-600">
                              We collect payment information to process your
                              transactions. This data is securely handled by our
                              payment service provider and is not stored on our
                              servers.
                            </p>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Travel Data
                            </h4>
                            <p className="text-gray-600">
                              Details of your bus journey, including the
                              departure and destination, date of travel, and any
                              travel preferences or special requests you make.
                            </p>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Communications Data
                            </h4>
                            <p className="text-gray-600">
                              Information you provide when you contact our
                              customer support team.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Information Collected Automatically
                        </h3>
                        <p className="text-gray-700 mb-4">
                          When you visit our website, we may automatically
                          collect certain information from your device,
                          including:
                        </p>
                        <div className="grid gap-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Technical Data
                            </h4>
                            <p className="text-gray-600">
                              Your IP address, browser type and version, time
                              zone setting, operating system, and platform.
                            </p>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Usage Data
                            </h4>
                            <p className="text-gray-600">
                              Information about how you use our website, such as
                              the pages you visit, the duration of your session,
                              and the referral source.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 3 */}
                  <section id="how-we-use-data">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      3. How and Why We Use Your Data
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We use your personal data for the following purposes:
                    </p>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Service Provision",
                          desc: "To process your bus ticket bookings, issue tickets, and manage your journey.",
                        },
                        {
                          title: "Payment Processing",
                          desc: "To securely handle your transactions and prevent fraudulent activities.",
                        },
                        {
                          title: "Customer Support",
                          desc: "To communicate with you and provide assistance regarding your bookings or any inquiries.",
                        },
                        {
                          title: "Service Improvement",
                          desc: "To analyze how our services are used and to enhance the functionality, user experience, and performance of our platform.",
                        },
                        {
                          title: "Marketing",
                          desc: "With your consent, to send you promotional communications, updates, and special offers.",
                        },
                        {
                          title: "Legal Compliance",
                          desc: "To comply with legal obligations and to protect our rights and the rights of our users.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 4 */}
                  <section id="legal-basis-processing">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      4. Legal Basis for Processing Your Data
                    </h2>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                      <p className="text-amber-800 font-medium">
                        GDPR Compliance
                      </p>
                      <p className="text-amber-700">
                        We only process your personal data when we have a valid
                        legal basis to do so, as defined by the GDPR.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Contractual Necessity",
                          desc: "Processing is necessary to fulfill our contract with you (e.g., to issue a ticket for a booking you made).",
                        },
                        {
                          title: "Legitimate Interests",
                          desc: "Processing is necessary for our legitimate interests, such as improving our services, ensuring platform security, and preventing fraud. We always balance our interests against your rights and freedoms.",
                        },
                        {
                          title: "Legal Obligation",
                          desc: "Processing is necessary to comply with legal requirements (e.g., maintaining transaction records for tax and accounting purposes).",
                        },
                        {
                          title: "Consent",
                          desc: "When you provide your explicit consent for a specific purpose, such as for receiving marketing emails. You have the right to withdraw your consent at any time.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 5 */}
                  <section id="data-sharing">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      5. How and With Whom We Share Your Data
                    </h2>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                      <p className="text-green-800 font-medium">
                        We do not sell your personal data
                      </p>
                      <p className="text-green-700">
                        We only share it with trusted third parties as necessary
                        to provide our services.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Bus Operators",
                          desc: "We share essential booking information with the bus operator you have selected to ensure your ticket is valid and your journey can be fulfilled.",
                        },
                        {
                          title: "Payment Processors",
                          desc: "We use secure, third-party payment processors to handle your payment information.",
                        },
                        {
                          title: "Cloud Service Providers",
                          desc: "We use cloud-based services to host our platform and store data, primarily within the European Union.",
                        },
                        {
                          title: "Legal Authorities",
                          desc: "We may share your data with government and law enforcement bodies when required by law or to protect our legal rights.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 font-medium mb-2">
                        International Transfers
                      </p>
                      <p className="text-gray-600">
                        For transfers of data outside of the EU/EEA, we ensure
                        that appropriate safeguards are in place, such as
                        Standard Contractual Clauses, to guarantee the security
                        and privacy of your personal data.
                      </p>
                    </div>
                  </section>

                  {/* Section 6 */}
                  <section id="data-security-measures">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      6. Data Security
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We are committed to protecting your personal data and have
                      implemented appropriate technical and organizational
                      security measures to prevent unauthorized access, loss, or
                      alteration. These measures include:
                    </p>
                    <div className="grid gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-900">
                          🔒 Secure encryption for data transmission (SSL/TLS)
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-900">
                          🛡️ Access controls and authentication protocols to
                          limit who can view your data
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-900">
                          📊 Regular security assessments and employee training
                          on data protection
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 7 */}
                  <section id="data-retention-period">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      7. Data Retention
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We will only retain your personal data for as long as
                      necessary to fulfill the purposes for which it was
                      collected, including for satisfying any legal, accounting,
                      or reporting requirements. Typically, we retain:
                    </p>
                    <div className="grid gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Account Information
                        </h4>
                        <p className="text-gray-600">
                          For the duration of your active account, plus a
                          reasonable period afterward to allow for account
                          recovery or to meet legal obligations.
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Booking Records
                        </h4>
                        <p className="text-gray-600">
                          For up to 7 years, as required by accounting and tax
                          laws.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 8 */}
                  <section id="your-rights">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      8. Your Data Protection Rights
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Under the GDPR, you have the following rights regarding
                      your personal data:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Right to Access",
                          desc: "You can request a copy of the personal data we hold about you.",
                        },
                        {
                          title: "Right to Rectification",
                          desc: "You can ask us to correct any inaccurate or incomplete data.",
                        },
                        {
                          title: "Right to Erasure",
                          desc: 'You can request the deletion of your personal data ("the right to be forgotten").',
                        },
                        {
                          title: "Right to Restriction of Processing",
                          desc: "You can ask us to temporarily stop processing your data.",
                        },
                        {
                          title: "Right to Data Portability",
                          desc: "You can request your data in a structured, commonly used, and machine-readable format.",
                        },
                        {
                          title: "Right to Object",
                          desc: "You can object to the processing of your data, especially for direct marketing purposes.",
                        },
                      ].map((right, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
                        >
                          <h4 className="font-semibold text-blue-900 mb-2">
                            {right.title}
                          </h4>
                          <p className="text-blue-700 text-sm">{right.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800">
                        To exercise any of these rights, please contact us using
                        the details provided in the "Contact Us" section below.
                      </p>
                    </div>
                  </section>

                  {/* Section 9 */}
                  <section id="cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      9. Cookies and Tracking Technologies
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We use cookies and similar technologies to enhance your
                        user experience, improve our services, and analyze
                        website usage. Cookies are small text files stored on
                        your device that help us recognize you when you return
                        to our site.
                      </p>
                      <div className="grid gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Essential Cookies
                          </h4>
                          <p className="text-gray-600">
                            These are necessary for the website to function
                            properly.
                          </p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Performance and Analytics Cookies
                          </h4>
                          <p className="text-gray-600">
                            These help us understand how our site is being used,
                            so we can make improvements. We use tools like
                            Google Analytics for this purpose.
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">
                          You can manage or disable cookies through your browser
                          settings. Please note that disabling certain cookies
                          may impact the functionality of our website. For more
                          details on how we use cookies, please see our
                          dedicated{" "}
                          <a
                            href="/legal/cookie-policy"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Cookie Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 10 */}
                  <section id="policy-changes">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      10. Changes to This Policy
                    </h2>
                    <p className="text-gray-700">
                      We may update this Privacy Policy from time to time to
                      reflect changes in our practices or for other operational,
                      legal, or regulatory reasons. We will notify you of any
                      significant changes by posting the new policy on our
                      website and updating the "Last Updated" date at the bottom
                      of this page. Your continued use of our services
                      constitutes your acceptance of the updated policy.
                    </p>
                  </section>

                  {/* Section 11 */}
                  <section id="contact-us">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      11. Contact Us
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        If you have any questions or concerns about this Privacy
                        Policy or our data practices, please contact our Data
                        Protection Officer at:
                      </p>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-3">
                          Data Protection Officer
                        </h3>
                        <div className="space-y-2 text-blue-800">
                          <p>
                            Email:{" "}
                            <a
                              href="mailto:contact@gobusly.com"
                              className="underline hover:text-blue-600"
                            >
                              contact@gobusly.com
                            </a>
                          </p>
                          <p>Phone: (+389) 70-250-259</p>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800">
                          You also have the right to lodge a complaint with your
                          local data protection authority if you believe we have
                          not adequately addressed your privacy concerns.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-500 text-sm">
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
