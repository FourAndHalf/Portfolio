"use client";

import { motion } from "framer-motion";

export const SystemTerminal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-3xl mt-12 rounded-xl overflow-hidden border border-border bg-[#050505] shadow-2xl"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <div className="mx-auto text-label-caps text-muted-foreground tracking-widest">system_terminal — 80x24</div>
      </div>
      <div className="p-6 font-technical text-sm text-left space-y-2">
        <div className="flex gap-2">
          <span className="text-primary">$</span>
          <span className="text-foreground">whoami</span>
        </div>
        <div className="text-muted-foreground ml-4">jinson_eb // principal_backend_engineer</div>
        <div className="flex gap-2">
          <span className="text-primary">$</span>
          <span className="text-foreground">grep -r "innovation" ./mindset</span>
        </div>
        <div className="text-muted-foreground ml-4">
          <span className="text-primary">MATCH:</span> architecture.go:L142 - <span className="text-primary">"Scale without compromise"</span>
        </div>
        <div className="flex gap-2">
          <span className="text-primary">$</span>
          <span className="animate-pulse w-2 h-4 bg-primary inline-block" />
        </div>
      </div>
    </motion.div>
  );
};
