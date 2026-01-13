"use client";
import Hero from "@/components/home/Hero";
import MobileHero from "@/components/mobile/mobile-hero";
import useIsMobile from "./hooks/use-mobile";

const HeroWrapper = () => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <MobileHero /> : <Hero />}</>;
};

export default HeroWrapper;
