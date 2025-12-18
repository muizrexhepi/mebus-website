import Hero from "@/components/home/Hero";
import MobileHero from "@/components/mobile/mobile-hero";

const HeroWrapper = () => {
  return (
    <>
      {/* Show on Mobile only (hidden on md and up) */}
      <div className="block md:hidden">
        <MobileHero />
      </div>

      {/* Show on Desktop only (hidden on small screens) */}
      <div className="hidden md:block">
        <Hero />
      </div>
    </>
  );
};

export default HeroWrapper;
