import SecondaryFooter from "@/components/SecondaryFooter";

export default function BookingsLayout({
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
