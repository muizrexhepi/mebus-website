import { Metadata } from "next";
import { AccountSidebar } from "./(components)/account-sidebar";
import { AccountHeader } from "@/components/mobile/account-header";

export const metadata: Metadata = {
  title: "Your account",
  description: "Change your account security, and personal information.",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AccountHeader />
      <div className="flex max-w-6xl mx-auto paddingX min-h-screen paddingY gap-12 !py-6 sm:!py-14 md:!py-20">
        <AccountSidebar />
        {children}
      </div>
    </>
  );
}
