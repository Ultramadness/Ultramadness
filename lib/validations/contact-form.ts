import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Por favor ingresa un email válido.",
    }),
    phone: z.string().min(8, {
      message: "Por favor ingresa un teléfono válido.",
    }),
    musicalGenre: z.string().min(1, {
      message: "Por favor selecciona un género musical.",
    }),
    otherGenre: z.string().default(""),
    receiveNews: z.boolean(),
    message: z.string().min(10, {
      message: "El mensaje debe tener al menos 10 caracteres.",
    }),
  })
  .refine(
    (data) => {
      // Si selecciona "Otro", el campo otherGenre debe estar lleno
      if (data.musicalGenre === "otro" && !data.otherGenre) {
        return false;
      }
      return true;
    },
    {
      message: "Por favor especifica el género musical.",
      path: ["otherGenre"],
    }
  );

export type ContactFormValues = z.infer<typeof contactFormSchema>;
