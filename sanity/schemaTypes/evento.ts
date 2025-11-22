import { defineType, defineField } from "sanity";

export const eventoSchema = defineType({
  name: "evento",
  title: "Evento",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título Del Evento",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción Del Evento",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen Del Evento",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha del Evento",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL Del Evento",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export type Evento = {
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  url: string;
  date: string;
};
