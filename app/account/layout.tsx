import { Metadata } from "next";
import { AccountSidebar } from "./(components)/account-sidebar";

export const metadata: Metadata = {
  title: "Your account | GoBusly",
  description: "Change your account security, and personal information.",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-w-6xl mx-auto paddingX min-h-screen paddingY gap-12 !py-10 sm:!py-14 md:!py-20">
      <AccountSidebar />
      {children}
    </div>
  );
}
