interface StructuredDataProps {
  routeData: {
    fromCity: string;
    toCity: string;
    minPrice: number;
    maxPrice: number;
    operators: any[];
    reviews: any[];
  };
}

export default function StructuredData({ routeData }: StructuredDataProps) {
  const { fromCity, toCity, minPrice, maxPrice, operators, reviews } =
    routeData;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: `Bus from ${fromCity} to ${toCity}`,
    description: `Book bus tickets from ${fromCity} to ${toCity}. Compare prices and schedules from multiple operators.`,
    fromLocation: {
      "@type": "Place",
      name: fromCity,
    },
    toLocation: {
      "@type": "Place",
      name: toCity,
    },
    provider: {
      "@type": "Organization",
      name: "GoBusly",
      url: "https://gobusly.com",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: minPrice,
      highPrice: maxPrice,
      priceCurrency: "EUR",
      offerCount: operators.length,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length,
      reviewCount: reviews.length,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
