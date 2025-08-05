import SecondaryFooter from "@/components/SecondaryFooter";

export default function HelpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-16 md:pb-0">
      {children}
      <SecondaryFooter className="mt-12 hidden md:block" />
    </div>
  );
}
