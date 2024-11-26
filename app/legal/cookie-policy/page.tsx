import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata = {
  title: "GoBusly - Cookie Policy",
  description:
    "Learn about how GoBusly uses cookies and similar technologies to provide, enhance, and improve the functionality of our bus ticket booking app.",
  keywords:
    "GoBusly, Cookie Policy, Cookies, Privacy, Tracking, Web Technologies",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Cookie Policy",
    description:
      "GoBusly uses cookies and similar technologies to enhance your experience. Read our Cookie Policy to understand how we use and manage cookies.",
    url: "https://www.gobusly.com/legal/cookie-policy",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/cookie-policy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Cookie Policy",
      },
    ],
  },
};

export default function MebusCookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Cookie Policy</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8">
          This Cookie Policy explains how GoBusly ("we", "us", or "our") uses
          cookies and similar technologies when you use our bus ticket booking
          app. We use these technologies to enhance your user experience,
          analyze app usage, and assist in our marketing efforts.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a
              href="#what-are-cookies"
              className="text-blue-600 hover:underline"
            >
              What Are Cookies?
            </a>
          </li>
          <li>
            <a
              href="#types-of-cookies"
              className="text-blue-600 hover:underline"
            >
              Types of Cookies We Use
            </a>
          </li>
          <li>
            <a
              href="#cookie-purposes"
              className="text-blue-600 hover:underline"
            >
              How We Use Cookies
            </a>
          </li>
          <li>
            <a
              href="#third-party-cookies"
              className="text-blue-600 hover:underline"
            >
              Third-Party Cookies
            </a>
          </li>
          <li>
            <a
              href="#cookie-management"
              className="text-blue-600 hover:underline"
            >
              Managing Your Cookie Preferences
            </a>
          </li>
          <li>
            <a href="#policy-updates" className="text-blue-600 hover:underline">
              Updates to This Policy
            </a>
          </li>
          <li>
            <a href="#contact-us" className="text-blue-600 hover:underline">
              Contact Us
            </a>
          </li>
        </ol>

        <section id="what-are-cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you
            use our app. They help us recognize your device and remember certain
            information about your preferences or actions within the app. We
            also use similar technologies such as pixel tags, web beacons, and
            local storage, which function similarly to cookies.
          </p>
        </section>

        <section id="types-of-cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Types of Cookies We Use
          </h2>
          <p className="mb-4">We use the following types of cookies:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Essential Cookies:</strong> These are necessary for the
              app to function properly and cannot be switched off.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These help us remember your
              preferences and settings to enhance your experience.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These allow us to collect
              information about how you use our app, helping us improve its
              performance and features.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> These are used to track
              visitors across apps and display relevant advertisements.
            </li>
          </ul>
        </section>

        <section id="cookie-purposes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
          <p className="mb-4">
            We use cookies for various purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Authenticating users and maintaining session information</li>
            <li>Remembering your preferences and settings</li>
            <li>Analyzing app usage and performance</li>
            <li>Personalizing content and recommendations</li>
            <li>Providing targeted advertising</li>
            <li>Preventing fraud and enhancing security</li>
          </ul>
        </section>

        <section id="third-party-cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Third-Party Cookies
          </h2>
          <p>
            Some cookies are placed by third-party services that appear on our
            app. We do not control the use of these cookies. These third parties
            may include analytics providers, advertising networks, and social
            media platforms. Please refer to their respective privacy policies
            for more information on how they use cookies.
          </p>
        </section>

        <section id="cookie-management" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Managing Your Cookie Preferences
          </h2>
          <p className="mb-4">
            You can manage your cookie preferences through your device or
            browser settings. However, please note that disabling certain
            cookies may impact the functionality of our app.
          </p>
          <p>
            To opt out of targeted advertising provided by third parties, you
            can visit{" "}
            <a
              href="http://www.aboutads.info/choices/"
              className="text-blue-600 hover:underline"
            >
              http://www.aboutads.info/choices/
            </a>{" "}
            or{" "}
            <a
              href="http://www.youronlinechoices.eu/"
              className="text-blue-600 hover:underline"
            >
              http://www.youronlinechoices.eu/
            </a>
            .
          </p>
        </section>

        <section id="policy-updates" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Updates to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We encourage you to review this policy
            periodically for any changes. The date of the last update will be
            indicated at the bottom of this page.
          </p>
        </section>

        <section id="contact-us" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us at:
          </p>
          <p>GoBusly Privacy Team</p>
          <p>Email: privacy@GoBusly.eu</p>
          <p>Address: 456 Data Protection Avenue, Privacyville, ST 67890</p>
          <p>Phone: (555) 987-6543</p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> September 13, 2024
          </p>
        </div>
      </div>
    </div>
  );
}
