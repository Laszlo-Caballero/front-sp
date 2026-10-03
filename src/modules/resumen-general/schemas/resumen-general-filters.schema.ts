import { z } from "zod";

export const resumenGeneralFiltersSchema = z.object({
  busqueda: z.string(),
  distrito: z.string(),
  estadoActa: z.string(),
});

export type ResumenGeneralFiltersFormValues = z.infer<typeof resumenGeneralFiltersSchema>;
