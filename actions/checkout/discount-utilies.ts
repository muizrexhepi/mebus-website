// @/actions/checkout/discount-utils.ts

export interface DiscountInfo {
  code: string | null;
  percentage: number;
  expiration: string | null;
}

export interface AppliedDiscount {
  code: string;
  amount: number;
  finalAmount: number;
}

/**
 * Gets discount information from localStorage
 */
export function getStoredDiscount(): DiscountInfo {
  if (typeof window === "undefined") {
    return { code: null, percentage: 0, expiration: null };
  }

  const discountCode = localStorage.getItem("discountCode");
  const discountPercentage = localStorage.getItem("discountPercentage");
  const discountExpiration = localStorage.getItem("discountExpiration");

  return {
    code: discountCode,
    percentage: discountPercentage ? Number.parseFloat(discountPercentage) : 0,
    expiration: discountExpiration,
  };
}

/**
 * Calculates the final amount after applying discount
 */
export function calculateDiscountedAmount(
  totalPrice: number
): AppliedDiscount | null {
  const discount = getStoredDiscount();

  if (!discount.code || !discount.expiration) {
    return null;
  }

  const expirationDate = new Date(discount.expiration);
  const currentDate = new Date();

  if (currentDate >= expirationDate) {
    // Clean up expired discount
    clearStoredDiscount();
    return null;
  }

  const discountAmount = totalPrice * (discount.percentage / 100);
  const finalAmount = totalPrice - discountAmount;

  return {
    code: discount.code,
    amount: discountAmount,
    finalAmount: Math.max(0, finalAmount), // Ensure non-negative
  };
}

/**
 * Clears stored discount information
 */
export function clearStoredDiscount(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("discountCode");
  localStorage.removeItem("discountPercentage");
  localStorage.removeItem("discountExpiration");
}

/**
 * Validates if a discount is still active
 */
export function isDiscountValid(): boolean {
  const discount = getStoredDiscount();

  if (!discount.code || !discount.expiration) {
    return false;
  }

  const expirationDate = new Date(discount.expiration);
  const currentDate = new Date();

  return currentDate < expirationDate;
}
