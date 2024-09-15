import { CheckCircle } from "lucide-react";
import Link from "next/link";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <CheckCircle size={64} className="text-emerald-700 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-6">
        Your payment was processed successfully. You can view your bookings in
        your profile.
      </p>
      <Link href="/bookings">
        <p className="px-6 py-3 bg-emerald-700 text-white rounded-lg transition-colors hover:bg-emerald-600">
          View My Bookings
        </p>
      </Link>
    </div>
  );
};

export default SuccessPage;
