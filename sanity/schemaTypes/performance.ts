import { defineType, defineField } from "sanity";

export const performanceSchema = defineType({
  name: "performance",
  title: "Performance",
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
      name: "images",
      title: "Listado de Imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      images: "images",
    },
    prepare({ title, description, images }) {
      return {
        title: title,
        subtitle: description,
        media: images?.[0],
      };
    },
  },
});

export type Performance = {
  _id: string;
  _type: "performance";
  title: string;
  description: string;
  images?: Array<{
    asset: {
      _ref: string;
      _type: "reference";
    };
  }>;
};
