import { z } from "zod";

export const mesaSelectorSchema = z.object({
  nroMesa: z
    .string()
    .min(1, "Debe ingresar el número de mesa")
    .regex(/^\d+$/, "El número de mesa debe ser un valor numérico"),
});

export type MesaSelectorFormValues = z.infer<typeof mesaSelectorSchema>;
