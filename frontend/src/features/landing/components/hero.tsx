"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SystemTerminal } from "./terminal";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-caps"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Status: Operational
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display md:text-[5rem] max-w-4xl leading-[1.1]"
          >
            Engineering <span className="text-primary italic">Digital</span> Foundations.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            Backend-focused engineer specializing in scalable architectures, 
            high-performance logic, and transparent data systems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Button size="lg" className="rounded-lg px-8 font-semibold">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-lg px-8">
              Get in Touch
            </Button>
          </motion.div>

          <SystemTerminal />
        </div>
      </div>

      {/* Background Grid Decoration with OKLCH Precision */}
      <div 
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Subtle OKLCH Glow Gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-20 opacity-10 blur-[120px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`
        }}
      />
    </section>
  );
};
