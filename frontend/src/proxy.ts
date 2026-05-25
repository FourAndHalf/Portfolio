import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "./middleware/auth-middleware";

export function proxy(req: NextRequest) {
  // authMiddleware
  const response = authMiddleware(req);
  if (response && response.status !== 200) {
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/developer/:path*", "/crm/:path*", "/finance/:path*", "/investments/:path*", "/login", "/register"],
};