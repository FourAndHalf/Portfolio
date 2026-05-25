"use client";

import { Cpu, Layers, Shield, Code2, Database, Cloud, Zap, Monitor, Terminal } from "lucide-react";
import { TechnicalBentoGrid, TechnicalBentoCard } from "./bento";
import { ExperienceModule } from "./experience";
import { CommitsModule } from "./commits";
import { Button } from "@/components/ui/button";

export const BentoSection = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <TechnicalBentoGrid>
        {/* Main Feature - 8 columns, 2 rows */}
        <TechnicalBentoCard className="md:col-span-8 md:row-span-2" title="Architectural Philosophy" id="CORE">
          <div className="mt-8 space-y-6">
            <p className="text-headline-lg leading-relaxed">
              I build systems that prioritize <span className="text-primary font-semibold">integrity</span> and <span className="text-primary font-semibold">transparency</span>. 
              Every line of code is a structural component of a larger, resilient machine.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <Cpu className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-semibold mb-1">Performance</h4>
                <p className="text-code-md text-muted-foreground">Optimized execution paths and resource management.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                <Layers className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-semibold mb-1">Scalability</h4>
                <p className="text-code-md text-muted-foreground">Modular designs that grow with your user base.</p>
              </div>
            </div>
          </div>
        </TechnicalBentoCard>

        {/* System Stats - 4 columns */}
        <TechnicalBentoCard className="md:col-span-4" title="System Stats" id="STAT">
          <div className="mt-4 space-y-4 text-code-md">
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground">Uptime</span>
              <span className="text-xl">99.99%</span>
            </div>
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[99.99%]" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground">Latency</span>
              <span className="text-xl">24ms</span>
            </div>
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[15%]" />
            </div>
          </div>
        </TechnicalBentoCard>

        {/* Recent Commits - 4 columns (fills the space under System Stats) */}
        <CommitsModule />

        {/* Experience Timeline - 8 columns, 2 rows */}
        <ExperienceModule />

        {/* Technology Stack - 4 columns, 2 rows */}
        <TechnicalBentoCard className="md:col-span-4 md:row-span-2" title="Tech Stack" id="STACK">
          <div className="grid grid-cols-2 gap-y-8 mt-6">
            {[
              { icon: Code2, label: "Golang" },
              { icon: Code2, label: "Python" },
              { icon: Monitor, label: ".NET Core" },
              { icon: Database, label: "PostgreSQL" },
              { icon: Database, label: "Oracle" },
              { icon: Zap, label: "Next.js" },
              { icon: Zap, label: "Angular" },
              { icon: Cloud, label: "AWS" },
              { icon: Monitor, label: "Docker" },
              { icon: Terminal, label: "Linux" }
            ].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group-hover:text-primary transition-colors">
                <tech.icon className="w-8 h-8 opacity-60 group-hover:opacity-100" />
                <span className="text-label-caps tracking-tighter">{tech.label}</span>
              </div>
            ))}
          </div>
        </TechnicalBentoCard>

        {/* CTA Card - 8 columns */}
        <TechnicalBentoCard className="md:col-span-8 border-primary/20 bg-primary/5" id="CTA">
          <div className="flex flex-col sm:flex-row h-full justify-between items-center gap-6">
            <div className="flex-1">
              <h3 className="text-headline-lg">Ready to build something robust?</h3>
              <p className="text-muted-foreground mt-2">Let's discuss your next technical challenge.</p>
            </div>
            <a href="mailto:jinsoneb@gmail.com" className="w-full sm:w-auto">
              <Button className="w-full px-8 py-6 rounded-lg text-label-caps">
                Initialize Conversation
              </Button>
            </a>
          </div>
        </TechnicalBentoCard>

        {/* Security First - 4 columns */}
        <TechnicalBentoCard className="md:col-span-4" id="SEC">
          <div className="flex flex-col items-center justify-center text-center py-4 h-full">
            <Shield className="w-10 h-10 mb-3 text-primary opacity-50" />
            <h4 className="font-semibold">Security First</h4>
            <p className="text-xs text-muted-foreground mt-2">End-to-end encryption and robust auth protocols.</p>
          </div>
        </TechnicalBentoCard>
      </TechnicalBentoGrid>
    </section>
  );
};
