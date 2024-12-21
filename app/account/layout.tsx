import { SettingsBreadcrumb } from "@/components/BreadCrumb";
import { Metadata } from "next";

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
    <div className="flex flex-col max-w-4xl mx-auto px-4 md:px-6 paddingY space-y-4 py-32">
      <SettingsBreadcrumb />
      {children}
    </div>
  );
}
