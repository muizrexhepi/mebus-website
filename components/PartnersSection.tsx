import React from "react";

const PartnersSection = () => {
  // Sample array of partner logos - replace src with actual logo paths
  const partners = [
    { name: "Hak Bus", src: "/assets/images/hakbus.png" },
    { name: "Ido Tours", src: "/assets/images/idotours.png" },
    { name: "Euro Bus", src: "/assets/images/eurobus.png" },
    { name: "Euro Turist", src: "/assets/images/euroturist.png" },
    { name: "Nasir Tours", src: "/assets/images/nasiri.png" },
    { name: "Bashkim Tours", src: "/assets/images/bashkimi.png" },
    { name: "Hisar Turizam", src: "/assets/images/hisar.png" },
    { name: "Amr Tours", src: "/assets/images/amr.png" },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content section */}
          <div className="space-y-6 max-w-xl">
            <h2 className="text-4xl font-bold text-primary-bg">
              All your bus travel options in one place
            </h2>
            <p className="text-gray-600 text-base">
              More than 500 trusted bus operators nationwide, from intercity
              coaches to local shuttles, so you can focus on your journey
              without the hassle of visiting multiple websites.
            </p>
            <button className="button-gradient text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Get started
            </button>
          </div>

          {/* Right logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center group"
              >
                <div className="relative w-full aspect-[3/1]">
                  <img
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary-bg/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
