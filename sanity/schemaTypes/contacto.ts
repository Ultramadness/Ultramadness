import { defineType, defineField } from "sanity";

export const contactoSchema = defineType({
  name: "contacto",
  title: "Contacto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "googleMapsCordenates",
      title: "Cordenadas de Google Maps",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title,
        subtitle: description,
      };
    },
  },
});

export type Contacto = {
  _id: string;
  _type: "contacto";
  title: string;
  description: string;
  googleMapsCordenates: string;
};
