import { defineType, defineField } from "sanity";
import { Evento } from "./evento";

export const eventosSchema = defineType({
  name: "eventos",
  title: "Eventos",
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
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventList",
      title: "Lista de Eventos",
      type: "array",
      of: [{ type: "evento" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "image",
    },
    prepare({ title, description, media }) {
      return {
        title: title,
        subtitle: description,
        media: media,
      };
    },
  },
});

export type Eventos = {
  _id: string;
  _type: "eventos";
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  eventList?: Evento[];
};
