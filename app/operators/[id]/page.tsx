"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  AlertTriangle,
  Bell,
  Building,
  Phone,
  MapPin,
  FileText,
  Hash,
} from "lucide-react";

interface Operator {
  _id: string;
  name: string;
  email: string;
  otp: {
    code: string;
    valid_until: Date;
  };
  role: "operator" | "employee";
  fcm_token: string;
  max_child_age: number;
  notification_permissions: {
    allow_portal_notifications: boolean;
    not_enough_seats: number;
  };
  confirmation: {
    is_confirmed: boolean;
    message: string;
  };
  company_metadata: {
    tax_number: string;
    registration_number: string;
    name: string;
    email: string;
    phone: string;
    country: string;
  };
}

export default function OperatorDetailsPage() {
  const { operatorId } = useParams();
  const [operator, setOperator] = useState<Operator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        // Simulating API call to fetch operator data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mock data based on the provided model
        const mockOperator: Operator = {
          _id: operatorId as string,
          name: "John Doe",
          email: "john.doe@example.com",
          otp: {
            code: "123456",
            valid_until: new Date(Date.now() + 3600000), // 1 hour from now
          },
          role: "operator",
          fcm_token: "fcm_token_example",
          max_child_age: 12,
          notification_permissions: {
            allow_portal_notifications: true,
            not_enough_seats: 5,
          },
          confirmation: {
            is_confirmed: true,
            message: "Operator account confirmed",
          },
          company_metadata: {
            tax_number: "TAX123456",
            registration_number: "REG789012",
            name: "Bus Company Ltd",
            email: "info@buscompany.com",
            phone: "+1234567890",
            country: "United States",
          },
        };
        setOperator(mockOperator);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch operator data:", error);
        setIsLoading(false);
      }
    };

    fetchOperator();
  }, [operatorId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-[250px]" />
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  if (!operator) {
    return <div className="max-w-4xl mx-auto p-6">Operator not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Operator Details</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span>{operator.name}</span>
          </CardTitle>
          <CardDescription>{operator.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge
              variant={operator.role === "operator" ? "default" : "secondary"}
            >
              {operator.role}
            </Badge>
            <Badge>
              {operator.confirmation.is_confirmed ? "Confirmed" : "Unconfirmed"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {operator.confirmation.message}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="portal-notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Allow Portal Notifications</span>
            </Label>
            <Switch
              id="portal-notifications"
              checked={
                operator.notification_permissions.allow_portal_notifications
              }
              onCheckedChange={() => {}} // Add handler if needed
            />
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Not Enough Seats Threshold:{" "}
              {operator.notification_permissions.not_enough_seats}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Max Child Age: {operator.max_child_age}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>{operator.company_metadata.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{operator.company_metadata.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{operator.company_metadata.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{operator.company_metadata.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Tax Number: {operator.company_metadata.tax_number}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>
                Registration: {operator.company_metadata.registration_number}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
