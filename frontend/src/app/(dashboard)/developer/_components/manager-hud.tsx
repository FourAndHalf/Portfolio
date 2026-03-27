"use client";

import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse" />
);

export function ManagerHUD() {
  return (
    <BentoGrid className="max-w-full mx-auto">
      <BentoGridItem
        title="Project ROI"
        description="Return on Investment across all active projects."
        header={
          <div className="flex flex-col gap-2 h-full justify-center">
             <div className="text-4xl font-bold text-emerald-500">+240%</div>
             <div className="text-sm text-muted-foreground">Average per quarter</div>
          </div>
        }
        icon={<DollarSign className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-1"
      />
      <BentoGridItem
        title="Delivery Timeline"
        description="On-track for Q3 deliverables."
        header={
            <div className="flex flex-col gap-2 h-full justify-center p-2">
                <div className="flex justify-between text-xs mb-1">
                    <span>Alpha</span>
                    <span className="text-green-500">Done</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary w-full h-2 rounded-full" />
                </div>
                 <div className="flex justify-between text-xs mb-1 mt-2">
                    <span>Beta</span>
                    <span className="text-blue-500">In Progress</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-blue-500 w-[60%] h-2 rounded-full" />
                </div>
            </div>
        }
        icon={<CalendarClock className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-1"
      />
      <BentoGridItem
        title="Team Velocity"
        description="Sprint completion rate over last 6 months."
        header={
            <div className="flex items-end gap-2 h-full pb-2">
                <div className="w-8 h-12 bg-primary/20 rounded-t"></div>
                <div className="w-8 h-16 bg-primary/40 rounded-t"></div>
                <div className="w-8 h-14 bg-primary/30 rounded-t"></div>
                <div className="w-8 h-20 bg-primary/60 rounded-t"></div>
                <div className="w-8 h-24 bg-primary rounded-t"></div>
            </div>
        }
        icon={<TrendingUp className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-1"
      />
      <BentoGridItem
        title="Tech Stack Efficiency"
        description="Optimized for scale and maintainability."
        header={
             <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">Docker</Badge>
                <Badge variant="secondary">AWS</Badge>
             </div>
        }
        icon={<CheckCircle2 className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-2"
      />
       <BentoGridItem
        title="Active Clients"
        description="Key accounts currently being managed."
        header={
            <div className="flex -space-x-4">
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-red-200" />
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-blue-200" />
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-green-200" />
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-yellow-200 flex items-center justify-center text-xs font-bold">+5</div>
            </div>
        }
        icon={<Users className="h-4 w-4 text-neutral-500" />}
        className="md:col-span-1"
      />
    </BentoGrid>
  );
}
