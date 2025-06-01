"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const DiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  useEffect(() => {
    const discountUsed = localStorage.getItem("discountUsed");

    if (!discountUsed) {
      setIsVisible(true);
    }

    const appliedDiscount = localStorage.getItem("discountCode");
    if (appliedDiscount) {
      setIsDiscountApplied(true);
    }
  }, []);

  const applyDiscount = () => {
    const discountCode = `FIRST100-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    localStorage.setItem("discountCode", discountCode);
    localStorage.setItem("discountExpiration", expirationDate.toISOString());
    localStorage.setItem("discountPercentage", "10");
    localStorage.setItem("discountUsed", "true");

    setIsDiscountApplied(true);
    setShowToast(true);
    dismissBanner();

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const dismissBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative button-gradient text-white p-4">
      {/* Banner */}
      <div className="flex items-center justify-between mx-auto paddingX max-w-6xl">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span className="font-medium">
            Special offer! First 100 bookings get 10% discount!
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {!isDiscountApplied ? (
            <button
              onClick={applyDiscount}
              className="bg-white px-4 py-1 rounded-md font-medium text-black hover:bg-blue-50 transition-colors"
            >
              Apply Discount
            </button>
          ) : (
            <span className="bg-green-500 text-white px-4 py-1 rounded-md font-medium">
              Discount Applied!
            </span>
          )}

          <button
            onClick={dismissBanner}
            className="text-white hover:text-blue-100"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md border-l-4 border-green-500 animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg
                className="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Discount Successfully Applied!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your 5% discount code has been saved. It will be automatically
                applied at checkout and is valid for the next 30 days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountBanner;
