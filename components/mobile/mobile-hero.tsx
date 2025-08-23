import Image from "next/image";
import { SearchForm } from "../forms/SearchForm";
import LanguageSelector from "../dialogs/LanguageDialog";

const MobileHero = () => {
  return (
    <>
      <div className="relative flex flex-col justify-between md:pb-20 bg-white md:hidden">
        <div className="relative z-20 w-full">
          <div className="w-full relative aspect-[4/3] h-52">
            <Image
              src="/assets/images/mobileBG.png"
              alt="Bus and Train Illustration"
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="absolute top-4 right-4 bg-white/70 pt-2 px-2 border-black/10 border rounded-xl">
            <LanguageSelector />
          </div>
          <div className="p-4 rounded-t-xl relative -top-8 z-10 bg-white">
            <SearchForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHero;
