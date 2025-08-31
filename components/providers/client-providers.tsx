"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StationProvider } from "./station-provider";
import { SessionProvider } from "next-auth/react";

const AuthProvider = dynamic(() => import("./auth-provider"), { ssr: false });

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <StationProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StationProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
