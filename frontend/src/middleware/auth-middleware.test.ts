import { describe, it, expect, vi, beforeEach } from "vitest";
import { authMiddleware } from "./auth-middleware";
import { NextRequest, NextResponse } from "next/server";

vi.mock("next/server", () => ({
  NextResponse: {
    next: vi.fn(() => ({ status: 200 })),
    redirect: vi.fn((url) => ({ status: 307, url })),
  },
}));

describe("authMiddleware", () => {
  const baseUrl = "http://localhost:3000";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow access to the landing page (/) for everyone", () => {
    const req = {
      nextUrl: { pathname: "/" },
      url: `${baseUrl}/`,
      cookies: { get: vi.fn(() => undefined) },
    } as unknown as NextRequest;

    const res = authMiddleware(req);
    expect(res.status).toBe(200);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("should redirect unauthenticated users from private routes to /login", () => {
    const req = {
      nextUrl: { pathname: "/crm" },
      url: `${baseUrl}/crm`,
      cookies: { get: vi.fn(() => undefined) },
    } as unknown as NextRequest;

    const res = authMiddleware(req);
    expect(res.status).toBe(307);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/login", req.url));
  });

  it("should allow authenticated users to access private routes", () => {
    const req = {
      nextUrl: { pathname: "/crm" },
      url: `${baseUrl}/crm`,
      cookies: { get: vi.fn(() => ({ value: "valid-token" })) },
    } as unknown as NextRequest;

    const res = authMiddleware(req);
    expect(res.status).toBe(200);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("should redirect authenticated users from login to dashboard", () => {
    const req = {
      nextUrl: { pathname: "/login" },
      url: `${baseUrl}/login`,
      cookies: { get: vi.fn(() => ({ value: "valid-token" })) },
    } as unknown as NextRequest;

    const res = authMiddleware(req);
    expect(res.status).toBe(307);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/developer", req.url));
  });
});
