import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EuroIcon, ShieldCheckIcon, LeafIcon } from "lucide-react";

export default function WhyTravel() {
  return (
    <section className="py-12 bg-gray-50 w-full mx-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Why travel with bus?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <EuroIcon className="h-12 w-12 text-green-500 mb-2" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                Cheaper
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>It is cheaper than travelling by car, train or plane.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <ShieldCheckIcon className="h-12 w-12 text-blue-500 mb-2" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                Safer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>
                Modern long-distance buses are one of the safest ways to travel.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <LeafIcon className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                Greener
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>
                Bus has one of the lowest carbon footprint per km travelled.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
