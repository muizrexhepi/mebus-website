import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserIcon } from "lucide-react";
import { Passenger } from "@/models/passenger";

const PassengerInformation = ({ passengers }: { passengers: Passenger[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserIcon className="mr-2" />
          Passenger Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {passengers.map((passenger: Passenger, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2" />
                Passenger {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-start gap-3 items-center">
                <span className="font-semibold whitespace-nowrap">
                  Full Name:
                </span>
                <span className="line-clamp-1">{passenger.full_name}</span>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <span className="font-semibold whitespace-nowrap">Email:</span>
                <span className="line-clamp-1">{passenger.email}</span>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <span className="font-semibold whitespace-nowrap">Phone:</span>
                <span className="line-clamp-1">{passenger.phone}</span>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <span className="font-semibold whitespace-nowrap">Price:</span>
                <Badge variant="secondary">${passenger.price.toFixed(2)}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default PassengerInformation;
