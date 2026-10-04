import { z } from "zod";

export const loginSchema = z.object({
  dni: z.string().min(1, "El DNI es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

