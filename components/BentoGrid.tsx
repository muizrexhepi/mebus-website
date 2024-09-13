import { ArrowRight, Globe } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const BentoGrid = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 min-h-[70vh] h-screen md:h-[70vh] paddingX py-6">
      <div className="flex flex-col gap-4 w-full md:w-1/3 h-full">
        <div
          className="h-fit md:h-[60%]"
          style={{
            backgroundImage: `url(assets/images/mainBG.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 10,
          }}
        >
          <div className="h-full itmes-start justify-between bg-opacity-50 backdrop-blur-xl flex flex-col gap-4 p-5 rounded-xl">
            <span className="bg-muted-foreground/50 rounded-lg flex justify-center items-center p-3 w-fit">
              <Globe className="text-white h-5 w-5" />
            </span>
            <div className="space-y-2">
              <h1 className={"text-3xl font-medium text-white"}>
                Explore more, get out of your comfort zone
              </h1>
              <p className={"text-lg text-white/70"}>
                Book your perfect stay with us.
              </p>
            </div>

            <Button
              className="flex items-center gap-2 w-fit"
              variant={"outline"}
            >
              Book now
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div
          className="h-fit md:h-[40%] w-full flex items-start justify-end flex-col p-5 gap-2"
          style={{
            backgroundImage: `url(assets/images/bentoBusImage.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 10,
          }}
        >
          <p className="text-3xl font-medium text-white">Buses available</p>
          <p className="text-5xl text-white">13,240</p>
        </div>
      </div>
      <div
        className="w-full md:w-2/3 flex justify-center items-center h-full"
        style={{
          backgroundImage: `url(assets/images/bentoBusImage2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 10,
        }}
      >
        <p className="text-white text-3xl font-medium max-w-lg text-center">
          Beyond accomodation creating memories of a lifetime
        </p>
      </div>
    </div>
  );
};

export default BentoGrid;
