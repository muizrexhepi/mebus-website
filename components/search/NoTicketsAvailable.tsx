import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarX, Search } from "lucide-react";

export default function NoTicketsAvailable() {
  return (
    <Card className="w-full mx-auto text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <CalendarX className="w-6 h-6 text-muted-foreground" />
          <span>No Tickets Available</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground max-w-md text-center mx-auto">
          We couldn't find any tickets matching your search criteria. This could
          be due to the route, date, or availability.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground max-w-md text-center mx-auto">
          Try adjusting your search parameters or selecting a different date.
        </p>
      </CardFooter>
    </Card>
  );
}
