"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  children,
  className,
}) => {
  return (
    <div className={cn("w-full space-y-1", className)}>
      <label className="uppercase text-black/50 font-medium text-xs hidden sm:block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={cn("relative", error && "")}>
        {children}
        {error && (
          <p className="text-red-500 text-xs mt-1 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
