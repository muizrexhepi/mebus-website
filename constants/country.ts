// data/countries.ts
export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const countries: Country[] = [
  { name: "North Macedonia", code: "MK", dialCode: "+389", flag: "🇲🇰" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Bulgaria", code: "BG", dialCode: "+359", flag: "🇧🇬" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Serbia", code: "RS", dialCode: "+381", flag: "🇷🇸" },
  { name: "Croatia", code: "HR", dialCode: "+385", flag: "🇭🇷" },
  { name: "Albania", code: "AL", dialCode: "+355", flag: "🇦🇱" },
  { name: "Montenegro", code: "ME", dialCode: "+382", flag: "🇲🇪" },
  { name: "Bosnia and Herzegovina", code: "BA", dialCode: "+387", flag: "🇧🇦" },
  { name: "Kosovo", code: "XK", dialCode: "+383", flag: "🇽🇰" },
  { name: "Slovenia", code: "SI", dialCode: "+386", flag: "🇸🇮" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Slovakia", code: "SK", dialCode: "+421", flag: "🇸🇰" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Luxembourg", code: "LU", dialCode: "+352", flag: "🇱🇺" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Estonia", code: "EE", dialCode: "+372", flag: "🇪🇪" },
  { name: "Latvia", code: "LV", dialCode: "+371", flag: "🇱🇻" },
  { name: "Lithuania", code: "LT", dialCode: "+370", flag: "🇱🇹" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Iceland", code: "IS", dialCode: "+354", flag: "🇮🇸" },
  { name: "Malta", code: "MT", dialCode: "+356", flag: "🇲🇹" },
  { name: "Cyprus", code: "CY", dialCode: "+357", flag: "🇨🇾" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "UAE", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
];

// Utility functions
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
};

export const calculateCountrySearchScore = (
  country: Country,
  searchTerm: string
): number => {
  const searchLower = searchTerm.toLowerCase().trim();
  const nameLower = country.name.toLowerCase();
  const codeLower = country.code.toLowerCase();
  const dialCode = country.dialCode.replace("+", "");

  if (!searchLower) return 0;

  const normalize = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  };

  const normalizedSearch = normalize(searchLower);
  const normalizedName = normalize(nameLower);

  let bestScore = 0;

  const candidates = [
    { text: nameLower, normalized: normalizedName, type: "name" },
    { text: codeLower, normalized: codeLower, type: "code" },
    { text: dialCode, normalized: dialCode, type: "dial" },
  ];

  for (const candidate of candidates) {
    if (!candidate.text) continue;

    let score = 0;

    if (
      candidate.text === searchLower ||
      candidate.normalized === normalizedSearch
    ) {
      score = 1000;
    } else if (
      candidate.text.startsWith(searchLower) ||
      candidate.normalized.startsWith(normalizedSearch)
    ) {
      score = 900 - searchLower.length;
    } else if (
      candidate.text.includes(" " + searchLower) ||
      candidate.normalized.includes(" " + normalizedSearch)
    ) {
      score = 800;
    } else if (
      candidate.text.includes(searchLower) ||
      candidate.normalized.includes(normalizedSearch)
    ) {
      score = 700 - candidate.text.indexOf(searchLower);
    } else {
      const distance1 = levenshteinDistance(searchLower, candidate.text);
      const distance2 = levenshteinDistance(
        normalizedSearch,
        candidate.normalized
      );
      const minDistance = Math.min(distance1, distance2);
      const maxLength = Math.max(searchLower.length, candidate.text.length);

      if (minDistance <= Math.max(2, Math.floor(maxLength * 0.4))) {
        const similarity = 1 - minDistance / maxLength;
        score = Math.floor(similarity * 600);
      }
    }

    if (candidate.type === "name" && score > 0) {
      score += 20;
    } else if (
      candidate.type === "code" &&
      score > 0 &&
      searchLower.length <= 3
    ) {
      score += 15;
    } else if (
      candidate.type === "dial" &&
      score > 0 &&
      /^\d+$/.test(searchLower)
    ) {
      score += 10;
    }

    bestScore = Math.max(bestScore, score);
  }

  return bestScore;
};

export const searchCountries = (searchTerm: string): Country[] => {
  if (!searchTerm.trim()) {
    return countries;
  }

  const countriesWithScores = countries
    .map((country) => ({
      country,
      score: calculateCountrySearchScore(country, searchTerm),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.country.name.length !== b.country.name.length) {
        return a.country.name.length - b.country.name.length;
      }
      return a.country.name.localeCompare(b.country.name);
    })
    .slice(0, 30)
    .map((item) => item.country);

  return countriesWithScores;
};
