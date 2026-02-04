import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  subject: z.string().min(1, "El asunto es obligatorio"),
  title: z.string().min(1, "El título es obligatorio"),
  body: z.string().min(1, "El contenido es obligatorio"),
  imageUrl: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
});

export type TemplateData = z.infer<typeof templateSchema>;
