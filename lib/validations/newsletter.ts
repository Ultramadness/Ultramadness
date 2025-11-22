import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
