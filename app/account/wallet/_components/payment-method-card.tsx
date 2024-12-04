import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentMethod } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const enum CardNetwork {
  Visa = "visa",
  Mastercard = "mastercard",
  AmericanExpress = "americanexpress",
  Discover = "discover",
  UnionPay = "unionpay",
  Default = "default",
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onRemove: (id: string) => void;
}

// Update card colors type to include default
const cardColors: Record<CardNetwork, { bg: string; text: string }> = {
  [CardNetwork.Visa]: { bg: "bg-blue-600", text: "text-white" },
  [CardNetwork.Mastercard]: {
    bg: "bg-gradient-to-r from-red-500 to-yellow-500",
    text: "text-white",
  },
  [CardNetwork.AmericanExpress]: { bg: "bg-blue-900", text: "text-white" },
  [CardNetwork.Discover]: { bg: "bg-orange-500", text: "text-white" },
  [CardNetwork.UnionPay]: { bg: "bg-red-600", text: "text-white" },
  [CardNetwork.Default]: { bg: "bg-gray-800", text: "text-white" },
};

const renderNetworkLogo = (network: string) => {
  switch (network.toLowerCase()) {
    case CardNetwork.Visa:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#1434CB" />
          <path
            d="M19.425 21.6L21.525 10.4H24.6L22.5 21.6H19.425ZM30.975 10.8C30.375 10.575 29.4 10.325 28.2 10.325C25.575 10.325 23.7 11.725 23.7 13.65C23.7 15.05 24.975 15.825 25.95 16.3C26.95 16.775 27.3 17.075 27.3 17.5C27.3 18.15 26.55 18.45 25.875 18.45C24.9 18.45 24.4 18.3 23.55 17.9L23.25 17.75L22.875 20.35C23.625 20.725 24.9 21.05 26.225 21.05C29.025 21.05 30.875 19.675 30.875 17.625C30.875 16.125 29.9 15.05 28.05 14.125C27.175 13.625 26.625 13.325 26.625 12.85C26.625 12.425 27.1 11.975 28.125 11.975C28.95 11.975 29.575 12.15 30.075 12.4L30.375 12.55L30.975 10.8Z"
            fill="white"
          />
          <path
            d="M35.25 10.4H37.725L40.05 21.6H37.2L36.825 19.575H33.75L33.075 21.6H30.3L33.6 10.675C33.9 10.5 34.425 10.4 35.25 10.4ZM36.375 17.45L35.7 14.225L35.025 17.45H36.375Z"
            fill="white"
          />
          <path
            d="M14.025 10.4L11.1 17.85L10.725 15.9L9.375 12.325C9.375 12.325 9.075 10.4 7.5 10.4H3L2.925 10.675C2.925 10.675 4.725 11.075 6.3 12.325L8.85 21.6H11.85L17.025 10.4H14.025Z"
            fill="white"
          />
        </svg>
      );
    case CardNetwork.Mastercard:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#FF5F00" />
          <circle cx="20" cy="16" r="10" fill="#EB001B" />
          <circle
            cx="28"
            cy="16"
            r="10"
            fill="#F79E1B"
            className="opacity-90"
          />
          <path
            d="M24 11.5c-2.25 1.75-3.75 4.5-3.75 7.5s1.5 5.75 3.75 7.5c2.25-1.75 3.75-4.5 3.75-7.5S26.25 13.25 24 11.5z"
            fill="#F79E1B"
          />
        </svg>
      );
    case CardNetwork.AmericanExpress:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#2554A1" />
          <path
            d="M14.4 12.3H10.2V10.8H15v-2.1h-5.7v4.2h4.2v1.5H9.3v2.1h5.7v4.2H9.3v-2.1H5.1v2.7c0 1.2.9 2.1 2.1 2.1h7.2v-9.6h-4.2v-1.5z"
            fill="white"
          />
          <path
            d="M42.9 10.5h-7.2v9.6h4.2v1.5h-4.2v2.1h5.7v-4.2h-4.2v-1.5h4.2v-2.1h-4.2v-1.5h5.7V12c0-1.2-.9-2.1-2.1-2.1zM31.5 19.2l-2.1-6.9h-2.4l-2.1 6.9-2.1-6.9h-2.4l3.3 9.6h2.4l2.1-6.6 2.1 6.6h2.4l3.3-9.6h-2.4l-2.1 6.9z"
            fill="white"
          />
        </svg>
      );
    case CardNetwork.Discover:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#F37621" />
          <path
            d="M11.1 16c0 3.3 2.7 6 6 6 1.5 0 2.9-.6 4-1.5l-3.3-3.3c-.4.4-1 .7-1.7.7-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.7 0 1.3.3 1.7.7l3.3-3.3c-1.1-.9-2.5-1.5-4-1.5-3.3 0-6 2.7-6 6z"
            fill="white"
          />
          <path
            d="M37.5 14.5h-1v-1h1v1zm-3-1.5h-6.5v3h6.5v-3zm-4.5 1.5h-1v-1h1v1zm-3-3h-2.5v6h2.5v-6zm-6.5 3H18v-3h-2.5v3h-1.5v2h1.5v3H18v-3h2.5v-2z"
            fill="white"
          />
        </svg>
      );
    case CardNetwork.UnionPay:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#C21E23" />
          <path
            d="M14.4 10.5L9.9 21.6h3l.9-2.1h4.2l.9 2.1h3L17.4 10.5h-3zm1.5 4.8l1.2-2.7 1.2 2.7h-2.4z"
            fill="white"
          />
          <path
            d="M26.4 14.7c-1.2-.6-1.5-1.2-1.5-1.8 0-.9.9-1.5 1.8-1.5.9 0 1.8.6 1.8 1.5h2.7c0-2.1-1.8-3.6-4.5-3.6s-4.5 1.5-4.5 3.6c0 1.8 1.2 3 3.3 3.9 1.2.6 1.5 1.2 1.5 1.8 0 .9-.9 1.5-1.8 1.5-1.2 0-1.8-.9-1.8-1.8h-2.7c0 2.4 1.8 3.9 4.5 3.9s4.5-1.5 4.5-3.6c0-1.8-1.2-3-3.3-3.9z"
            fill="white"
          />
          <path
            d="M36 10.5l-4.5 11.1h3l.9-2.1h4.2l.9 2.1h3L39 10.5h-3zm1.5 4.8l1.2-2.7 1.2 2.7h-2.4z"
            fill="white"
          />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-8 w-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#4A5568" />
          <path
            d="M24 10.5c-7.2 0-13.5 5.4-13.5 13.5h27c0-8.1-6.3-13.5-13.5-13.5z"
            fill="white"
          />
          <circle cx="24" cy="24" r="6.75" fill="#4A5568" />
        </svg>
      );
  }
};

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  onRemove,
}) => {
  const { t } = useTranslation();
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  console.log({ method });

  const normalizedBrand = method?.card?.brand.toLowerCase() as CardNetwork;

  const networkColors =
    cardColors[normalizedBrand ? normalizedBrand : CardNetwork.Default];

  return (
    <Card
      className={`w-full max-w-lg h-56 ${networkColors.bg} ${networkColors.text} shadow-lg transition-all hover:shadow-xl hover:scale-105`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">
          {renderNetworkLogo(method?.card!.brand)}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 hover:text-white absolute top-4 right-4"
          onClick={() => setIsRemoveDialogOpen(true)}
        >
          <Trash2 className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="text-3xl font-bold tracking-wider">
          **** **** **** {method?.card?.last4}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm opacity-80">{t("wallet.cardholderName")}</p>
            <p className="text-lg font-semibold">
              {method.billing_details.name || "John Doe"}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-80">{t("wallet.expirationLabel")}</p>
            <p className="text-lg font-semibold">
              {method?.card?.exp_month.toString().padStart(2, "0")}/
              {method?.card?.exp_year.toString().slice(-2)}
            </p>
          </div>
        </div>
        <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("wallet.remove_payment_method")}</DialogTitle>
              <DialogDescription>
                {t("wallet.remove_confirmation", {
                  lastFour: method?.card?.last4,
                })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t("dataPrivacy.cancel")}</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => {
                  onRemove(method.id);
                  setIsRemoveDialogOpen(false);
                }}
              >
                {t("confirm")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;
