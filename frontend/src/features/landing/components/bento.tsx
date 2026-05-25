"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TechnicalBentoGrid = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      visible: { transition: { staggerChildren: 0.15 } },
      hidden: {}
    }}
    className={cn("grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto", className)}
  >
    {children}
  </motion.div>
);

export const TechnicalBentoCard = ({ 
  children, 
  className, 
  title, 
  id, 
  accent = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string; 
  id?: string;
  accent?: boolean;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
    }}
    className={cn(
      "relative group overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300",
      "hover:border-primary/30 hover:shadow-[0_0_20px_oklch(0.82_0.22_110_/_0.05)]",
      accent && "border-primary/20",
      className
    )}
  >
    <div className="flex justify-between items-start mb-4">
      {title && <h3 className="font-display font-semibold text-lg tracking-tight">{title}</h3>}
      {id && <span className="text-label-caps text-muted-foreground">{id}</span>}
    </div>
    {children}
    {/* Decorative corner accent */}
    <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full" />
    </div>
  </motion.div>
);
