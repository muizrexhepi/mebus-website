import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import React from "react";

const InfoBlock = ({
  desc,
  title,
  href,
  className,
  required_full_url,
}: {
  desc: string;
  title: string;
  href?: string;
  className?: string;
  required_full_url?: boolean;
}) => {
  return (
    <div
      className={cn(
        "py-2 px-4 bg-gray-100 rounded-lg mt-2 font-light",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <InfoIcon />
        <p>
          {desc}{" "}
          <a
            href={
              required_full_url ? href : `/partners/active-operators/${href}`
            }
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
