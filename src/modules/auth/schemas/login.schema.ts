import { z } from "zod";

export const loginSchema = z.object({
  dni: z
    .string()
    .min(1, "El DNI es obligatorio")
    .length(8, "El DNI debe tener exactamente 8 dígitos")
    .regex(/^\d+$/, "El DNI debe contener solo números"),
  password: z
    .string()
    .min(1, "El código de acreditación (PIN) es obligatorio"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
