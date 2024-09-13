import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon, MailIcon } from "lucide-react";
import { Passenger } from "@/models/passenger";

const ContactInformation = ({ passenger }: { passenger: Passenger }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PhoneIcon className="mr-2" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MailIcon className="text-primary" />
          <span>{passenger.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneIcon className="text-primary" />
          <span>{passenger.phone}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
