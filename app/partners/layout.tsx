import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export default function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full py-4 bg-gradient-to-tr from-primary-bg/95 via-primary-bg to-primary-bg/95">
        <Navbar className="max-w-7xl paddingX mx-auto" />
      </div>
      {children}
      <Footer />
    </div>
  );
}
