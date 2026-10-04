import { z } from "zod";

export const createMesaSchema = z.object({
  nroMesa: z
    .string()
    .min(1, "El número de mesa es obligatorio")
    .regex(/^\d+$/, "El número de mesa debe ser un valor numérico"),
  distrito: z
    .string()
    .min(2, "El distrito debe tener al menos 2 caracteres"),
  capacidad: z
    .number()
    .min(1, "La capacidad debe ser mayor a 0"),
});

export type CreateMesaFormValues = z.infer<typeof createMesaSchema>;
