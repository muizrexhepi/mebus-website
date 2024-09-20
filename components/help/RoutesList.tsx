import { Route } from "@/models/route";
import { MapPin, Briefcase, CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RoutesListProps {
  routes: Route[];
}

export default function RoutesList({ routes }: RoutesListProps) {
  if (routes.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-muted-foreground">
          No routes available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {routes.map((route) => (
        <Card key={route._id}>
          <CardHeader>
            <CardTitle>
              {route.destination.from} to {route.destination.to}
            </CardTitle>
            <CardDescription>
              Operated by{" "}
              {typeof route.operator === "string"
                ? route.operator
                : route.operator.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Route Details</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>
                  Luggage: {route.luggages.free} free, extra costs{" "}
                  {route.luggages.price_for_extra}
                </span>
              </div>
              <div className="flex items-center text-sm">
                {route.is_active ? (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    route.is_active ? "text-green-500" : "text-red-500"
                  }
                >
                  {route.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
