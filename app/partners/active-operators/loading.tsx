import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen">
      <Loader className="h-12 w-12 m-auto my-12 animate-spin" />
    </div>
  );
};

export default Loading;
