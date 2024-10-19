import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BusFront, Home, HelpCircle, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <BusFront className="mx-auto h-24 w-24 text-primary mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! It looks like this bus stop doesn't exist.
        </p>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/" className="inline-flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help" className="inline-flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/routes" className="inline-flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Routes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
