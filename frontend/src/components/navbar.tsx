"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="rounded-full border border-neutral-800 bg-black/50 backdrop-blur-lg p-2 flex items-center gap-2">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className="relative px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-neutral-800 rounded-full"
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.5, type: "spring" }}
                />
              )}
               <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
