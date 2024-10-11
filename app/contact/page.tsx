import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/contact/ContactForm";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata: Metadata = {
  title: "Contact Support | Busly - Your Reliable Bus Booking Service",
  description:
    "Get in touch with Busly support for all your bus booking needs. We offer 24/7 customer support, easy online booking, and hassle-free travel experiences.",
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <div className="flex items-start space-x-4">
    <div className="text-emerald-700">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      {content}
    </div>
  </div>
);

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 pt-32">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <h1 className="text-4xl font-bold mb-4 text-neutral-800">
        Contact Support
      </h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Our dedicated support team is here to assist you with any questions or
        concerns. Choose your preferred method of contact or send us a message
        directly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <ContactInfo
            icon={<Phone size={24} />}
            title="Phone Support"
            content={
              <div className="space-y-2">
                <p>Toll-Free: 1-800-Busly-01</p>
                <p>International: +1-555-Busly-02</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
            }
          />
          <ContactInfo
            icon={<Mail size={24} />}
            title="Email Support"
            content={
              <div className="space-y-2">
                <p>General Inquiries: support@busly.com</p>
                <p>Booking Assistance: bookings@busly.com</p>
                <p className="text-sm text-gray-500">
                  Response within 24 hours
                </p>
              </div>
            }
          />
          <ContactInfo
            icon={<MapPin size={24} />}
            title="Main Office"
            content={
              <div className="space-y-2">
                <p>456 Busly Terminal, Suite 789</p>
                <p>New York, NY 10001</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            }
          />
        </div>

        <ContactForm />
      </div>

      {/* <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              How do I book a Busly ticket?
            </h3>
            <p className="text-gray-600">
              Use our online booking system: enter your travel details, select
              your preferred bus and seats, and complete the payment process.
              You&apos;ll receive a confirmation email with your ticket details.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              What&apos;s Busly&apos;s cancellation policy?
            </h3>
            <p className="text-gray-600">
              We offer a flexible cancellation policy allowing changes up to 15
              minutes before departure. Refund amounts vary based on the time of
              cancellation. Please check our terms and conditions for detailed
              information.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              What amenities are available on Busly?
            </h3>
            <p className="text-gray-600">
              Busly offers free Wi-Fi, power outlets, onboard entertainment,
              spacious legroom, restrooms, and air conditioning. Amenities may
              vary by bus type, so please check your trip details for specifics.
            </p>
          </div>
        </div>
      </div> */}

      <SecondaryFooter />
    </div>
  );
};

export default Contact;
