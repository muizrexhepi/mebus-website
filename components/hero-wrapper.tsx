"use client";

import useIsMobile from "@/components/hooks/use-mobile";
import Hero from "@/components/home/Hero";
import MobileHero from "@/components/mobile/mobile-hero";

const HeroWrapper = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHero /> : <Hero />;
};

export default HeroWrapper;
