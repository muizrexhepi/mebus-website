import { Star, Wifi, Zap, Snowflake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OperatorCardProps {
  operator: {
    name: string;
    logo?: string;
    rating: number;
    reviewCount: number;
    amenities: string[];
    description: string;
  };
}

export default function OperatorCard({ operator }: OperatorCardProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "ac":
        return <Snowflake className="w-4 h-4" />;
      case "charging":
        return <Zap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            {operator.logo ? (
              <img
                src={operator.logo || "/placeholder.svg"}
                alt={operator.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-sm font-bold text-gray-600">
                {operator.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{operator.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{operator.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({operator.reviewCount} reviews)
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2">{operator.description}</p>

            <div className="flex items-center space-x-2 mt-3">
              {operator.amenities.map((amenity, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  {getAmenityIcon(amenity)}
                  <span className="capitalize">{amenity}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
