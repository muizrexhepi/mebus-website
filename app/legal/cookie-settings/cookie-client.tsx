"use client";
import React, { useState, useEffect } from "react";

export default function CookiePolicyClient() {
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
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Learn how GoBusly uses cookies and similar technologies to enhance
            your browsing experience and improve our bus booking platform.
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
                    { id: "what-are-cookies", title: "1. What Are Cookies?" },
                    {
                      id: "why-we-use-cookies",
                      title: "2. Why We Use Cookies",
                    },
                    { id: "types-of-cookies", title: "3. Cookie Types" },
                    { id: "essential-cookies", title: "4. Essential Cookies" },
                    { id: "analytics-cookies", title: "5. Analytics Cookies" },
                    { id: "marketing-cookies", title: "6. Marketing Cookies" },
                    {
                      id: "third-party-cookies",
                      title: "7. Third-Party Cookies",
                    },
                    { id: "managing-cookies", title: "8. Managing Cookies" },
                    { id: "cookie-consent", title: "9. Cookie Consent" },
                    { id: "policy-updates", title: "10. Policy Updates" },
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
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This Cookie Policy explains how GoBusly L.L.C. uses cookies
                    and similar technologies when you visit our website or use
                    our bus booking services. We'll explain what these
                    technologies are, why we use them, and your rights to
                    control their use.
                  </p>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium mb-2">
                      Quick Summary:
                    </p>
                    <p className="text-sm text-blue-800">
                      We use cookies to make our platform work, remember your
                      preferences, analyze performance, and show you relevant
                      content. You can control which cookies we use through your
                      browser settings or our cookie banner.
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  {/* Section 1: What Are Cookies */}
                  <section id="what-are-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      1. What Are Cookies?
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        Cookies are small text files that websites place on your
                        device (computer, smartphone, or tablet) when you visit
                        them. They help websites remember information about your
                        visit, making your next visit easier and the site more
                        useful to you.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h3 className="font-semibold text-green-800 mb-3">
                            What Cookies Do:
                          </h3>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Remember your login status</li>
                            <li>• Store your language preferences</li>
                            <li>• Keep items in your booking cart</li>
                            <li>• Help us analyze how you use our site</li>
                            <li>• Show you relevant advertisements</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h3 className="font-semibold text-blue-800 mb-3">
                            Similar Technologies:
                          </h3>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Local storage for offline functionality</li>
                            <li>• Pixel tags for email tracking</li>
                            <li>• Web beacons for analytics</li>
                            <li>• Session storage for temporary data</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Why We Use Cookies */}
                  <section id="why-we-use-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      2. Why We Use Cookies
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We use cookies to provide you with the best possible
                        experience on our platform. Here are the main purposes:
                      </p>
                      <div className="grid gap-4">
                        {[
                          {
                            icon: "🔐",
                            title: "Authentication & Security",
                            description:
                              "Keep you logged in securely and protect against fraud and unauthorized access.",
                          },
                          {
                            icon: "⚙️",
                            title: "Platform Functionality",
                            description:
                              "Remember your preferences, language settings, and booking progress.",
                          },
                          {
                            icon: "📊",
                            title: "Performance Analytics",
                            description:
                              "Understand how our platform is used to identify areas for improvement.",
                          },
                          {
                            icon: "🎯",
                            title: "Personalized Experience",
                            description:
                              "Show you relevant content, offers, and advertisements based on your interests.",
                          },
                          {
                            icon: "🛡️",
                            title: "Platform Security",
                            description:
                              "Detect and prevent malicious activities and protect user data.",
                          },
                          {
                            icon: "💬",
                            title: "Customer Support",
                            description:
                              "Provide better support by understanding your journey and potential issues.",
                          },
                        ].map((purpose, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">
                                {purpose.icon}
                              </span>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  {purpose.title}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {purpose.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Types of Cookies */}
                  <section id="types-of-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      3. Types of Cookies We Use
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We categorize cookies based on their purpose and how
                        long they remain on your device:
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-gray-800">
                            By Duration:
                          </h3>
                          <div className="space-y-3">
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                              <h4 className="font-medium text-purple-800 mb-2">
                                Session Cookies
                              </h4>
                              <p className="text-purple-700 text-sm">
                                Temporary cookies that expire when you close
                                your browser. Used for essential functions like
                                maintaining your login status.
                              </p>
                            </div>
                            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <h4 className="font-medium text-indigo-800 mb-2">
                                Persistent Cookies
                              </h4>
                              <p className="text-indigo-700 text-sm">
                                Remain on your device for a set period (days to
                                years). Used to remember preferences and analyze
                                long-term usage patterns.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-gray-800">
                            By Source:
                          </h3>
                          <div className="space-y-3">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="font-medium text-green-800 mb-2">
                                First-Party Cookies
                              </h4>
                              <p className="text-green-700 text-sm">
                                Set directly by GoBusly to provide core
                                functionality and analyze your interactions with
                                our platform.
                              </p>
                            </div>
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                              <h4 className="font-medium text-orange-800 mb-2">
                                Third-Party Cookies
                              </h4>
                              <p className="text-orange-700 text-sm">
                                Set by external services we use (like Google
                                Analytics) for analytics, payments, and
                                advertising purposes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 4: Essential Cookies */}
                  <section id="essential-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      4. Essential Cookies
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-red-800 font-medium mb-2">
                          Always Active
                        </p>
                        <p className="text-red-700 text-sm">
                          These cookies are necessary for our platform to
                          function and cannot be disabled. We don't need your
                          consent for essential cookies.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        {[
                          {
                            name: "Session Management",
                            purpose:
                              "Maintain your login session and prevent unauthorized access",
                            duration: "Session (until browser closes)",
                            examples: "_session_id, csrf_token",
                          },
                          {
                            name: "Booking Process",
                            purpose:
                              "Store your booking progress and prevent data loss during checkout",
                            duration: "30 minutes to 24 hours",
                            examples: "booking_cart, checkout_step",
                          },
                          {
                            name: "Security & Fraud Prevention",
                            purpose:
                              "Protect against malicious activities and secure transactions",
                            duration: "Session to 30 days",
                            examples: "security_token, fraud_check",
                          },
                          {
                            name: "Load Balancing",
                            purpose:
                              "Ensure optimal platform performance and server distribution",
                            duration: "Session",
                            examples: "server_route, load_balance",
                          },
                        ].map((cookie, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">
                                  {cookie.name}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {cookie.purpose}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  <span className="font-medium">Duration:</span>{" "}
                                  {cookie.duration}
                                </p>
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium">Examples:</span>{" "}
                                  {cookie.examples}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Section 5: Analytics Cookies */}
                  <section id="analytics-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      5. Analytics and Performance Cookies
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-blue-800 font-medium mb-2">
                          Consent Required
                        </p>
                        <p className="text-blue-700 text-sm">
                          These cookies help us understand how you interact with
                          our platform so we can improve your experience. We
                          need your consent to use these cookies.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-3">
                            Google Analytics
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-blue-800 text-sm mb-2">
                                What we track:
                              </p>
                              <ul className="text-blue-700 text-xs space-y-1">
                                <li>• Page views and user sessions</li>
                                <li>• Popular routes and destinations</li>
                                <li>• Booking conversion rates</li>
                                <li>• Platform performance issues</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-blue-800 text-sm mb-2">
                                Data protection:
                              </p>
                              <ul className="text-blue-700 text-xs space-y-1">
                                <li>• IP addresses are anonymized</li>
                                <li>• No personal data shared</li>
                                <li>• Data retention: 26 months</li>
                                <li>• GDPR compliant processing</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Platform Performance Monitoring
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            We use internal analytics to monitor platform
                            performance and user experience:
                          </p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Page load times and error rates</li>
                            <li>• Search functionality effectiveness</li>
                            <li>• Mobile vs desktop usage patterns</li>
                            <li>• Feature adoption and user flows</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 6: Marketing Cookies */}
                  <section id="marketing-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      6. Marketing and Advertising Cookies
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <p className="text-purple-800 font-medium mb-2">
                          Optional with Consent
                        </p>
                        <p className="text-purple-700 text-sm">
                          These cookies help us show you relevant advertisements
                          and measure campaign effectiveness. You can opt out of
                          these cookies at any time.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3">
                            Personalized Advertising
                          </h4>
                          <div className="space-y-3">
                            <p className="text-purple-800 text-sm">
                              We may show you targeted advertisements based on
                              your interests and browsing behavior:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ul className="text-purple-700 text-sm space-y-1">
                                <li>• Routes you've searched for</li>
                                <li>• Destinations you've shown interest in</li>
                                <li>• Travel dates and preferences</li>
                                <li>• Previous booking history</li>
                              </ul>
                              <ul className="text-purple-700 text-sm space-y-1">
                                <li>• Retargeting campaigns</li>
                                <li>• Social media advertisements</li>
                                <li>• Partner website promotions</li>
                                <li>• Email marketing campaigns</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Campaign Measurement
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            We track advertising effectiveness to optimize our
                            marketing efforts:
                          </p>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Conversion tracking from advertisements</li>
                            <li>• A/B testing of marketing messages</li>
                            <li>• Attribution analysis across channels</li>
                            <li>• ROI measurement for advertising spend</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 7: Third-Party Cookies */}
                  <section id="third-party-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      7. Third-Party Services and Cookies
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We work with trusted third-party services that may set
                        their own cookies when you use our platform. We don't
                        control these cookies directly.
                      </p>
                      <div className="grid gap-4">
                        {[
                          {
                            service: "Payment Processors",
                            description:
                              "Secure payment processing and fraud prevention",
                            examples: "Stripe, PayPal",
                            privacy:
                              "Each processor has its own privacy policy",
                            control:
                              "Managed through their respective platforms",
                          },
                          {
                            service: "Google Services",
                            description:
                              "Analytics, advertising, and reCAPTCHA protection",
                            examples: "Google Analytics, Google Ads, reCAPTCHA",
                            privacy: "Google Privacy Policy applies",
                            control:
                              "Google Ads Settings and Analytics Opt-out",
                          },
                          {
                            service: "Social Media Platforms",
                            description:
                              "Social login and sharing functionality",
                            examples: "Facebook, Google OAuth",
                            privacy: "Platform-specific privacy policies",
                            control: "Social media account settings",
                          },
                          {
                            service: "Customer Support",
                            description:
                              "Live chat and help desk functionality",
                            examples: "Intercom, Zendesk",
                            privacy: "Service provider privacy policies",
                            control: "Can be disabled in cookie settings",
                          },
                        ].map((provider, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  {provider.service}
                                </h4>
                                <p className="text-gray-600 text-sm mb-2">
                                  {provider.description}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  <span className="font-medium">Examples:</span>{" "}
                                  {provider.examples}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs mb-2">
                                  <span className="font-medium">Privacy:</span>{" "}
                                  {provider.privacy}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  <span className="font-medium">Control:</span>{" "}
                                  {provider.control}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Section 8: Managing Cookies */}
                  <section id="managing-cookies">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      8. How to Manage Your Cookie Preferences
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <p className="text-green-800 font-medium mb-2">
                          You're in Control
                        </p>
                        <p className="text-green-700 text-sm">
                          You can control which cookies we use through multiple
                          methods. Your choices will be remembered for future
                          visits.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Platform Controls:
                          </h3>
                          <div className="space-y-3">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">
                                Cookie Banner
                              </h4>
                              <p className="text-blue-700 text-sm">
                                When you first visit, choose which cookie
                                categories to allow or reject through our
                                consent banner.
                              </p>
                            </div>
                            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <h4 className="font-medium text-indigo-800 mb-2">
                                Cookie Settings Page
                              </h4>
                              <p className="text-indigo-700 text-sm">
                                Visit our dedicated settings page to modify your
                                cookie preferences at any time.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Browser Controls:
                          </h3>
                          <div className="space-y-3">
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                              <h4 className="font-medium text-orange-800 mb-2">
                                Browser Settings
                              </h4>
                              <p className="text-orange-700 text-sm">
                                Configure your browser to accept, reject, or
                                notify you about cookies from all websites.
                              </p>
                            </div>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <h4 className="font-medium text-red-800 mb-2">
                                Clear Existing Cookies
                              </h4>
                              <p className="text-red-700 text-sm">
                                Delete cookies already stored on your device
                                through your browser's privacy settings.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Impact of Disabling Cookies
                        </h4>
                        <p className="text-yellow-700 text-sm mb-2">
                          While you can browse our site with cookies disabled,
                          some functionality may be limited:
                        </p>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• You may need to log in repeatedly</li>
                          <li>• Your preferences won't be remembered</li>
                          <li>• Some features may not work properly</li>
                          <li>• The booking process may be interrupted</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Section 9: Cookie Consent */}
                  <section id="cookie-consent">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      9. Cookie Consent and Your Rights
                    </h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-3">
                            Your Rights Under GDPR:
                          </h4>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• Right to be informed about cookie use</li>
                            <li>• Right to give or withdraw consent</li>
                            <li>• Right to object to non-essential cookies</li>
                            <li>• Right to have cookies deleted</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3">
                            How Consent Works:
                          </h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Clear information before setting cookies</li>
                            <li>• Granular control by cookie category</li>
                            <li>• Easy withdrawal of consent</li>
                            <li>• No negative impact for refusing</li>
                          </ul>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Cookie Categories and Consent:
                        </h4>
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                            <span className="text-red-800 font-medium text-sm">
                              Essential Cookies
                            </span>
                            <span className="text-red-700 text-xs">
                              Always Active (No Consent Required)
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                            <span className="text-blue-800 font-medium text-sm">
                              Analytics Cookies
                            </span>
                            <span className="text-blue-700 text-xs">
                              Consent Required
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded border border-purple-200">
                            <span className="text-purple-800 font-medium text-sm">
                              Marketing Cookies
                            </span>
                            <span className="text-purple-700 text-xs">
                              Consent Required
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 10: Policy Updates */}
                  <section id="policy-updates">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      10. Updates to This Cookie Policy
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        We may update this Cookie Policy periodically to reflect
                        changes in our cookie usage, new technologies, or legal
                        requirements.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            When We Update:
                          </h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• New cookie technologies implemented</li>
                            <li>• Changes to third-party services</li>
                            <li>• Legal or regulatory requirements</li>
                            <li>• Platform functionality updates</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            How You'll Know:
                          </h4>
                          <ul className="text-gray-700 text-sm space-y-1">
                            <li>• Updated "Last Updated" date</li>
                            <li>• New consent banner if needed</li>
                            <li>• Email notification for major changes</li>
                            <li>
                              • Platform announcement for significant updates
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          We recommend reviewing this policy periodically to
                          stay informed about how we use cookies. Continued use
                          of our platform after updates indicates your
                          acceptance of the revised policy.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 11: Contact Us */}
                  <section id="contact-us">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
                      11. Contact Us About Cookies
                    </h2>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        If you have questions about our cookie usage, need help
                        managing your preferences, or want to report a
                        cookie-related issue, please contact us:
                      </p>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-900 mb-4">
                          Cookie Support Team
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-blue-800 mb-1">
                                Email:
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
                              Address:
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
                            Cookie Preferences
                          </h4>
                          <p className="text-green-700 text-sm">
                            Need help changing your cookie settings or
                            understanding your options?
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="font-medium text-purple-800 mb-2">
                            Technical Issues
                          </h4>
                          <p className="text-purple-700 text-sm">
                            Experiencing problems with cookie functionality or
                            platform features?
                          </p>
                        </div>
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-2">
                            Privacy Concerns
                          </h4>
                          <p className="text-orange-700 text-sm">
                            Questions about data collection, third parties, or
                            privacy protection?
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Additional Resources:
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <a
                            href="/legal/cookie-settings"
                            className="text-blue-600 hover:underline"
                          >
                            Cookie Settings
                          </a>
                          <a
                            href="/legal/privacy-policy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                          <a
                            href="https://allaboutcookies.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            All About Cookies
                          </a>
                          <a
                            href="https://youronlinechoices.eu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Your Online Choices (EU)
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="text-center space-y-4">
                    <p className="text-gray-500 text-sm">
                      <span className="font-medium">Last Updated:</span>{" "}
                      February 23, 2025
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
