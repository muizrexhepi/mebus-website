// Mock data service - replace with actual API calls
export async function getRouteData(slug: string) {
  // Parse slug to get cities
  const [fromCity, toCity] = slug
    .split("-")
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

  // Mock data - replace with actual database queries
  const mockData = {
    fromCity,
    toCity,
    fromStation: {
      name: `${fromCity} Central Station`,
      city: fromCity,
      address: `Main Street, ${fromCity}`,
    },
    toStation: {
      name: `${toCity} Bus Terminal`,
      city: toCity,
      address: `Central Avenue, ${toCity}`,
    },
    distance: "450 km",
    duration: "6h 30m",
    minPrice: 25,
    maxPrice: 45,
    operators: [
      {
        name: "EuroLines",
        rating: 4.2,
        reviewCount: 156,
        amenities: ["wifi", "ac", "charging"],
        description: "Comfortable long-distance buses with modern amenities.",
      },
      {
        name: "FlixBus",
        rating: 4.0,
        reviewCount: 203,
        amenities: ["wifi", "ac"],
        description: "Affordable European bus network with reliable service.",
      },
    ],
    schedules: [
      {
        departureTime: "08:00",
        arrivalTime: "14:30",
        duration: "6h 30m",
        price: 25,
        operator: "FlixBus",
        amenities: ["wifi", "ac"],
        seatsAvailable: 12,
      },
      {
        departureTime: "14:00",
        arrivalTime: "20:30",
        duration: "6h 30m",
        price: 30,
        operator: "EuroLines",
        amenities: ["wifi", "ac", "charging"],
        seatsAvailable: 8,
      },
    ],
    reviews: [
      {
        name: "Maria K.",
        rating: 5,
        date: "2 days ago",
        comment:
          "Great service, comfortable seats and on-time departure. Would definitely book again!",
        route: `${fromCity} → ${toCity}`,
      },
      {
        name: "John D.",
        rating: 4,
        date: "1 week ago",
        comment:
          "Good value for money. The bus was clean and the driver was professional.",
        route: `${fromCity} → ${toCity}`,
      },
    ],
    relatedRoutes: [
      {
        from: fromCity,
        to: "Prague",
        price: 35,
        slug: `${fromCity.toLowerCase()}-prague`,
      },
      {
        from: "Vienna",
        to: toCity,
        price: 28,
        slug: `vienna-${toCity.toLowerCase()}`,
      },
      {
        from: fromCity,
        to: "Munich",
        price: 32,
        slug: `${fromCity.toLowerCase()}-munich`,
      },
    ],
    faqs: [
      {
        question: `How long does the bus journey from ${fromCity} to ${toCity} take?`,
        answer: `The journey typically takes around 6 hours and 30 minutes, depending on traffic and stops.`,
      },
      {
        question: "What amenities are available on the bus?",
        answer:
          "Most buses offer free Wi-Fi, air conditioning, power outlets, and comfortable reclining seats.",
      },
      {
        question: "Can I cancel or change my ticket?",
        answer:
          "Yes, you can cancel or modify your booking up to 15 minutes before departure, subject to the operator's terms.",
      },
      {
        question: "How much luggage can I bring?",
        answer:
          "You can bring one carry-on bag and one checked bag (up to 20kg) free of charge.",
      },
    ],
  };

  return mockData;
}
