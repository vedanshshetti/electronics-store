import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(req: NextRequest) {
  // ─────────────────────────────────────────────
  // 1. Global App Status Check
  // ─────────────────────────────────────────────
  if (process.env.NEXT_PUBLIC_APP_STATUS !== "online") {
    console.warn(
      `[${new Date().toTimeString()}] App offline: blocking request to ${req.nextUrl.pathname}`
    );

    const response = NextResponse.json(
      {
        "": "This application is currently unavailable. Please try again later.",
      },
      { status: 503 }
    );

    response.headers.set("Retry-After", "5");
    response.headers.set(
      "X-Debug-Data",
      JSON.stringify({
        timestamp: new Date().toTimeString(),
        status: "offline",
        "http-status-code": 503,
      })
    );
    response.headers.set("X-App-Status", "offline");

    return response;
  }


  // ─────────────────────────────────────────────
  // 3. Allow request to continue
  // ─────────────────────────────────────────────
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/:locale/view",
    "/:locale/view/:path",
    "/:locale/ai",
    "/:locale/wishlist",
    "/:locale/home",
  ]
};
  