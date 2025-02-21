import React, { createContext, useContext, useState, useEffect } from "react";
import { getStations } from "@/actions/station";
import { Station } from "@/models/station";

interface StationContextProps {
  stations: Station[];
  loading: boolean;
  error: string | null;
  refreshStations: () => Promise<void>;
}

const StationContext = createContext<StationContextProps | undefined>(
  undefined
);

export const StationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedStations = await getStations();
      setStations(fetchedStations);
      console.log({ fetchedStations });
    } catch (err) {
      console.error("Error fetching stations:", err);
      setError("Failed to fetch stations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <StationContext.Provider
      value={{
        stations,
        loading,
        error,
        refreshStations: fetchStations,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error("useStations must be used within a StationProvider");
  }
  return context;
};
