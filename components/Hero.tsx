import { getStationsByOperatorId } from "@/actions/station";
import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";
import Image from "next/image";
import { cn } from "@/lib/utils";

const operator_id = "66cba19d1a6e55b32932c59b";

const Hero = async () => {
  const stations = (await getStationsByOperatorId(operator_id)) || [];
  console.log({ stations });
  return (
    <div
      // style={{
      //   backgroundImage: `url(assets/images/mainBG.jpg)`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   borderRadius: 10,
      //   margin: 8,
      // }}
      className="sm:min-h-screen px-4 sm:px-8 flex flex-col justify-between p-8 relative"
    >
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
