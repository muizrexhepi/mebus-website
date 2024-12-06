import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Globe, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import PartnerApplicationForm from "@/components/forms/PartnerApplyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoBusly | Partner Application",
  description:
    "Join GoBusly as a partner and expand your business reach, boost revenue, and enjoy secure operations through our platform.",
  keywords: [
    "partner application",
    "bus travel partner",
    "GoBusly partnership",
    "expand your business",
    "increase revenue",
    "bus ticket booking partner",
    "travel agency partnership",
    "Balkan bus operators",
    "bus network expansion",
    "secure bus operations",
    "fraud protection in travel",
    "GoBusly partner benefits",
    "online bus booking system",
    "partner with GoBusly",
    "bus route distribution",
    "travel business partnership",
    "Balkan travel agencies",
    "transportation business partnership",
  ],
};

const PartnerApplicationPage: React.FC = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 xl:px-0 py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/partners/overview">
          <Button variant="outline" className="rounded-lg mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <Card className=" rounded-lg">
              <CardHeader>
                <CardTitle>Partner Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <PartnerApplicationForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <Card className="bg-primary-bg text-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Why Partner with GoBusly?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Expand Your Reach</h3>
                    <p>
                      Access a wider customer base through our online platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Boost Your Revenue</h3>
                    <p>
                      Increase ticket sales with our marketing and distribution
                      network
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Secure Operations</h3>
                    <p>
                      Benefit from our robust booking system and fraud
                      protection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" rounded-lg">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  If you have any questions about the application process or
                  partnership program, please don&apos;t hesitate to contact us.
                </p>
                <Link href={"/contact"}>
                  <Button variant="outline" className="w-full h-12 rounded-lg">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerApplicationPage;
