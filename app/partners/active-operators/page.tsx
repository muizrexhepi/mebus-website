import { Metadata } from "next";
import axios from "axios";

import { Operator } from "@/models/operator";
import ActiveOperators from "../_components/active-operators";

export const metadata: Metadata = {
  title: "Active Operators | GoBusly",
  description:
    "View all active operators on GoBusly. We offer reliable bus services with experienced operators for your comfortable travel.",
};

const ActiveOperatorsPage: React.FC = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/operator`);
  const operators: Operator[] = res.data.data;

  return (
    <div className="bg-[#f9fafb]">
      <div className="max-w-6xl paddingX mx-auto min-h-screen py-12 space-y-6 ">
        <ActiveOperators operators={operators} />
      </div>
    </div>
  );
};

export default ActiveOperatorsPage;
