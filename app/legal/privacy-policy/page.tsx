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
        <p className="mb-8">
          At GoBusly ("we," "us," or "our"), we are committed to protecting your
          privacy and personal data in compliance with the General Data
          Protection Regulation (GDPR) and other applicable data protection
          laws. This Privacy Policy explains how we collect, process, and
          protect your personal data when you use our bus ticket booking
          service.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a
              href="#data-controller"
              className="text-blue-600 hover:underline"
            >
              Data Controller Information
            </a>
          </li>
          <li>
            <a href="#legal-basis" className="text-blue-600 hover:underline">
              Legal Basis for Processing
            </a>
          </li>
          <li>
            <a
              href="#information-collection"
              className="text-blue-600 hover:underline"
            >
              Personal Data We Collect
            </a>
          </li>
          <li>
            <a
              href="#information-use"
              className="text-blue-600 hover:underline"
            >
              How We Process Your Data
            </a>
          </li>
          <li>
            <a
              href="#information-sharing"
              className="text-blue-600 hover:underline"
            >
              Data Sharing and International Transfers
            </a>
          </li>
          <li>
            <a href="#data-retention" className="text-blue-600 hover:underline">
              Data Retention
            </a>
          </li>
          <li>
            <a href="#data-security" className="text-blue-600 hover:underline">
              Data Security Measures
            </a>
          </li>
          <li>
            <a href="#user-rights" className="text-blue-600 hover:underline">
              Your Data Protection Rights
            </a>
          </li>
          <li>
            <a href="#cookies" className="text-blue-600 hover:underline">
              Cookies and Tracking
            </a>
          </li>
          <li>
            <a href="#policy-changes" className="text-blue-600 hover:underline">
              Changes to This Policy
            </a>
          </li>
          <li>
            <a href="#contact-dpo" className="text-blue-600 hover:underline">
              Contact Our DPO
            </a>
          </li>
        </ol>

        <section id="data-controller" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Data Controller Information
          </h2>
          <p className="mb-4">
            GoBusly L.L.C. is the data controller responsible for processing
            your personal data. Our registered office is located at:
          </p>
          <p>254 Chapman Rd, Ste 208 #20780</p>
          <p>Newark, Delaware 19702, US</p>
        </section>

        <section id="legal-basis" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Legal Basis for Processing
          </h2>
          <p className="mb-4">
            We process your personal data on the following legal grounds:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Contract performance: Processing necessary for booking and
              providing transportation services
            </li>
            <li>
              Legal obligations: Compliance with transportation and accounting
              laws
            </li>
            <li>
              Legitimate interests: Improving our services and preventing fraud
            </li>
            <li>Consent: Marketing communications and non-essential cookies</li>
          </ul>
        </section>

        <section id="information-collection" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Personal Data We Collect
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Data you provide directly:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Identity information (name, date of birth)</li>
              <li>Contact details (email, phone number, address)</li>
              <li>
                Payment information (processed by secure payment providers)
              </li>
              <li>Travel preferences and history</li>
              <li>Communication records with our support team</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Data collected automatically:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>IP address and device information</li>
              <li>Location data (with explicit consent)</li>
              <li>App usage statistics</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        <section id="information-use" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. How We Process Your Data
          </h2>
          <p className="mb-4">
            We process your personal data for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Booking management and ticket issuance</li>
            <li>Payment processing and fraud prevention</li>
            <li>Customer support and communication</li>
            <li>Service improvement and analytics</li>
            <li>Legal compliance and reporting</li>
            <li>Marketing communications (with consent)</li>
          </ul>
        </section>

        <section id="information-sharing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Data Sharing and International Transfers
          </h2>
          <p className="mb-4">We share your data with:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Bus operators necessary for service delivery</li>
            <li>Payment processors for secure transactions</li>
            <li>Cloud service providers within the EU</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p>
            For transfers outside the EU/EEA, we implement appropriate
            safeguards including Standard Contractual Clauses.
          </p>
        </section>

        <section id="data-retention" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="mb-4">We retain your personal data for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Account information: While your account is active plus 2 years
            </li>
            <li>Booking records: 7 years (legal requirement)</li>
            <li>Payment information: As required by financial regulations</li>
            <li>Communication records: 2 years after last contact</li>
          </ul>
        </section>

        <section id="data-security" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Data Security Measures
          </h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures
            including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>End-to-end encryption for data transmission</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and authentication protocols</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
          </ul>
        </section>

        <section id="user-rights" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Your Data Protection Rights
          </h2>
          <p className="mb-4">Under GDPR, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Erase your data ("right to be forgotten")</li>
            <li>Restrict processing</li>
            <li>Data portability</li>
            <li>Object to processing</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section id="cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Cookies and Tracking
          </h2>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your user
            experience, improve our services, and analyze how our website is
            used. Cookies are small text files stored on your device that allow
            us to recognize you when you return to our site. Some cookies are
            essential for the functioning of our services, while others help us
            understand how our site is being used, so we can make improvements.
          </p>
          <p className="mb-4">The types of cookies we use are as follows:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function and cannot be switched off in our
              systems. They are typically set in response to actions you have
              taken, such as logging in or filling in forms.
            </li>
            <li>
              <strong>Performance and Analytics Cookies:</strong> These cookies
              help us analyze how users interact with our website, allowing us
              to improve performance and user experience. We use tools like
              Google Analytics to gather this information. Your consent is
              required to use these cookies.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> These cookies are used to
              track visitors across websites. They are used to build a profile
              of your interests and display relevant advertisements to you. You
              can opt-out of these cookies by adjusting your preferences.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies allow the
              website to remember your preferences, such as language and region
              settings, to provide a more personalized experience.
            </li>
          </ul>
          <p className="mb-4">
            You can manage or disable cookies at any time through your browser
            settings. Please note that disabling some cookies may impact the
            functionality of our website.
          </p>
          <p className="mb-4">
            For more information on how we handle cookies, please visit our{" "}
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
          <h2 className="text-2xl font-semibold mb-4">
            10. Changes to This Policy
          </h2>
          <p>
            We review this policy regularly and will notify you of significant
            changes through the app or email. Continued use of our services
            after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section id="contact-dpo" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Our DPO</h2>
          <p className="mb-4">
            For privacy-related inquiries, contact our Data Protection Officer:
          </p>
          <p>Email: dpo@gobusly.com</p>
          <p>Phone: (+389) 70-250-259</p>
          <p className="mt-4">
            You have the right to lodge a complaint with your local data
            protection authority if you believe we have not adequately addressed
            your privacy concerns.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> February 23, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
