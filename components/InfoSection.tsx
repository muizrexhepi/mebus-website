import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheckIcon,
  CompassIcon,
  GlobeIcon,
  LeafIcon,
  ClockIcon,
  TicketIcon,
  HelpCircleIcon,
} from "lucide-react";

export default function InfoSection() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button variant="outline" className="flex-1 h-12">
          <ClockIcon className="mr-2 h-4 w-4" />
          Track Your Journey
        </Button>
        <Button variant="outline" className="flex-1 h-12">
          <TicketIcon className="mr-2 h-4 w-4" />
          Manage Reservation
        </Button>
        <Button variant="outline" className="flex-1 h-12">
          <HelpCircleIcon className="mr-2 h-4 w-4" />
          Customer Support
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-t-4 border-blue-500">
          <CardHeader>
            <ShieldCheckIcon className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle className="text-lg font-semibold">
              Safety First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              We prioritize your safety with rigorous health protocols and
              well-maintained vehicles.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto text-blue-500">
              Our safety measures &gt;
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white border-t-4 border-green-500">
          <CardHeader>
            <CompassIcon className="h-8 w-8 text-green-500 mb-2" />
            <CardTitle className="text-lg font-semibold">
              Comfort on the Go
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Enjoy spacious seating, onboard entertainment, Wi-Fi, and
              convenient power outlets.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto text-green-500">
              Onboard amenities &gt;
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white border-t-4 border-purple-500">
          <CardHeader>
            <GlobeIcon className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle className="text-lg font-semibold">
              Extensive Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Access over 2,500 destinations across 35 European countries with
              EuroRide.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto text-purple-500">
              Explore our routes &gt;
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white border-t-4 border-yellow-500">
          <CardHeader>
            <LeafIcon className="h-8 w-8 text-yellow-500 mb-2" />
            <CardTitle className="text-lg font-semibold">
              Eco-Friendly Travel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Choose sustainable travel with our fuel-efficient fleet and carbon
              offset programs.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto text-yellow-500">
              Our green initiatives &gt;
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
