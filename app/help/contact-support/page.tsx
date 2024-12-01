import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Support - Professional Assistance | GoBusly",
  description:
    "Connect with GoBusly's professional support team for comprehensive bus booking services. Expert assistance, seamless communication, and dedicated customer care.",
  keywords:
    "GoBusly, Professional Support, Customer Service, Bus Booking, Expert Assistance, Travel Support",
  authors: [{ name: "GoBusly" }],
  robots: "index, follow",
  openGraph: {
    title: "Contact Support - Professional Assistance | GoBusly",
    description:
      "Experience top-tier customer support with GoBusly. Our professional team ensures a smooth and reliable booking experience.",
    url: "https://www.gobusly.com/help/contact-support",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/images/contact-support-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoBusly Professional Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support - Professional Assistance | GoBusly",
    description:
      "Professional bus booking support at your fingertips. Reliable, efficient, and customer-focused.",
  },
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <div className="flex items-start space-x-4 p-4 bg-primary-bg/5 rounded-xl hover:shadow-sm transition-all duration-300">
    <div className="text-primary-bg p-2 rounded-full bg-primary-bg/10">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg text-neutral-800">{title}</h3>
      {content}
    </div>
  </div>
);

const Contact: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto sm:px-8 xl:px-0 pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-neutral-900 border-b-4 border-primary-accent pb-4">
            Contact Support
          </h1>
          <p className="text-gray-600 mb-12 text-lg leading-relaxed">
            Our dedicated professional support team is committed to providing
            exceptional assistance. We offer multiple communication channels to
            ensure your convenience and satisfaction.
          </p>

          <div className="space-y-6">
            <ContactInfo
              icon={<Phone size={24} strokeWidth={1.5} />}
              title="Professional Phone Support"
              content={
                <div className="space-y-2">
                  <p className="text-neutral-700">
                    Toll-Free: 1-800-GoBusly-01
                  </p>
                  <p className="text-neutral-700">
                    International: +1-555-GoBusly-02
                  </p>
                  <p className="text-sm text-primary-accent font-medium">
                    24/7 Expert Support
                  </p>
                </div>
              }
            />
            <ContactInfo
              icon={<Mail size={24} strokeWidth={1.5} />}
              title="Professional Email Support"
              content={
                <div className="space-y-2">
                  <p className="text-neutral-700">
                    General Inquiries: support@gobusly.com
                  </p>
                  <p className="text-neutral-700">
                    Booking Assistance: bookings@gobusly.com
                  </p>
                  <p className="text-sm text-primary-accent font-medium">
                    Guaranteed 24-Hour Response
                  </p>
                </div>
              }
            />
            <ContactInfo
              icon={<MapPin size={24} strokeWidth={1.5} />}
              title="Corporate Headquarters"
              content={
                <div className="space-y-2">
                  <p className="text-neutral-700">SEEU Techpark, GoBusly</p>
                  <p className="text-neutral-700">Tetovo, 1200</p>
                  <div className="flex items-center space-x-2 text-sm text-primary-accent font-medium">
                    <Clock size={16} strokeWidth={1.5} />
                    <span>Business Hours: Mon-Fri, 9AM-6PM</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
