import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Booking, Flex } from "@/models/booking";
import {
  CalendarIcon,
  CheckCircleIcon,
  CreditCardIcon,
  DownloadIcon,
  UsersIcon,
  CircleDotIcon,
} from "lucide-react";
import { format } from "date-fns";

export const BookingConfirmation = ({ booking }: { booking: Booking }) => {
  const getFlexBadgeColor = (flex: Flex) => {
    switch (flex) {
      case Flex.PREMIUM:
        return "bg-emerald-500 text-white hover:bg-emerald-600";
      case Flex.BASIC:
        return "bg-blue-500 text-white hover:bg-blue-600";
      case Flex.NO_FLEX:
        return "bg-gray-500 text-white hover:bg-gray-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="shadow-lg border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Booking Confirmation
            </CardTitle>
            <Badge variant="secondary" className="capitalize font-normal">
              {booking.platform}
            </Badge>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Booking ID: {booking._id}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-emerald-700 text-sm">
            <CheckCircleIcon className="h-5 w-5 shrink-0" />
            <p className="font-medium">
              This confirms that your booking is legitimate and authorized.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDotIcon className="h-4 w-4 text-emerald-500" />
                  <span>From</span>
                </div>
                <p className="font-medium">{booking.labels.from_city}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.destinations.departure_station_label}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDotIcon className="h-4 w-4 text-emerald-500" />
                  <span>To</span>
                </div>
                <p className="font-medium">{booking.labels.to_city}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.destinations.arrival_station_label}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <InfoItem
                icon={CalendarIcon}
                label="Departure"
                value={format(
                  new Date(booking.departure_date),
                  "EEEE, dd MMM yyyy"
                )}
                subValue={format(new Date(booking.departure_date), "HH:mm")}
              />
              <InfoItem
                icon={UsersIcon}
                label="Passengers"
                value={`${booking.passengers.length} passenger(s)`}
                subValue={booking.passengers.map((p) => p.full_name).join(", ")}
              />
              <InfoItem
                icon={CreditCardIcon}
                label="Price"
                value={`$${booking.price.toFixed(2)}`}
                subValue={booking.metadata.transaction_id || ""}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">Travel Flex</span>
              <div>
                <Badge
                  className={`${getFlexBadgeColor(
                    booking.metadata.travel_flex
                  )} capitalize`}
                >
                  {booking.metadata.travel_flex.toLowerCase().replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>

        {booking.metadata.download_url && (
          <CardFooter className="pt-6">
            <Button asChild className="w-full" variant="outline">
              <a
                href={booking.metadata.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Download Ticket
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
}) => (
  <div className="flex gap-3">
    <Icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
    <div className="space-y-1 min-w-0">
      <div className="text-sm text-muted-foreground">{label}</div>
      <p className="font-medium">{value}</p>
      {subValue && (
        <p className="text-sm text-muted-foreground truncate">{subValue}</p>
      )}
    </div>
  </div>
);
