"use client";
import SearchBlock from "@/app/search/_components/SearchBlock";
import { Bus, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col justify-between pb-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-red-100 to-orange-100 blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-3xl opacity-30" />
        <Bus className="absolute -bottom-6 left-10 w-32 h-32 text-gray-200 opacity-40 transform -rotate-12" />
        <MapPin className="absolute top-20 right-10 w-20 h-20 text-gray-200 opacity-40 transform rotate-12" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto paddingX">
          <div className="space-y-8 pt-8 sm:pt-16 md:pt-20">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-left text-3xl sm:text-4xl text-transparent font-medium button-gradient bg-clip-text">
                {t("hero.title")}
              </h1>
              <p className="text-left text-base  text-black/50 max-w-2xl">
                Book your bus tickets for a comfortable journey
              </p>
            </div>

            <SearchBlock />

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:pt-8">
              <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Bus className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">Comfortable Buses</h3>
                  <p className="text-sm text-gray-600">
                    Modern fleet for your journey
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Multiple Routes</h3>
                  <p className="text-sm text-gray-600">
                    Connecting major cities
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Always here to help</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
