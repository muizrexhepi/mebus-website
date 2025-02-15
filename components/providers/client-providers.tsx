"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactNode } from "react";
import { CurrencyProvider } from "./currency-provider";
import { StationProvider } from "./station-provider";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "./auth-provider";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
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
      </AuthProvider>
    </SessionProvider>
  );
}
