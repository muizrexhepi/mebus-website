interface CarrierTermsProps {
  carrier: {
    name: string;
    company_metadata: {
      phone?: string;
      email?: string;
      country?: string;
      tax_number?: string;
      registration_number?: string;
    };
  } | null;
}

export const CarrierTerms: React.FC<CarrierTermsProps> = ({ carrier }) => {
  if (!carrier || !carrier.name) {
    return null; // Don't render if carrier data is missing
  }

  const { name } = carrier;

  return (
    <div className="mt-8 space-y-2 text-sm text-gray-600">
      <h3 className="font-semibold text-gray-800">Operated By:</h3>
      <p className="font-medium text-lg text-primary">{name}</p>
      <div className="flex flex-col md:flex-row gap-2">
        <a
          href="/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-transparent button-gradient bg-clip-text underline"
        >
          Privacy Policy
        </a>
        <a
          href="/legal/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-transparent button-gradient bg-clip-text underline"
        >
          Terms of Service
        </a>
      </div>
    </div>
  );
};
