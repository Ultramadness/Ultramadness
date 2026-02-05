import { defineType, defineField } from "sanity";

export const redesSocialesSchema = defineType({
  name: "redesSociales",
  title: "Redes Sociales",
  type: "document",
  fields: [
    defineField({
      name: "redes",
      title: "Lista de Redes Sociales",
      type: "array",
      of: [
        defineField({
          name: "redSocial",
          title: "Red Social",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Red Social",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter (X)", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Título a mostrar (Opcional)",
              type: "string",
              description: "Ej: Síguenos en Instagram",
            }),
            defineField({
              name: "url",
              title: "Enlace (URL)",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "url",
            },
            prepare({ title, subtitle }) {
              const titles: Record<string, string> = {
                facebook: "Facebook",
                twitter: "Twitter",
                instagram: "Instagram",
                youtube: "YouTube",
                whatsapp: "WhatsApp",
                tiktok: "TikTok",
              };
              return {
                title: titles[title] || title,
                subtitle: subtitle,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      redes: "redes",
    },
    prepare({ redes }) {
      const count = redes ? redes.length : 0;
      return {
        title: "Redes Sociales",
        subtitle: `${count} red${count !== 1 ? "es" : ""} configurada${count !== 1 ? "s" : ""}`,
      };
    },
  },
});

export type RedSocial = {
  _key: string;
  name:
    | "facebook"
    | "twitter"
    | "instagram"
    | "youtube"
    | "whatsapp"
    | "tiktok";
  title?: string;
  url: string;
};

export type RedesSociales = {
  _id: string;
  _type: "redesSociales";
  redes?: RedSocial[];
};
