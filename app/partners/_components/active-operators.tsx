"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, SearchIcon } from "lucide-react";
import { Operator } from "@/models/operator";
import Image from "next/image";
import Link from "next/link";

const OperatorCard: React.FC<{ operator: Operator }> = ({ operator }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow rounded-xl border-none">
    <CardContent className="p-0">
      <div className="w-full h-24 relative">
        <Image
          src="/assets/images/kabashilogo.png"
          alt={operator.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="w-full items-center justify-between flex">
            <h3 className="font-medium text-lg truncate">{operator.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary-accent/80 text-primary-accent/80" />
              <span className="font-medium text-primary-accent/80">4.8</span>
            </div>
          </div>
        </div>

        <Link
          href={`/partners/active-operators/${operator._id}`}
          className="flex w-full text-sm text-transparent font-normal button-gradient bg-clip-text"
        >
          See More
        </Link>
      </div>
    </CardContent>
  </Card>
);

const ActiveOperators: React.FC<{ operators: Operator[] }> = ({
  operators,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const countries = Array.from(
    new Set(operators.map((op) => op.company_metadata?.country))
  ).filter(Boolean);

  const filteredOperators = operators.filter((operator) => {
    const matchesSearch = operator.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCountry =
      selectedCountry === "all" ||
      operator.company_metadata?.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-left text-3xl text-transparent font-normal button-gradient bg-clip-text mb-2">
          Active Operators
        </h1>
        <p className="text-left text-base sm:text-lg text-black/60 max-w-2x">
          Find and explore our trusted bus operators
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search operators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-12 border-none shadow-sm rounded-xl"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[180px] h-12 border-none shadow-sm rounded-xl">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country} className="capitalize">
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredOperators.map((operator) => (
          <OperatorCard key={operator._id} operator={operator} />
        ))}
      </div>
    </div>
  );
};

export default ActiveOperators;
