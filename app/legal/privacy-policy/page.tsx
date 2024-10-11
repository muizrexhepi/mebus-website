import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata = {
  title: "Busly - Privacy Policy",
  description:
    "Read the privacy policy of Busly to understand how we collect, use, and protect your personal information when using our bus ticket booking app.",
  keywords:
    "Busly, Privacy Policy, Data Security, Personal Information, Bus Ticket Booking",
  authors: [{ name: "Busly" }],
  robots: "index, follow",
  openGraph: {
    title: "Busly - Privacy Policy",
    description:
      "Busly is committed to protecting your privacy and ensuring the security of your personal information. Learn more about our privacy practices.",
    url: "https://www.busly.eu/privacy-policy",
    type: "website",
    images: [
      {
        url: "https://www.busly.eu/images/privacy-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Busly Privacy Policy",
      },
    ],
  },
};

export default function MebusPrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8">
          At Busly, we are committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy outlines
          our practices concerning the collection, use, and sharing of your data
          when you use our bus ticket booking app.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a
              href="#information-collection"
              className="text-blue-600 hover:underline"
            >
              Information We Collect
            </a>
          </li>
          <li>
            <a
              href="#information-use"
              className="text-blue-600 hover:underline"
            >
              How We Use Your Information
            </a>
          </li>
          <li>
            <a
              href="#information-sharing"
              className="text-blue-600 hover:underline"
            >
              Information Sharing and Disclosure
            </a>
          </li>
          <li>
            <a href="#data-security" className="text-blue-600 hover:underline">
              Data Security
            </a>
          </li>
          <li>
            <a href="#user-rights" className="text-blue-600 hover:underline">
              Your Rights and Choices
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

        <section id="information-collection" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information you provide directly to us when you:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Create an account in the Busly app</li>
            <li>Book a bus ticket</li>
            <li>Contact our customer support</li>
            <li>Sign up for our newsletter</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p className="mb-4">This information may include:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Name and contact information</li>
            <li>Payment details</li>
            <li>Travel preferences and history</li>
            <li>Communication with our support team</li>
          </ul>
          <p>
            We also automatically collect certain information about your device
            and how you interact with our app, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>IP address</li>
            <li>Device information</li>
            <li>App usage data</li>
            <li>Location data (with your permission)</li>
          </ul>
        </section>

        <section id="information-use" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide, maintain, and improve the Busly app</li>
            <li>Process your bus ticket bookings and transactions</li>
            <li>
              Send you important notifications about your bookings and travels
            </li>
            <li>
              Respond to your comments, questions, and customer service requests
            </li>
            <li>
              Send you promotional offers and information about Busly services
            </li>
            <li>Analyze app usage trends and improve user experience</li>
            <li>
              Detect and prevent fraudulent activities and ensure secure
              transactions
            </li>
            <li>Personalize your in-app experience and recommendations</li>
          </ul>
        </section>

        <section id="information-sharing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>With bus operators to fulfill your bookings</li>
            <li>
              With third-party service providers who help us operate the Busly
              app
            </li>
            <li>
              In response to legal requests or to comply with applicable laws
            </li>
            <li>
              To protect the rights, property, or safety of Busly, our users, or
              others
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition
            </li>
            <li>With your consent or at your direction</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section id="data-security" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to help protect your personal
            information from loss, theft, misuse, unauthorized access,
            disclosure, alteration, and destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits of our app and systems</li>
            <li>Secure user authentication mechanisms</li>
            <li>
              Employee training on data protection and security best practices
            </li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal information, we cannot
            guarantee its absolute security.
          </p>
        </section>

        <section id="user-rights" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Your Rights and Choices
          </h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Access and obtain a copy of your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Restrict or object to certain processing of your data</li>
            <li>Data portability</li>
            <li>
              Withdraw consent at any time (where processing is based on
              consent)
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Us&quot; section.
          </p>
        </section>

        <section id="policy-changes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy in the Busly
            app and updating the &quot;Last Updated&quot; date. You are advised
            to review this Privacy Policy periodically for any changes. Changes
            to this Privacy Policy are effective when they are posted in the
            app.
          </p>
        </section>

        <section id="contact-us" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us at:
          </p>
          <p>Busly Privacy Team</p>
          <p>Email: privacy@busly.eu</p>
          <p>Address: 456 Data Protection Avenue, Privacyville, ST 67890</p>
          <p>Phone: (555) 987-6543</p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> September 13, 2024
          </p>
        </div>
      </div>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}
