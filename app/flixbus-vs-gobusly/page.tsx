import { Metadata } from "next";
import FlixbusVsGobuslyClient from "./comparison-client";

export const metadata: Metadata = {
  title: "GoBusly vs. FlixBus | The Better Choice for the Diaspora",
  description:
    "Compare GoBusly and FlixBus. See why localized tech, native support, and direct Balkan routes make GoBusly the #1 choice.",
};

export default function ComparisonPage() {
  return <FlixbusVsGobuslyClient />;
}
