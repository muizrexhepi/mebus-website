import { SettingsBreadcrumb } from "@/components/BreadCrumb";
import SecondaryNavbar from "@/components/SecondaryNavbar";
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
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 px-4 sm:px-8 py-4 z-20">
        <SecondaryNavbar />
      </div>
      <SettingsBreadcrumb />
      {children}
    </div>
  );
}
