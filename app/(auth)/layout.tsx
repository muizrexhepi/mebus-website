import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <SecondaryFooter />
    </div>
  );
}
