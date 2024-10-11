import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col justify-start py-4 relative paddingX sm:pb-20 lg:pb-40">
      <div className="h-[50vh] bg-accent-foreground/80 w-full absolute top-0 left-0 z-[-1] overflow-hidden">
        <Image
          priority
          src={"/assets/images/mainBG.jpg"}
          alt="Background image"
          className="w-full h-full object-cover blur-sm z-[-1]"
          width={1920}
          height={1080}
        />
      </div>

      <Navbar className="max-w-6xl mx-auto" />
      <div className="space-y-4 sm:space-y-8 py-6 sm:py-0 w-full max-w-6xl md:mx-auto relative sm:top-20 lg:top-40">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white hidden sm:block">
          Navigate Roads <br className="block sm:hidden" /> with Comfort
        </h1>
        <SearchBlock />
      </div>
    </div>
  );
};

export default Hero;
