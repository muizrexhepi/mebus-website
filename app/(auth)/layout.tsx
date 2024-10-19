import Footer from "@/components/Footer";
import SecondaryNavbar from "@/components/SecondaryNavbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-primary paddingX w-full py-4">
        <SecondaryNavbar />
      </div>
      {children}
      <Footer />
    </div>
  );
}
