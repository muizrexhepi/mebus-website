import Footer from "@/components/Footer";

export default function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
