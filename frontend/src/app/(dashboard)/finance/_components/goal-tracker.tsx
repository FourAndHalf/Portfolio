"use client";

import { useEffect, useState } from "react";
import { financeService, FinancialGoal } from "@/services/finance-service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function GoalTracker() {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const data = await financeService.getGoals();
        setGoals(data);
      } catch (err) {
        toast.error("Failed to load financial goals");
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, []);

  if (loading) return <div>Loading goals...</div>;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Long-term Goals</CardTitle>
        <CardDescription>Track your progress towards major financial milestones.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length === 0 ? (
          <p className="text-neutral-500 text-sm">No goals set yet.</p>
        ) : (
          goals.map((goal) => {
            const percentage = Math.min(100, (goal.currentValue / goal.targetValue) * 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{goal.title}</span>
                  <span className="text-neutral-400">
                    {formatCurrency(goal.currentValue)} / {formatCurrency(goal.targetValue)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-[10px] text-neutral-500 text-right uppercase tracking-wider">
                  Target Date: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
