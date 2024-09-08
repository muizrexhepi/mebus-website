import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <XCircle size={64} className="text-red-600 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">Payment Failed!</h1>
      <p className="text-gray-600 mb-6">
        Something went wrong with your payment. Please try again.
      </p>
      <button
        onClick={() => router.back()}
        className="px-6 py-3 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-500"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
