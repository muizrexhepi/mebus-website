"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTicketAlt, FaCopy, FaCheck } from "react-icons/fa";

// Define types for discount code object
interface DiscountCode {
  code: string;
  percentage: string;
  validUntil: string;
  daysLeft: number;
  status: "active" | "expired";
}

export default function DiscountCodesPage() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading and checking localStorage for discount codes
    setLoading(true);
    setTimeout(() => {
      const storedCode = localStorage.getItem("discountCode");
      const expiration = localStorage.getItem("discountExpiration");
      const percentage = localStorage.getItem("discountPercentage");

      if (storedCode && expiration && new Date() < new Date(expiration || "")) {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        const daysLeft = Math.ceil(
          (expirationDate.getTime() - currentDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        setDiscountCodes([
          {
            code: storedCode,
            percentage: percentage || "5",
            validUntil: expirationDate.toLocaleDateString(),
            daysLeft,
            status: "active",
          },
        ]);
      } else {
        setDiscountCodes([]);
      }
      setLoading(false);
    }, 800);
  }, []);

  const copyToClipboard = (code: string): void => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-1">Discount Codes</h1>
      <p className="text-gray-500 mb-6">
        View and manage your available discount codes
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : discountCodes.length > 0 ? (
        <div className="space-y-4">
          {discountCodes.map((discount) => (
            <div
              key={discount.code}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <div className="p-5 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {discount.status === "active" ? "Active" : "Expired"}
                      </span>
                      {discount.daysLeft <= 5 && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          Expires soon
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {discount.percentage}% Discount
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Valid until {discount.validUntil} ({discount.daysLeft}{" "}
                      days left)
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(discount.code)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {copiedCode === discount.code ? (
                      <>
                        <FaCheck className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy className="h-3 w-3" />
                        <span>Copy code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded border flex justify-between items-center">
                  <code className="font-mono text-gray-700">
                    {discount.code}
                  </code>
                  <span className="text-xs text-gray-500">
                    Automatically applied at checkout
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full justify-center py-12 bg-white rounded-lg">
          <div className="relative w-64 h-64 mb-4">
            <Image
              src="/assets/icons/discount-illustration.svg"
              alt="No discount codes"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-2">
            No discount codes available
          </h3>
          <p className="text-center text-gray-600 mb-6 max-w-md">
            You don't have any active discount codes at the moment. Discount
            codes will appear here when you receive or activate them.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Explore deals
          </Button>
        </div>
      )}
    </div>
  );
}
