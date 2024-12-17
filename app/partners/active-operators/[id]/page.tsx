import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BuildingIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronLeft,
} from "lucide-react";
import { Route } from "@/models/route";
import { Operator } from "@/models/operator";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const operatorRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/operator/${params.id}`
  );
  const operator = operatorRes.data.data;

  return {
    title: `${operator.name} | GoBusly`,
    description: `View details and routes operated by ${operator.name}. Information on destinations, contact details, and company profile.`,
  };
}

const OperatorInfo: React.FC<{ operator: Operator }> = ({ operator }) => (
  <Card className="shadow-lg border-none">
    <CardHeader className="bg-primary/10 pb-2">
      <CardTitle className="flex items-center text-xl text-primary">
        <BuildingIcon className="w-6 h-6 mr-3" />
        Company Profile
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div className="flex items-center">
        <BuildingIcon className="w-5 h-5 mr-3 text-primary" />
        <span className="font-semibold text-gray-800">{operator.name}</span>
      </div>
      <div className="flex items-center">
        <GlobeIcon className="w-5 h-5 mr-3 text-primary" />
        <span className="text-gray-600">
          {operator.company_metadata.country}
        </span>
      </div>
      <div className="flex items-center">
        <MailIcon className="w-5 h-5 mr-3 text-primary" />
        <span className="text-gray-600">{operator.company_metadata.email}</span>
      </div>
      <div className="flex items-center">
        <PhoneIcon className="w-5 h-5 mr-3 text-primary" />
        <span className="text-gray-600">{operator.company_metadata.phone}</span>
      </div>
      <div className="flex items-center">
        <CalendarIcon className="w-5 h-5 mr-3 text-primary" />
        <span className="text-gray-600">
          Joined: {new Date(operator.createdAt).toLocaleDateString()}
        </span>
      </div>
    </CardContent>
  </Card>
);

const OperatorRoutesPage: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const routesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/route/operator/${id}`
  );
  const routes: Route[] = routesRes.data.data;

  const operatorRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/operator/${id}`
  );
  const operator: Operator = operatorRes.data.data;

  console.log({ routes, stations: routes[0].stations });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl paddingX">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-8 space-x-4">
            <BuildingIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              {operator.name}
            </h1>
          </div>
          <Link href="/partners/active-operators">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Operators
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <OperatorInfo operator={operator} />
          </div>

          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Operated Routes
                </h2>
                <p className="text-gray-500">Total Routes: {routes.length}</p>
              </div>

              {routes.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 uppercase">
                      <tr>
                        <th className="px-4 py-3">Route Code</th>
                        <th className="px-4 py-3">From</th>
                        <th className="px-4 py-3">To</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.map((route) => (
                        <tr
                          key={route._id}
                          className="border-b hover:bg-gray-100 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">
                            {route.code}
                          </td>
                          <td className="px-4 py-3">
                            {route.destination.from}
                          </td>
                          <td className="px-4 py-3">{route.destination.to}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                route.is_active ? "default" : "destructive"
                              }
                              className="uppercase"
                            >
                              {route.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/search/${route.destination.from}-${
                                route.destination.to
                              }?departureStation=${
                                route.stations.from._id
                              }&arrivalStation=${
                                route.stations.to._id
                              }&departureDate=${new Date()
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .reverse()
                                .join("-")}&adult=1&children=0`}
                              className="text-primary hover:underline"
                            >
                              Search Route
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No routes available for this operator.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white shadow-md rounded-lg border p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center">
                <BuildingIcon className="w-6 h-6 mr-3" />
                About {operator.name}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {operator.name} is a trusted bus operator based in{" "}
                  {operator.company_metadata.country}. With a commitment to
                  providing safe and comfortable travel experiences, they
                  operate {routes.length} routes across various destinations.
                </p>
                <p>
                  Whether you're planning a short trip or a long-distance
                  journey, {operator.name} offers reliable transportation
                  services to meet your travel needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorRoutesPage;
