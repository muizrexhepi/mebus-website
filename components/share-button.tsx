"use client";

import { Button } from "@/components/ui/button"; // Adjust import paths accordingly
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Get the current pathname (URL) on component mount
    setUrl(window.location.pathname);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href, // Share the full URL
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent rounded-lg"
      aria-label="Share this article"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
}
