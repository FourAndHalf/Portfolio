import { apiFetch } from "./api";

export interface FinancialAsset {
  id: number;
  name: string;
  type: string;
  value: number;
  currency: string;
}

export interface FinancialGoal {
  id: number;
  title: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
}

export const financeService = {
  getAssets: async (): Promise<FinancialAsset[]> => {
    const res = await apiFetch("/finance/assets");
    return res.json();
  },
  addAsset: async (asset: Omit<FinancialAsset, "id">): Promise<FinancialAsset> => {
    const res = await apiFetch("/finance/assets", {
      method: "POST",
      body: JSON.stringify(asset),
    });
    return res.json();
  },
  getGoals: async (): Promise<FinancialGoal[]> => {
    const res = await apiFetch("/finance/goals");
    return res.json();
  },
  addGoal: async (goal: Omit<FinancialGoal, "id">): Promise<FinancialGoal> => {
    const res = await apiFetch("/finance/goals", {
      method: "POST",
      body: JSON.stringify(goal),
    });
    return res.json();
  },
};
