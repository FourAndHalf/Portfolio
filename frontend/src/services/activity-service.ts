import { apiFetch } from "./api";

export interface Activity {
  id?: string;
  userId: number;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  tags: string[];
}

export const activityService = {
  getActivities: async (): Promise<Activity[]> => {
    const res = await apiFetch("/activities");
    return res.json();
  },
  addActivity: async (activity: Omit<Activity, "id" | "createdAt" | "userId">): Promise<Activity> => {
    const res = await apiFetch("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    });
    return res.json();
  },
};
