"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, SearchIcon, MapPinIcon } from "lucide-react";
import { CompanyMetadata, Operator } from "@/models/operator";
import Image from "next/image";
import Link from "next/link";

const OperatorCard: React.FC<{ operator: Operator }> = ({ operator }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <CardContent className="p-0">
      <div className="aspect-[3/2] relative bg-gray-100">
        <Image
          src="/assets/images/kabashilogo.png"
          alt={operator.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg truncate">{operator.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPinIcon className="w-4 h-4" />
            <span>{operator.company_metadata?.country}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">4.8</span>
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">1,234</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">56</div>
            <div className="text-xs text-muted-foreground">Routes</div>
          </div>
        </div>

        <Link
          href={`/partners/active-operators/${operator._id}`}
          className="block w-full"
        >
          <Button variant="secondary" className="w-full">
            See More
          </Button>
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Active Operators
        </h1>
        <p className="text-muted-foreground">
          Find and explore our trusted bus operators
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search operators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredOperators.map((operator) => (
          <OperatorCard key={operator._id} operator={operator} />
        ))}
      </div>
    </div>
  );
};

export default ActiveOperators;
