import { z } from "zod";

export const imagenesSchema = z.object({
  declaracionJurada: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar la declaración jurada para continuar",
  }),
});

export type ImagenesFormValues = z.infer<typeof imagenesSchema>;
