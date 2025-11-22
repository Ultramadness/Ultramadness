import { defineType, defineField } from "sanity";

export const blogSchema = defineType({
  name: "blog",
  title: "Blog",
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
      name: "coverImage",
      title: "Portada",
      type: "image",
      description: "Imagen de portada opcional",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "genre",
      title: "Género Musical",
      type: "reference",
      to: [{ type: "generoMusical" }],
      description: "Categoría del género musical",
    }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "coverImage",
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

export type Blog = {
  _id: string;
  _type: "blog";
  title: string;
  description: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  genre?: {
    _ref: string;
    _type: "reference";
  };
  content: string;
};
