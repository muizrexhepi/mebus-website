import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-6 relative w-full h-72">
          <Image
            src="/assets/icons/error-404.svg"
            alt="404 Error"
            fill
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! It looks like the page you're looking for doesn't exist.
        </p>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            Where would you like to go?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="default">
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
