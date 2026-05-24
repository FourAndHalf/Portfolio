import { NextResponse, type NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get("session_token");

  // Private routes (dashboard and business groups)
  const isPrivateRoute = pathname.startsWith("/crm") || 
                         pathname.startsWith("/developer") || 
                         pathname.startsWith("/finance") || 
                         pathname.startsWith("/investments") ||
                         pathname.startsWith("/certifications") ||
                         pathname.startsWith("/expenses") ||
                         pathname.startsWith("/experience") ||
                         pathname.startsWith("/journal") ||
                         pathname.startsWith("/works");

  if (!sessionToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (sessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/developer", req.url)); // Default dashboard
  }

  return NextResponse.next();
}
