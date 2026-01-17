import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
};

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    const resetTime = now + RATE_LIMIT.windowMs;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

// Clean up old entries
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60 * 1000);
}

export default function proxy(req: NextRequest) {
  // Get real IP (supports load balancers)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip"); // Cloudflare
  const ip =
    forwarded?.split(",")[0].trim() ?? realIp ?? cfConnectingIp ?? "127.0.0.1";

  const { allowed, remaining, resetTime } = checkRateLimit(ip);

  if (!allowed) {
    return new NextResponse(
      JSON.stringify({
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((resetTime - Date.now()) / 1000).toString(),
          "X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(resetTime).toISOString(),
        },
      },
    );
  }

  // Allow request with rate limit headers
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", RATE_LIMIT.maxRequests.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", new Date(resetTime).toISOString());
  response.headers.set("X-Client-IP", ip);

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
