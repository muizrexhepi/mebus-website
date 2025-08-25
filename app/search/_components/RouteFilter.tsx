import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Route, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteFilterProps {
  hasDirectRoutes: boolean;
  hasIndirectRoutes: boolean;
  onFilterChange: (showDirectOnly: boolean) => void;
  totalDirectResults: number;
  totalIndirectResults: number;
}

const RouteFilter: React.FC<RouteFilterProps> = ({
  hasDirectRoutes,
  hasIndirectRoutes,
  onFilterChange,
  totalDirectResults,
  totalIndirectResults,
}) => {
  const [showDirectOnly, setShowDirectOnly] = useState(true);

  // Auto-show indirect routes if no direct routes available
  useEffect(() => {
    if (!hasDirectRoutes && hasIndirectRoutes) {
      setShowDirectOnly(false);
      onFilterChange(false);
    }
  }, [hasDirectRoutes, hasIndirectRoutes, onFilterChange]);

  const handleToggle = () => {
    const newValue = !showDirectOnly;
    setShowDirectOnly(newValue);
    onFilterChange(newValue);
  };

  // Don't show filter if only one type of route exists
  if (!hasDirectRoutes && !hasIndirectRoutes) return null;
  if (hasDirectRoutes && !hasIndirectRoutes) return null;
  if (!hasDirectRoutes && hasIndirectRoutes) return null;

  // Show toggle when both route types exist
  if (hasDirectRoutes && hasIndirectRoutes) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {showDirectOnly
              ? totalDirectResults
              : totalDirectResults + totalIndirectResults}{" "}
            results
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <Button
              variant={showDirectOnly ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                if (!showDirectOnly) handleToggle();
              }}
              className={cn(
                "h-8 px-3 text-xs font-medium transition-all rounded-md",
                showDirectOnly
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
            >
              <Zap className="h-3 w-3 mr-1" />
              Direct only
            </Button>
            <Button
              variant={!showDirectOnly ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                if (showDirectOnly) handleToggle();
              }}
              className={cn(
                "h-8 px-3 text-xs font-medium transition-all rounded-md",
                !showDirectOnly
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
            >
              <Route className="h-3 w-3 mr-1" />
              All routes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RouteFilter;
