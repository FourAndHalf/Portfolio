import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

export const sectionSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  expirableOrNot: z.boolean(),
  expiryDate: z.date(),
  daysToExpiry: z.number(),
  authorizingBody: z.string(),
});

export type CardData = z.infer<typeof cardSchema>;

export const cardColumns: ColumnDef<CardData>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "authorizingBody",
    header: "Authorizing Body",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "daysToExpiry",
    header: "Days to Expiry",
  },
  {
    accessorKey: "expirableOrNot",
    header: "Expirable",
  },
]; 