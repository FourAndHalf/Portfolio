"use client";

import React, { useEffect, useState } from "react";
import { Terminal, ArrowRight, User, LayoutDashboard, LogOut, Settings, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/features/dashboard/components/theme-switcher";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#tech" className="hover:text-primary transition-colors">Stack</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 glass">
                <Link href="/developer">
                  <DropdownMenuItem className="cursor-pointer rounded-lg gap-2 text-label-caps">
                    <LayoutDashboard className="w-4 h-4" />
                    Command Center
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer rounded-lg gap-2 text-label-caps">
                  <User className="w-4 h-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="cursor-pointer rounded-lg gap-2 text-label-caps text-red-500 hover:text-red-400 focus:text-red-400">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 transition-all">
                  <LogIn className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
