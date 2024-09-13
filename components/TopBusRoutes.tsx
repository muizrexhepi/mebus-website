"use client";

import Image from "next/image";
import { SectionHeader } from "./section-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Bus, Cog, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface RouteProps {
  destination: string;
  busType: string;
  image: string;
  startingPrice: number;
  provider: string;
  url: string;
}

const testRoutes: RouteProps[] = [
  {
    destination: "Berlin to Munich",
    busType: "Express",
    image: "/assets/images/munich.jpg",
    startingPrice: 25,
    provider: "FlixBus",
    url: "/search/berlin-munich",
  },
  {
    destination: "Hamburg to Cologne",
    busType: "Standard",
    image: "/assets/images/cologne.webp",
    startingPrice: 20,
    provider: "Eurolines",
    url: "/search/hamburg-cologne",
  },
  {
    destination: "Munich to Hamburg",
    busType: "Luxury",
    image: "/assets/images/hamburg.jpg",
    startingPrice: 35,
    provider: "DB Bus",
    url: "/search/munich-hamburg",
  },
  {
    destination: "Cologne to Berlin",
    busType: "Express",
    image: "/assets/images/berlin.jpg",
    startingPrice: 28,
    provider: "FlixBus",
    url: "/search/cologne-berlin",
  },
];

const TopBusRoutes = () => {
  return (
    <div className="paddingX py-12 space-y-8">
      <SectionHeader
        title="Top bus routes this month"
        desc="Explore the trendiest travel destinations for an unforgettable journey"
      />
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testRoutes.map((route, index) => (
          <Block key={index} {...route} />
        ))}
      </div>
    </div>
  );
};

export default TopBusRoutes;

const Block: React.FC<RouteProps> = ({ ...route }) => {
  const router = useRouter();
  return (
    <div
      className="relative min-w-full w-full h-fit cursor-pointer"
      onClick={() => router.push(`${route?.url}`)}
    >
      <Image
        width={1920}
        height={1080}
        alt="Clinic Image"
        src={route.image || "/images/clinicPlaceholder.png"}
        priority
        className="object-cover w-full h-[400px] rounded-xl bg-muted"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Heart className="text-background absolute top-4 right-4 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Favorite this route!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="mt-3 space-y-1">
        <p className="font-medium text-xl">{route.destination}</p>
        <div className="flex gap-2 items-center">
          <Cog className="text-muted-foreground" />
          <p className="text-base text-muted-foreground truncate">
            {route.busType}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Bus className="text-muted-foreground" />
          <p className="text-base text-muted-foreground truncate">
            {route.provider}
          </p>
        </div>
        <div>
          <p className="mt-3 text-muted-foreground text-sm">Start from</p>
          <p className="text-black font-medium text-2xl">
            ${route.startingPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
