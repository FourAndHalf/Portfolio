"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("LoggedIn");
    if (alreadyLoggedIn) {
      router.push("/contractor");
    } else {
      router.push("/contractor");
      // router.push("/auth/login");
    }
  }, [router]);

  return null;
}
