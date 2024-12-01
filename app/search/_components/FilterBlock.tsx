"use client";
import React, { useState } from "react";

export type DataProps = {
  value: string;
  label: string;
}[];

const FilterBlock = ({ title, data }: { title: string; data: DataProps }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="rounded-xl flex flex-col gap-4 p-6 shadow-sm bg-white">
      <h1 className="font-medium text-black text-xl">{title}</h1>
      <div className="flex flex-col gap-2 items-start">
        {data.map((item, index) => (
          <div
            key={index}
            className="text-black flex justify-between items-center"
          >
            <label className="flex items-center gap-2 ">
              <input
                type="radio"
                name="filter-radio"
                className="accent-emerald-700 h-4 w-4 !after:bg-white"
                checked={selectedValue === item.value}
                onChange={() => handleChange(item.value)}
              />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBlock;
