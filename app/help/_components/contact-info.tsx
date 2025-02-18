"use client";

import type React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactInfoItem = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <Card className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm">
    <div className="text-teal-600 p-2 rounded-full bg-teal-50">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      {content}
    </div>
  </Card>
);

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <ContactInfoItem
        icon={<Phone size={24} />}
        title="Phone Support"
        content={
          <div className="space-y-1">
            <p className="text-gray-600">Toll-Free: 1-800-GOBUSLY</p>
            <p className="text-gray-600">International: +1-555-GOBUSLY</p>
            <p className="text-sm text-teal-600">24/7 Travel Support</p>
          </div>
        }
      />
      <ContactInfoItem
        icon={<Mail size={24} />}
        title="Email Support"
        content={
          <div className="space-y-1">
            <p className="text-gray-600">support@gobusly.com</p>
            <p className="text-gray-600">bookings@gobusly.com</p>
            <p className="text-sm text-teal-600">Fast Response Guaranteed</p>
          </div>
        }
      />
      <ContactInfoItem
        icon={<MapPin size={24} />}
        title="Main Office"
        content={
          <div className="space-y-1">
            <p className="text-gray-600">SEEU Techpark</p>
            <p className="text-gray-600">Tetovo, 1200</p>
            <div className="flex items-center space-x-2 text-sm text-teal-600">
              <Clock size={16} />
              <span>Mon-Fri, 9AM-6PM</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
