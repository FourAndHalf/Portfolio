"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("LoggedIn");
    if (alreadyLoggedIn) {
      router.push("/developer");
    } else {
      router.push("/developer");
    }
  }, [router]);

  return null;
}
