import React from "react";
import { Metadata } from "next";
import axios from "axios";
import { environment } from "@/environment";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BusIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  LuggageIcon,
  TicketIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Route } from "@/models/route";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const operatorRes = await axios.get(
    `${environment.apiurl}/operator/${params.id}`
  );
  const operator = operatorRes.data.data;

  return {
    title: `${operator.name} Routes | Busly`,
    description: `View all bus routes operated by ${operator.name}. Detailed information on destinations, stations, and luggage policies.`,
  };
}

const RouteCard: React.FC<{ route: Route }> = ({ route }) => (
  <Card className="mb-6">
    <CardHeader className="bg-emerald-700 text-white">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold flex items-center">
          <BusIcon className="mr-2" />
          {route.code}
        </CardTitle>
        <Badge className={route.is_active ? "bg-success" : "bg-destructive"}>
          {route.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <MapPinIcon className="w-5 h-5 mr-2 text-emerald-700" />
          <span className="font-semibold">{route.destination.from}</span>
        </div>
        <span className="text-gray-500">
          <ArrowRightIcon className="w-6 h-6 text-gray-400" />
        </span>
        <div className="flex items-center">
          <span className="font-semibold">{route.destination.to}</span>
          <MapPinIcon className="w-5 h-5 ml-2 text-emerald-700" />
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <PhoneIcon className="w-4 h-4 mr-2 text-emerald-700" />
          {route.contact.phone}
        </div>
        <div className="flex items-center">
          <MailIcon className="w-4 h-4 mr-2 text-emerald-700" />
          {route.contact.email}
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-md">
        <h1 className="font-semibold mb-2 flex items-center">
          <LuggageIcon className="w-5 h-5 mr-2 text-emerald-700" />
          Luggage Policy
        </h1>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>Free: {route.luggages.free}</div>
          <div>Extra: ${route.luggages.price_for_extra}</div>
          <div>Size: {route.luggages.size}</div>
        </div>
      </div>

      {/* <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <TicketIcon className="w-4 h-4 mr-2 text-emerald-700" />
          Tickets Sold: {route?.metadata?.sold}
        </div>
        <div>
          Auto-generate Tickets:{" "}
          {route.generate_tickets_automatically ? "Yes" : "No"}
        </div>
      </div> */}
    </CardContent>
  </Card>
);

const OperatorRoutesPage: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const routesRes = await axios.get(
    `${environment.apiurl}/route/operator/${id}`
  );
  const routes: Route[] = routesRes.data.data;

  const operatorRes = await axios.get(`${environment.apiurl}/operator/${id}`);
  const operator = operatorRes.data.data;

  console.log({ routes, operator });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-6 text-neutral-800">
          Routes operated by {operator.name}
        </h1>

        {routes.length > 0 ? (
          routes.map((route) => <RouteCard key={route._id} route={route} />)
        ) : (
          <p className="text-gray-500">
            No routes available for this operator.
          </p>
        )}
      </main>

      <SecondaryFooter />
    </div>
  );
};

export default OperatorRoutesPage;
