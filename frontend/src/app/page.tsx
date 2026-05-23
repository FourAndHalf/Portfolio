"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default dashboard/app entry point
    router.replace("/developer");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="animate-pulse text-sm text-muted-foreground">Redirecting...</div>
    </div>
  );
}
