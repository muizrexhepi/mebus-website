"use client";
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}> = ({ icon, title, content }) => (
  <Card className="flex items-start space-x-4 p-4  rounded-lg hover:shadow-sm transition-all duration-300">
    <div className="text-primary-bg p-2 rounded-full bg-primary-bg/10">
      {icon}
    </div>
    <div>
      <h3 className="font-normal text-lg text-neutral-800">{title}</h3>
      {content}
    </div>
  </Card>
);

export const ContactClientPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-normal mb-2 button-gradient text-transparent bg-clip-text">
        {t("helpPage.quickLinks.contactSupport", "Contact support")}
      </h1>
      <p className="text-gray-600 mb-12 text-lg leading-relaxed">
        {t(
          "pageMetadata.customerSupport.content.text",
          "Our dedicated professional support team is committed to providing exceptional assistance."
        )}
      </p>

      <div className="space-y-6">
        <ContactInfo
          icon={<Phone size={24} strokeWidth={1.5} />}
          title="Professional Phone Support"
          content={
            <div className="space-y-2">
              <p className="text-neutral-700">Toll-Free: 1-800-GoBusly-01</p>
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
  );
};
