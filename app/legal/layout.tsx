import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <SecondaryFooter className="mt-12" />
    </div>
  );
}
