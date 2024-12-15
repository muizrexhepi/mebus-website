import Navbar from "@/components/navbar/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export default function BookingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-gradient-to-b from-primary-bg/85 to-primary-bg/90 py-4">
        <Navbar className="max-w-6xl paddingX mx-auto z-20" />
      </div>
      {children}
      <SecondaryFooter className="mt-12" />
    </div>
  );
}
