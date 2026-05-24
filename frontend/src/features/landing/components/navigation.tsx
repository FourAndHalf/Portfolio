"use client";

import React, { useEffect, useState } from "react";
import { Terminal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/features/dashboard/components/theme-switcher";
import Link from "next/link";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300",
      scrolled ? "top-2" : "top-0"
    )}>
      <div className={cn(
        "flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-full transition-all duration-300",
        scrolled ? "glass bg-background/70 backdrop-blur-xl border-white/10 shadow-2xl" : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Terminal className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold tracking-tighter text-xl uppercase">JINSON<span className="text-primary">.</span>DEV</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-label-caps">
          <a href="#about" className="hover:text-primary transition-colors">01_About</a>
          <a href="#work" className="hover:text-primary transition-colors">02_Work</a>
          <a href="#tech" className="hover:text-primary transition-colors">03_Stack</a>
          <a href="#contact" className="hover:text-primary transition-colors">04_Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href="/developer">
            <Button size="sm" className="rounded-full text-label-caps hidden sm:flex">
              Dashboard <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
