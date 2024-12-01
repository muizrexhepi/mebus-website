import React from "react";

const AboutSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-primary-bg mb-8">
        Simplifying Bus Travel Across Europe and the Balkans
      </h1>

      {/* Introduction */}
      <div className="space-y-6 text-gray-700 mb-12">
        <p>
          Welcome to <b>GoBusly</b>, your go-to platform for seamless bus travel
          across Europe and the Balkans. Whether you&apos;re traveling between
          bustling cities or heading to charming towns and villages, GoBusly
          connects you to the region&apos;s most reliable bus operators.
        </p>

        <p>
          Our platform offers access to a wide network of trusted operators,
          ensuring coverage for both popular routes and off-the-beaten-path
          destinations. From modern coaches with premium amenities to
          budget-friendly options, GoBusly caters to every traveler&apos;s
          needs, making your journey as comfortable and convenient as possible.
        </p>

        <p>
          With GoBusly, you can easily explore destinations in countries like
          Albania, North Macedonia, Serbia, Greece, and beyond. Discover the
          beauty of the Balkans with a reliable booking platform that simplifies
          your travel plans.
        </p>
      </div>

      {/* Operators and Features Section */}
      <h2 className="text-3xl font-bold text-primary-bg mb-6">
        Connecting You to Trusted Bus Operators
      </h2>

      <div className="space-y-6 text-gray-700">
        <p>
          GoBusly collaborates with leading bus operators across Europe and the
          Balkans, offering a variety of services tailored to your travel needs.
          Whether you&apos;re booking an express route between major cities or a
          local connection to smaller towns, you&apos;ll find dependable options
          on our platform.
        </p>

        <p>
          Our platform features user-friendly search tools that let you filter
          by operator, route, and amenities. With accurate schedules,
          competitive prices, and multiple daily departures, GoBusly ensures
          you&apos;ll find a bus that fits your schedule and budget.
        </p>

        <p className="text-blue-800 hover:text-blue-700 cursor-pointer">
          Explore operators and routes available on GoBusly →
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
