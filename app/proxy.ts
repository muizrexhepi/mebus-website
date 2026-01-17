import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

const rateLimit = new LRUCache({
  max: 100, // Max requests per IP
  ttl: 60 * 1000, // 1 minute
});

export default function proxy(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  if (rateLimit.has(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  rateLimit.set(ip, true);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
