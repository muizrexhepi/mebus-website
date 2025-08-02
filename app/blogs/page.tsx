import BlogsClientPage from "./BlogsClient";

export const metadata = {
  title: "Travel Blogs & Guides | GoBusly",
  description:
    "Explore expert travel advice, booking guides, and insider tips for seamless bus journeys in Macedonia and the Balkans.",
  keywords:
    "bus travel blogs, Macedonia travel tips, Balkan transport, GoBusly guides, bus booking, travel planning",
  openGraph: {
    title: "Travel Blogs & Guides | GoBusly",
    description:
      "Expert travel insights and guides to make your journey across Macedonia and the Balkans smooth and enjoyable.",
    url: "https://gobusly.com/blogs",
    type: "website",
    images: [
      {
        url: "https://www.gobusly.com/og-blogs.png",
        width: 1200,
        height: 630,
        alt: "Travel Bus Guide Macedonia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Blogs & Guides | GoBusly",
    description:
      "Get top travel tips, routes, and guides for Macedonia and the Balkans.",
    images: ["https://www.gobusly.com/og-blogs.png"],
  },
};

export default function BlogsPage() {
  return <BlogsClientPage />;
}
