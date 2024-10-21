import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { environment } from "@/environment";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MailIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingIcon,
  AlertCircleIcon,
  ArrowUpRight,
} from "lucide-react";
import { Operator, OperatorRoles, CompanyMetadata } from "@/models/operator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Active Operators | Busly - Your Reliable Bus Booking Service",
  description:
    "View all active operators on Busly. We offer reliable bus services with experienced operators for your comfortable travel.",
};

const CompanyInfo: React.FC<{ companyMetadata: CompanyMetadata }> = ({
  companyMetadata,
}) => (
  <div className="mt-4 p-4 bg-gray-100 rounded-md">
    <h1 className="font-semibold text-lg mb-2">Company Information</h1>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <BuildingIcon className="w-4 h-4 inline mr-2 text-emerald-700" />
        {companyMetadata?.name}
      </div>
      <div>
        <MailIcon className="w-4 h-4 inline mr-2 text-emerald-700" />
        {companyMetadata?.email}
      </div>
      <div>
        <PhoneIcon className="w-4 h-4 inline mr-2 text-emerald-700" />
        {companyMetadata?.phone}
      </div>
      <div>
        <MapPinIcon className="w-4 h-4 inline mr-2 text-emerald-700" />
        {companyMetadata?.country}
      </div>
    </div>
  </div>
);

const ActiveOperators: React.FC<{ operators: Operator[] }> = ({
  operators,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {operators.map((operator) => (
      <Card key={operator?._id} className="overflow-hidden">
        <CardHeader className="bg-emerald-700 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>{operator?.name}</span>
            <Link href={`/partners/active-operators/${operator?._id}`}>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 font-medium px-2 py-1 text-[15px]"
              >
                View Routes
              </Badge>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 mr-2 text-emerald-700" />
              <span>{operator?.email}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2 text-emerald-700" />
              <span>ID: {operator?._id}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-emerald-700" />
              <span>
                Joined: {new Date(operator?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <AlertCircleIcon className="w-4 h-4 mr-2 text-emerald-700" />
              <span>Max Child Age: {operator?.max_child_age || 12}</span>
            </div>
          </div>
          <CompanyInfo companyMetadata={operator?.company_metadata} />
        </CardContent>
      </Card>
    ))}
  </div>
);

const ActiveOperatorsPage: React.FC = async () => {
  const res = (await axios.get(`${environment.apiurl}/operator`)) || [];
  const operators: Operator[] = res.data.data;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-4 text-neutral-800">
          Active Operators
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Our experienced and reliable operators ensure a comfortable and safe
          journey for all Busly passengers. Get to know the people behind our
          excellent service.
        </p>

        <ActiveOperators operators={operators} />
      </main>

      <SecondaryFooter />
    </div>
  );
};

export default ActiveOperatorsPage;
