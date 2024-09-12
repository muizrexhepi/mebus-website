import { InfoIcon } from "lucide-react";
import React from "react";

const InfoBlock = ({
  desc,
  title,
  href,
}: {
  desc: string;
  title: string;
  href?: string;
}) => {
  return (
    <div className="py-2 px-4 bg-neutral-700/10 rounded-lg mt-2 font-light">
      <div className="flex items-start gap-2">
        <InfoIcon />
        <p>
          {desc}{" "}
          <a
            href={`/operators/${href}`}
            className="font-medium hover:underline"
          >
            {title}
          </a>
        </p>
      </div>
    </div>
  );
};

export default InfoBlock;
