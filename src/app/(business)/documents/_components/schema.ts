import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "id",
    header: "Id",
  },
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