import { defineType, defineField } from "sanity";

export const heroSchema = defineType({
  name: "hero",
  title: "Hero (Inicio)",
  type: "document",
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Imagen de Fondo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "announcement",
      title: "Anuncio",
      type: "string",
      description: "Anuncio opcional",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "darkenImage",
      title: "Oscurecer Imagen",
      type: "boolean",
      description: "Aplica una capa oscura sobre la imagen de fondo",
      initialValue: false,
    }),
    defineField({
      name: "blurText",
      title: "Difuminar Texto",
      type: "boolean",
      description: "Aplica un efecto de difuminado al texto",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "backgroundImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});

export type Hero = {
  _id: string;
  _type: "hero";
  backgroundImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  announcement?: string;
  title: string;
  subtitle: string;
  darkenImage?: boolean;
  blurText?: boolean;
};
