"use client";

import React, { createContext, useContext, useState } from "react";

type Currency = {
  code: string;
  symbol: string;
  rate: number;
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertToEUR: (amount: number) => number;
  convertFromEUR: (amount: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>({
    code: "EUR",
    symbol: "€",
    rate: 1,
  });

  const convertToEUR = (amount: number) => amount / currency.rate;
  const convertFromEUR = (amount: number) => amount * currency.rate;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertToEUR, convertFromEUR }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
