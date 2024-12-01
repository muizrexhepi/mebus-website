"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactNode } from "react";
import { CurrencyProvider } from "./currency-provider";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
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
  );
}
