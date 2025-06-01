// utils/seoKeywords.ts

export interface KeywordParams {
  fromCity: string;
  toCity: string;
}

export function generateSEOKeywords({
  fromCity,
  toCity,
}: KeywordParams): string {
  const routeKeywords = [
    // Primary route keywords (both directions)
    `bus ${fromCity} to ${toCity}`,
    `bus from ${fromCity} to ${toCity}`,
    `${fromCity} to ${toCity} bus`,
    `${toCity} to ${fromCity} bus`,
    `bus ${toCity} to ${fromCity}`,
    `bus from ${toCity} to ${fromCity}`,
  ];

  const ticketKeywords = [
    // Ticket-focused keywords
    `bus tickets ${fromCity} to ${toCity}`,
    `${toCity} to ${fromCity} bus tickets`,
    `${fromCity} ${toCity} bus tickets`,
    `${toCity} ${fromCity} bus tickets`,
    `cheap bus tickets ${fromCity}`,
    `cheap bus tickets ${toCity}`,
    `cheap bus tickets ${fromCity} to ${toCity}`,
    `discount bus tickets ${fromCity}`,
    `discount bus tickets ${toCity}`,
  ];

  const bookingKeywords = [
    // Booking and reservation keywords
    `${fromCity} ${toCity} bus booking`,
    `${toCity} ${fromCity} bus booking`,
    `book bus ${fromCity} ${toCity}`,
    `book bus ${toCity} ${fromCity}`,
    `reserve bus ${fromCity} to ${toCity}`,
    `online bus booking ${fromCity}`,
    `bus reservation ${fromCity} to ${toCity}`,
  ];

  const transportTypeKeywords = [
    // Transport type variations
    `${fromCity} to ${toCity} coach`,
    `${toCity} to ${fromCity} coach`,
    `${fromCity} ${toCity} intercity bus`,
    `${fromCity} ${toCity} express bus`,
    `${fromCity} ${toCity} direct bus`,
    `${fromCity} ${toCity} overnight bus`,
    `${fromCity} ${toCity} daily bus`,
  ];

  const scheduleKeywords = [
    // Schedule and timing keywords
    `${fromCity} ${toCity} bus schedule`,
    `${fromCity} ${toCity} bus timetable`,
    `${fromCity} ${toCity} bus times`,
    `${fromCity} ${toCity} departure times`,
    `what time bus ${fromCity} to ${toCity}`,
    `bus schedule ${fromCity} to ${toCity}`,
  ];

  const priceKeywords = [
    // Price and cost keywords
    `${fromCity} ${toCity} bus price`,
    `${fromCity} ${toCity} bus fare`,
    `${fromCity} ${toCity} bus cost`,
    `how much bus ${fromCity} to ${toCity}`,
    `bus price ${fromCity} to ${toCity}`,
    `cheapest bus ${fromCity} to ${toCity}`,
    `best price bus ${fromCity} to ${toCity}`,
  ];

  const travelKeywords = [
    // Travel and journey keywords
    `travel ${fromCity} to ${toCity} by bus`,
    `${fromCity} to ${toCity} bus journey`,
    `${fromCity} to ${toCity} bus trip`,
    `how to get from ${fromCity} to ${toCity}`,
    `transport ${fromCity} to ${toCity}`,
  ];

  const comparisonKeywords = [
    // Comparison keywords
    `compare bus ${fromCity} to ${toCity}`,
    `${fromCity} to ${toCity} bus comparison`,
    `best bus ${fromCity} to ${toCity}`,
    `${fromCity} to ${toCity} bus companies`,
  ];

  const genericKeywords = [
    // Generic high-volume keywords
    "cheap bus tickets",
    "discount bus tickets",
    "bus booking online",
    "online bus booking",
    "bus reservation online",
    "intercity bus travel",
    "coach tickets",
    "bus comparison",
    "discount bus fares",
    "europe bus travel",
    "european bus travel",
    "balkan bus travel",
    "southeast europe bus",
    "online bus reservation",
    "bus ticket booking",
    "cheap coach tickets",
    "budget bus travel",
    "intercity coach",
    "express bus service",
    "long distance bus",
    "overnight bus travel",
    "international bus travel",
    "cross border bus",
    "bus travel europe",
    "eurolines alternative",
    "flixbus alternative",
    "omio alternative",
    "bus travel booking",
    "cheap european travel",
    "budget travel europe",
    "student bus travel",
    "backpacker bus",
    "group bus booking",
    "advance bus booking",
    "last minute bus tickets",
    "flexible bus tickets",
    "refundable bus tickets",
    "bus with wifi",
    "comfortable bus travel",
    "safe bus travel",
    "reliable bus service",
    "24/7 bus booking",
    "instant bus confirmation",
    "mobile bus tickets",
    "e-tickets bus",
    "paperless bus booking",
    "eco friendly travel",
    "carbon neutral bus",
    "sustainable travel",
    "green transportation",
  ];

  // Combine all keyword arrays
  return [
    ...routeKeywords,
    ...ticketKeywords,
    ...bookingKeywords,
    ...transportTypeKeywords,
    ...scheduleKeywords,
    ...priceKeywords,
    ...travelKeywords,
    ...comparisonKeywords,
    ...genericKeywords,
  ].join(", ");
}

// Optional: Export individual keyword categories for more granular control
export const keywordCategories = {
  route: (fromCity: string, toCity: string) => [
    `bus ${fromCity} to ${toCity}`,
    `bus from ${fromCity} to ${toCity}`,
    `${fromCity} to ${toCity} bus`,
    `${toCity} to ${fromCity} bus`,
  ],

  pricing: (fromCity: string, toCity: string) => [
    `cheap bus tickets ${fromCity}`,
    `${fromCity} ${toCity} bus price`,
    `cheapest bus ${fromCity} to ${toCity}`,
  ],

  generic: () => [
    "cheap bus tickets",
    "bus booking online",
    "intercity bus travel",
    "flixbus alternative",
    "omio alternative",
  ],
};
