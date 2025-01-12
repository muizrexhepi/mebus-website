import Image from "next/image";
import { QrCode, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppDownloadSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-blue-50/50 flex items-center">
      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side with QR and illustrations */}
        <div className="relative">
          <div className="relative z-10 max-w-[400px] mx-auto">
            {/* Phone frame with QR code */}
            <div className="relative aspect-[320/650] bg-white rounded-[3rem] shadow-xl p-4 border-8 border-navy-900">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-navy-900 rounded-b-xl" />
              <div className="h-full w-full flex items-center justify-center bg-white">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-navy-900">
                    Scan to get the Gobusly app
                  </h3>
                  <QrCode className="w-48 h-48 mx-auto text-navy-900" />
                </div>
              </div>
            </div>

            {/* Decorative transportation illustrations */}
            <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-0 right-0">
              <div className="relative h-96">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Transportation illustration"
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy-900">
              Our free app
            </h1>
            <p className="text-lg text-gray-600">
              One app for every step of your journey—travel planning has never
              been easier!
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <QrCode className="w-6 h-6 text-navy-900" />
              <span className="text-lg">Mobile tickets</span>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-navy-900" />
              <span className="text-lg">Live journey updates</span>
            </div>
            <div className="flex items-center gap-4">
              <Heart className="w-6 h-6 text-navy-900" />
              <span className="text-lg">Travel inspiration</span>
            </div>
          </div>

          {/* App store buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="h-14 px-6 border-2" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/icons/appstore.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </a>
            </Button>
            <Button variant="outline" className="h-14 px-6 border-2" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/icons/googleplay.svg"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
