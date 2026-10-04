import { z } from "zod";

export const mesaSelectorSchema = z.object({
  nroMesa: z
    .string()
    .min(1, "Debe ingresar el número de mesa")
    .length(6, "El número de mesa debe tener 6 dígitos")
    .regex(/^\d+$/, "El número de mesa solo debe contener números"),
});

export type MesaSelectorFormValues = z.infer<typeof mesaSelectorSchema>;

