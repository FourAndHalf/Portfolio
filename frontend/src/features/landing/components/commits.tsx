"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit } from "lucide-react";
import { TechnicalBentoCard } from "./bento";

const MOCK_COMMITS = [
  { id: "a1b2c3d", msg: "feat: implemented distributed cache", repo: "core-router" },
  { id: "e4f5g6h", msg: "fix: resolved connection pool leak", repo: "db-layer" },
  { id: "i7j8k9l", msg: "perf: optimized indexing strategy", repo: "search-service" },
  { id: "m1n2o3p", msg: "chore: updated kubernetes manifests", repo: "infra" },
  { id: "q4r5s6t", msg: "feat: added jwt rotation endpoint", repo: "auth-gateway" },
];

export const CommitsModule = () => {
  const [commits, setCommits] = useState(MOCK_COMMITS.slice(0, 3));
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommits((prev) => {
        const nextCommit = MOCK_COMMITS[index % MOCK_COMMITS.length];
        // Ensure a new unique key by appending timestamp to id
        const newCommit = { ...nextCommit, uniqueKey: `${nextCommit.id}-${Date.now()}` };
        return [newCommit, ...prev.slice(0, 2)];
      });
      setIndex((prev) => prev + 1);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <TechnicalBentoCard className="md:col-span-4" title="Recent Activity" id="LOG">
      <div className="mt-4 space-y-3 h-[180px] overflow-hidden relative">
        <AnimatePresence initial={false}>
          {commits.map((commit: any, i) => (
            <motion.div
              key={commit.uniqueKey || commit.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"
            >
              <div className="mt-0.5 shrink-0">
                <GitCommit className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label-caps text-primary">{commit.id}</span>
                  <span className="text-label-caps text-muted-foreground truncate">{commit.repo}</span>
                </div>
                <p className="text-code-md text-foreground truncate">{commit.msg}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Fade out bottom */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </TechnicalBentoCard>
  );
};
