"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactNode } from "react";
import { CurrencyProvider } from "./currency-provider";
import { StationProvider } from "./station-provider";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <StationProvider>
      <CurrencyProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </CurrencyProvider>
    </StationProvider>
  );
}
