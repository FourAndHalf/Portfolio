
import { ChartConfig } from "@/components/ui/chart";

export const budgetUsageChartConfig = {
    actual: {
        label: "Utilised",
        color: "var(--chart-1)",
    },
    remaining: {
        label: "Remaining",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--primary-foreground)",
    },
} as ChartConfig;

export const budgetUsageChartData = [
    { name: "Funds utilised", utilised: 82000, target: 100000 },
].map((row) => ({
    ...row,
    remaining: Math.max(0, row.target - row.utilised),
}));