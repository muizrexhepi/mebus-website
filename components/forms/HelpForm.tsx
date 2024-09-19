"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const HelpForm = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <Input
        type="search"
        placeholder="Search for help topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
};

export default HelpForm;
