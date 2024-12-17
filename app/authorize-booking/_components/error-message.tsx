import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const ErrorMessage = ({ message }: { message: string }) => (
  <Card className="w-full max-w-3xl mx-auto mt-8">
    <CardHeader>
      <CardTitle className="text-red-600">Error</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{message}</p>
      <Button asChild variant={"primary"}>
        <Link
          href="/"
          className="mt-4 px-4 py-2 text-white rounded-md inline-block text-center"
        >
          Go to Home
        </Link>
      </Button>
    </CardContent>
  </Card>
);
