import SecondaryFooter from "@/components/SecondaryFooter";

export default function HelpLayout({
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
