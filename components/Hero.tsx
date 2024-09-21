import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";
import Image from "next/image";
import axios from "axios";
import { environment } from "@/environment";

const Hero = async () => {
  const res = await axios.get(`${environment.apiurl}/station`);
  const stations = res.data.data || [];

  return (
    <div className="sm:min-h-screen flex flex-col justify-between p-4 sm:p-8 relative paddingX">
      <Image
        priority
        src={"/assets/images/mainBG.jpg"}
        alt="Background image"
        className="w-full h-full absolute top-0 left-0 z-[-1]"
        width={1920}
        height={1080}
      />
      <Navbar />
      <div className="space-y-4 sm:space-y-8 py-6 sm:py-0">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white hidden sm:block">
          Navigate Roads <br className="block sm:hidden" /> with Comfort
        </h1>
        <SearchBlock stations={stations} />
      </div>
    </div>
  );
};

export default Hero;
