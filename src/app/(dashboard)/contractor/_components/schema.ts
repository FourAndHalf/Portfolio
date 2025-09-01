import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string().nullable(),
  status: z.string().nullable(),
  targetdate: z.date().nullable(),
  completiondate: z.date().nullable(),
  reviewer: z.string().nullable(),
});