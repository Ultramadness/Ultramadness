import { defineType, defineField } from "sanity";

export const generoMusicalSchema = defineType({
  name: "generoMusical",
  title: "Género Musical",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      slug: "slug",
    },
    prepare({ name, slug }) {
      return {
        title: name,
        subtitle: slug?.current || "Sin slug",
      };
    },
  },
});

export type GeneroMusical = {
  _id: string;
  _type: "generoMusical";
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
};
