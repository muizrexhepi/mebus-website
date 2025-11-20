"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  BusFront,
  Frown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card"; // Reduced card parts for minimalism
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For a consistent logo display
import { Skeleton } from "@/components/ui/skeleton"; // Good for loading states
import { Operator } from "@/models/operator";

const OperatorCard: React.FC<{ operator: Operator }> = ({ operator }) => (
  <Link
    href={`/bus-operators/${operator._id}`}
    className="group block h-full focus:outline-none"
  >
    <Card
      className="h-full border-none bg-white rounded-xl shadow-sm 
                     transition-all duration-200 ease-in-out
                      flex flex-col"
    >
      <CardContent className="p-6 flex flex-col items-center text-center flex-1">
        {/* Logo/Avatar */}
        <Avatar className="w-20 h-20 mb-4 bg-gray-50 border border-gray-100 p-2 group-hover:bg-primary/5 transition-colors">
          <AvatarImage
            src={operator.company_metadata?.logo || ""}
            alt={operator.name}
            className="object-contain"
          />
          <AvatarFallback className="text-xl font-semibold text-primary/80">
            {operator.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Operator Name */}
        <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors">
          {operator.name}
        </h3>

        {/* Location & Rating */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
            <span className="capitalize">
              {operator.company_metadata?.country || "Worldwide"}
            </span>
          </div>
          {/* <span className="text-gray-300">•</span>
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 mr-1 fill-amber-400 stroke-amber-500" />
            <span>4.8</span>
          </div> */}
        </div>

        {/* Verified Badge */}
        {operator.confirmation?.is_confirmed && (
          <Badge
            variant="secondary"
            className="bg-green-50 text-green-700 border border-green-100 px-2 py-1 text-xs font-medium"
          >
            <ShieldCheck className="w-3 h-3 mr-1" /> Verified Partner
          </Badge>
        )}
      </CardContent>

      {/* Subtle "See More" Call to Action */}
      <div
        className="w-full text-center py-3 border-t border-gray-100 text-sm font-medium text-primary-light 
                      transition-colors duration-200 flex items-center justify-center"
      >
        See Details{" "}
        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1 group-hover:text-primary-accent" />
      </div>
    </Card>
  </Link>
);

const ActiveOperators: React.FC<{ operators: Operator[] }> = ({
  operators,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const countries = useMemo(() => {
    return Array.from(
      new Set(operators.map((op) => op.company_metadata?.country))
    )
      .filter(Boolean)
      .sort();
  }, [operators]);

  // Filter operators based on search and country
  const filteredOperators = useMemo(() => {
    return operators.filter((operator) => {
      const matchesSearch = operator.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry =
        selectedCountry === "all" ||
        operator.company_metadata?.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [operators, searchQuery, selectedCountry]);

  // Simulate a slight delay for better UX on filter/search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    setTimeout(() => setIsLoading(false), 300); // Debounce or actual loading logic
  };

  const handleCountryChange = (value: string) => {
    setIsLoading(true);
    setSelectedCountry(value);
    setTimeout(() => setIsLoading(false), 300); // Debounce or actual loading logic
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search operator by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-12 bg-white border-none shadow-sm rounded-lg text-base
                       "
          />
        </div>

        <div className="sm:w-[220px]">
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger
              className="w-full h-12 bg-white border-none shadow-sm rounded-lg text-gray-700
                                      "
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Filter by Country" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="capitalize"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-1">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {filteredOperators.length}
          </span>{" "}
          operators found
        </p>
      </div>

      {/* Grid Results or Skeleton/No Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card
              key={i}
              className="h-[280px] border-none bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center"
            >
              <Skeleton className="w-20 h-20 rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-6 w-[120px]" />
            </Card>
          ))}
        </div>
      ) : filteredOperators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOperators.map((operator) => (
            <OperatorCard key={operator._id} operator={operator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Frown className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            No operators found
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2">
            We couldn't find any operators matching "{searchQuery}" in{" "}
            {selectedCountry === "all" ? "any country" : selectedCountry}.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setSelectedCountry("all");
            }}
            className="mt-4 text-primary font-semibold"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveOperators;
