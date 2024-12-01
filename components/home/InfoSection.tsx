import Image from "next/image";
import React from "react";

const FeaturesSection = () => {
  return (
    <div className="w-full bg-primary-bg/5 py-12 overflow-hidden ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Feature 1 */}
          <div className="flex-1 group">
            <div className="relative mb-8">
              {/* Background blobs */}
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 scale-90 group-hover:scale-95 transition-transform" />
              <div className="absolute inset-0 bg-red-100 rounded-full opacity-20 -rotate-6 group-hover:rotate-0 transition-transform" />
              {/* <Image
                alt="Info Image 1"
                width={500}
                height={500}
                className="w-full h-full object-contain rounded-xl z-10"
                src={"/assets/icons/infoimg1.svg"}
              /> */}
              {/* Illustration */}
              <div className="relative aspect-square p-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-8 bg-primary-bg rounded-lg" />
                    <div className="w-16 h-8 bg-red-500 rounded-lg" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-32 h-16 bg-primary-bg rounded-xl transform rotate-3 group-hover:rotate-0 transition-transform" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary-bg mb-4">
              Compare bus prices across providers
            </h3>
            <p className="text-gray-600">
              Find the best deals by comparing prices from multiple bus
              operators in one place. Save time and money on your journey.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex-1 group">
            <div className="relative mb-8">
              {/* Background blobs */}
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 scale-90 group-hover:scale-95 transition-transform" />
              <div className="absolute inset-0 bg-red-100 rounded-full opacity-20 -rotate-6 group-hover:rotate-0 transition-transform" />

              {/* Illustration */}
              {/* <Image
                alt="Info Image 1"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-xl z-10"
                src={"/assets/icons/infoimg2.svg"}
              /> */}
              <div className="relative aspect-square p-8">
                <div className="bg-white rounded-full w-32 h-32 shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-2 bg-pink-100 rounded-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-pink-500 rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-24 h-12 bg-green-500 rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform opacity-40" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary-bg mb-4">
              Book tickets instantly
            </h3>
            <p className="text-gray-600">
              Easy and secure booking process with instant confirmation. Get
              your e-tickets delivered right to your phone.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex-1 group">
            <div className="relative mb-8">
              {/* Background blobs */}
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 scale-90 group-hover:scale-95 transition-transform" />
              <div className="absolute inset-0 bg-red-100 rounded-full opacity-20 -rotate-6 group-hover:rotate-0 transition-transform" />
              {/* <Image
                alt="Info Image 1"
                width={500}
                height={500}
                className="w-full h-full object-contain rounded-xl z-10"
                src={"/assets/icons/infoimg3.svg"}
              /> */}
              {/* Illustration */}
              <div className="relative aspect-square p-8">
                <div className="bg-white rounded-2xl w-48 h-24 shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <div className="absolute top-3 left-3 w-6 h-6 bg-primary-bg rounded-full" />
                  <div className="absolute bottom-3 right-3 w-16 h-3 bg-gray-300 rounded-full" />
                </div>
                <div className="absolute top-4 right-8 w-12 h-12 bg-yellow-400 rounded-lg transform rotate-45 group-hover:rotate-0 transition-transform opacity-40" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary-bg mb-4">
              Track your journey
            </h3>
            <p className="text-gray-600">
              Real-time updates on bus location, arrival times, and any schedule
              changes. Stay informed throughout your trip.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
