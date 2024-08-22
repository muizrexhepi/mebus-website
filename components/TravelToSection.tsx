import { SectionHeader } from "./section-header";
import { Button } from "./ui/button";

const TEST_DESTINATIONS = [
  { title: "Paris", url: "https://example.com/paris" },
  { title: "New York", url: "https://example.com/new-york" },
  { title: "Tokyo", url: "https://example.com/tokyo" },
  { title: "London", url: "https://example.com/london" },
  { title: "Sydney", url: "https://example.com/sydney" },
  { title: "Rome", url: "https://example.com/rome" },
  { title: "Dubai", url: "https://example.com/dubai" },
  { title: "Barcelona", url: "https://example.com/barcelona" },
  { title: "Amsterdam", url: "https://example.com/amsterdam" },
  { title: "Berlin", url: "https://example.com/berlin" },
  { title: "San Francisco", url: "https://example.com/san-francisco" },
  { title: "Singapore", url: "https://example.com/singapore" },
  { title: "Hong Kong", url: "https://example.com/hong-kong" },
  { title: "Los Angeles", url: "https://example.com/los-angeles" },
  { title: "Vienna", url: "https://example.com/vienna" },
  { title: "Istanbul", url: "https://example.com/istanbul" },
  { title: "Moscow", url: "https://example.com/moscow" },
  { title: "Cape Town", url: "https://example.com/cape-town" },
  { title: "Rio de Janeiro", url: "https://example.com/rio-de-janeiro" },
  { title: "Mexico City", url: "https://example.com/mexico-city" },
  { title: "Athens", url: "https://example.com/athens" },
  { title: "Seoul", url: "https://example.com/seoul" },
  { title: "Bangkok", url: "https://example.com/bangkok" },
  { title: "Prague", url: "https://example.com/prague" },
  { title: "Florence", url: "https://example.com/florence" },
  { title: "Buenos Aires", url: "https://example.com/buenos-aires" },
  { title: "Lisbon", url: "https://example.com/lisbon" },
  { title: "Chicago", url: "https://example.com/chicago" },
  { title: "Toronto", url: "https://example.com/toronto" },
  { title: "Venice", url: "https://example.com/venice" },
];

const TravelToSection = () => {
  return (
    <div className="px-4 sm:px-8 py-8 space-y-8">
      <SectionHeader
        title="Ready for your next journey?"
        desc="Discover most affordable bus and travel options to popular destinations below."
      />
      <div className="flex overflow-x-auto xl:flex-wrap gap-4">
        {TEST_DESTINATIONS.map((destination, index) => (
          <Button key={index} variant={"outline"} className="rounded-xl">
            Travel to {destination.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TravelToSection;
