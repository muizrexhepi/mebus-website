import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata = {
  title: "GoBusly - Terms of Service",
  description:
    "Read the GoBusly Terms of Service to understand your rights and obligations when using our bus ticket booking app.",
  keywords:
    "GoBusly, Terms of Service, Legal, User Rights, Bus Ticket Booking, Agreement",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "GoBusly - Terms of Service",
    description:
      "Review the Terms of Service for GoBusly to understand the legal agreement and guidelines governing the use of our platform.",
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

export default function MebusTermsOfService() {
  return (
    <div className="mx-auto px-4py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-8">
          Welcome to GoBusly. These Terms of Service (&quot;Terms&quot;) govern
          your use of the GoBusly bus ticket booking application and services.
          By using GoBusly, you agree to these Terms. Please read them
          carefully.
        </p>

        <h2 className="text-2xl font-semibold mb-4" id="toc">
          Table of Contents
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>
            <a href="#acceptance" className="text-blue-600 hover:underline">
              Acceptance of Terms
            </a>
          </li>
          <li>
            <a href="#use-of-service" className="text-blue-600 hover:underline">
              Use of Service
            </a>
          </li>
          <li>
            <a href="#account" className="text-blue-600 hover:underline">
              User Account
            </a>
          </li>
          <li>
            <a href="#bookings" className="text-blue-600 hover:underline">
              Bookings and Payments
            </a>
          </li>
          <li>
            <a href="#cancellations" className="text-blue-600 hover:underline">
              Cancellations and Refunds
            </a>
          </li>
          <li>
            <a href="#privacy" className="text-blue-600 hover:underline">
              Privacy and Data Protection
            </a>
          </li>
          <li>
            <a href="#liability" className="text-blue-600 hover:underline">
              Limitation of Liability
            </a>
          </li>
          <li>
            <a href="#changes" className="text-blue-600 hover:underline">
              Changes to Terms
            </a>
          </li>
          <li>
            <a href="#contact" className="text-blue-600 hover:underline">
              Contact Us
            </a>
          </li>
        </ol>

        <section id="acceptance" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the GoBusly app, you agree to be bound by
            these Terms. If you do not agree to these Terms, please do not use
            our service.
          </p>
        </section>

        <section id="use-of-service" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p className="mb-4">
            You agree to use GoBusly only for lawful purposes and in accordance
            with these Terms. You are prohibited from:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Using the service for any illegal activities</li>
            <li>Interfering with or disrupting the integrity of the service</li>
            <li>
              Attempting to gain unauthorized access to any part of the service
            </li>
            <li>
              Using the service in any way that could damage or impair its
              functionality
            </li>
          </ul>
        </section>

        <section id="account" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
          <p className="mb-4">
            To use certain features of GoBusly, you may need to create an
            account. You are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and up-to-date information</li>
          </ul>
        </section>

        <section id="bookings" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Bookings and Payments
          </h2>
          <p className="mb-4">When you book a bus ticket through GoBusly:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>You agree to pay the specified fare and any applicable fees</li>
            <li>
              You are responsible for providing accurate booking information
            </li>
            <li>
              GoBusly acts as an intermediary between you and the bus operators
            </li>
            <li>
              The bus operator&apos;s terms and conditions may also apply to
              your booking
            </li>
          </ul>
        </section>

        <section id="cancellations" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Cancellations and Refunds
          </h2>
          <p className="mb-4">
            Cancellation and refund policies may vary depending on the bus
            operator. Generally:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cancellations must be made within the specified time frame</li>
            <li>Refunds are subject to the bus operator&apos;s policies</li>
            <li>
              GoBusly may charge a processing fee for cancellations and refunds
            </li>
          </ul>
        </section>

        <section id="privacy" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Privacy and Data Protection
          </h2>
          <p>
            Your use of GoBusly is also governed by our Privacy Policy. By using
            GoBusly, you consent to the collection, use, and sharing of your
            information as described in the Privacy Policy.
          </p>
        </section>

        <section id="liability" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">To the fullest extent permitted by law:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              GoBusly is not liable for any indirect, incidental, special, or
              consequential damages
            </li>
            <li>
              GoBusly is not responsible for the actions, services, or products
              of third-party bus operators
            </li>
            <li>
              Our liability is limited to the amount you paid for the specific
              booking in question
            </li>
          </ul>
        </section>

        <section id="changes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of
            any changes by posting the new Terms in the GoBusly app and updating
            the &quot;Last Updated&quot; date. Your continued use of GoBusly
            after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>GoBusly Legal Team</p>
          <p>Email: legal@GoBusly.eu</p>
          <p>Address: 456 Data Protection Avenue, Privacyville, ST 67890</p>
          <p>Phone: (555) 987-6543</p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p>
            <strong>Last Updated:</strong> September 15, 2024
          </p>
        </div>
      </div>
    </div>
  );
}
