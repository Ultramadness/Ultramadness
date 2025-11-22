import { defineType, defineField } from "sanity";

export const serviciosSchema = defineType({
  name: "servicios",
  title: "Servicios",
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
      name: "services",
      title: "Servicios",
      type: "array",
      of: [
        {
          type: "object",
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
              name: "icon",
              title: "Icono",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(3),
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

export type Servicios = {
  _id: string;
  _type: "servicios";
  title: string;
  description: string;
  services: Array<{
    title: string;
    description: string;
    icon: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  }>;
};
