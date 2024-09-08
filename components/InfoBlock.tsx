import { InfoIcon } from "lucide-react";
import React from "react";

const InfoBlock = ({ desc, title }: { desc: string; title: string }) => {
  return (
    <div className="py-2 px-4 bg-neutral-700/10 rounded-lg mt-2 font-light">
      <div className="flex items-start gap-2">
        <InfoIcon />
        <p>
          {desc} <span className="font-medium">{title}</span>
        </p>
      </div>
    </div>
  );
};

export default InfoBlock;
