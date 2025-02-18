"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <Card className="flex items-start space-x-4 p-6 rounded-lg hover:shadow-md transition-all duration-300 border-gray-100">
    <div className="text-primary-bg p-3 rounded-full bg-primary-bg/10">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-lg text-gray-900 mb-2">{title}</h3>
      {content}
    </div>
  </Card>
);

export const ContactClientPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-normal mb-4 button-gradient text-transparent bg-clip-text">
          {t("helpPage.quickLinks.contactSupport", "Contact Support")}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t(
            "pageMetadata.customerSupport.content.text",
            "If you need any assistance or have questions about your booking, our dedicated support team is ready to help."
          )}
        </p>
      </div>

      <div className="space-y-4">
        <ContactInfo
          icon={<Phone size={24} strokeWidth={1.5} />}
          title="Professional Phone Support"
          content={
            <div className="space-y-2">
              <p className="text-gray-600">Toll-Free: 1-800-GoBusly-01</p>
              <p className="text-gray-600">International: +1-555-GoBusly-02</p>
              <p className="text-sm text-transparent bg-clip-text button-gradient font-medium">
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
              <p className="text-gray-600">
                General Inquiries: support@gobusly.com
              </p>
              <p className="text-gray-600">
                Booking Assistance: bookings@gobusly.com
              </p>
              <p className="text-sm text-transparent bg-clip-text button-gradient font-medium">
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
              <p className="text-gray-600">SEEU Techpark, GoBusly</p>
              <p className="text-gray-600">Tetovo, 1200</p>
              <p className="text-sm text-transparent bg-clip-text button-gradient font-medium">
                Business Hours: Mon-Fri, 9AM-6PM
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};
