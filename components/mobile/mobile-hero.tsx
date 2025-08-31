import Image from "next/image";
import { SearchForm } from "../forms/SearchForm";
const LanguageSelector = dynamic(() => import("../dialogs/LanguageDialog"), {
  ssr: false,
});
import dynamic from "next/dynamic";

const MobileHero = () => {
  return (
    <>
      <div className="relative flex flex-col justify-between md:pb-20 bg-primary-bg/5 h-screen md:hidden">
        <div className="relative z-20 w-full">
          <div className="w-full relative aspect-[4/3] h-52">
            <Image
              src="/assets/images/mobileBG.webp"
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
          <div className="p-5 rounded-2xl relative -top-14 z-10 bg-white m-4 shadow">
            <SearchForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHero;
