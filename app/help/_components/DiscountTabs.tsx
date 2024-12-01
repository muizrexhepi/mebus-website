"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Percent, Users, Zap } from "lucide-react";

type Offer = {
  title: string;
  description: string;
  code: string;
  icon: string;
  expiry: string;
};

type OffersData = {
  current: Offer[];
  upcoming: Offer[];
};

export default function ClientMebusDiscountOffers({
  offers,
}: {
  offers: OffersData;
}) {
  const [activeTab, setActiveTab] = useState("current");

  const iconMap = {
    CalendarDays,
    Percent,
    Users,
    Zap,
  };

  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="current" onClick={() => setActiveTab("current")}>
          Current Offers
        </TabsTrigger>
        <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>
          Upcoming Offers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="current" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.current.map((offer, index) => (
            <OfferCard key={index} offer={offer} iconMap={iconMap} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.upcoming.map((offer, index) => (
            <OfferCard key={index} offer={offer} iconMap={iconMap} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function OfferCard({
  offer,
  iconMap,
}: {
  offer: Offer;
  iconMap: Record<string, React.ComponentType<any>>;
}) {
  const IconComponent = iconMap[offer.icon as keyof typeof iconMap];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {IconComponent && <IconComponent className="h-6 w-6" />}
          {offer.title}
        </CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use code: <span className="font-semibold">{offer.code}</span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Expires: {offer.expiry}</p>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
}
