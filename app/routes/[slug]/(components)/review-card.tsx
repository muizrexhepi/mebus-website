import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  review: {
    name: string;
    rating: number;
    date: string;
    comment: string;
    route: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{review.name}</h4>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">• {review.route}</span>
            </div>

            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
