"use client";

import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";
import Image from "next/image";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start py-4 relative paddingX sm:pb-20 lg:pb-40">
      <div className="h-[50vh] bg-accent-foreground/80 w-full absolute top-0 left-0 z-[-1] overflow-hidden">
        <Image
          priority
          src="/assets/images/mainBG.jpg"
          alt="Background image"
          className="w-full h-full object-cover blur-[2px] z-[-1]"
          width={1920}
          height={1080}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6PTw2ODk8RUhGR01RU1pWVl86WX19h6Kv/9j/" // Replace with your actual base64 blur data
          sizes="100vw"
          style={{
            transform: "scale(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-accent-foreground/40" />
      </div>

      <Navbar className="max-w-6xl mx-auto" />
      <div className="space-y-4 sm:space-y-8 py-6 sm:py-0 w-full max-w-6xl md:mx-auto relative sm:top-20 lg:top-40">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white hidden sm:block">
          {t("hero.title")}
        </h1>
        <SearchBlock />
      </div>
    </div>
  );
};

export default Hero;
