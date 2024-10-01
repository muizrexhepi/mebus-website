import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SecondaryFooter = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn("w-full py-4 px-4 sm:px-8 xl:px-0 mx-auto", className)}
    >
      <div className={cn("max-w-6xl mx-auto", className)}>
        <div className="flex flex-wrap justify-center sm:justify-between items-center border-t border-neutral-700 pt-4 gap-2">
          <p className="text-sm text-black/70">
            &copy; 2024 MebusTravel. All Rights Reserved.
          </p>
          <nav className="flex flex-wrap justify-center sm:jsutify-start gap-2 sm:gap-4 mt-2 sm:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/help"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Help
            </Link>
            <Link
              href="/contact"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/partner-login"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Partner Login
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SecondaryFooter;
