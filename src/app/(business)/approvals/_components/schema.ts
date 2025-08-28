import { z } from "zod";

export const sectionSchema = z.object({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    quantity: z.number(),
    supplier: z.number(),
    remarks: z.string(),
});