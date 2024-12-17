import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full justify-center items-center flex">
      <Loader2 className="h-10 w-10 animate-spin text-black" />
    </div>
  );
};

export default Loading;
