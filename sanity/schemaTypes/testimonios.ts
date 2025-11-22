import { defineType, defineField } from "sanity";

export const testimonioTextoSchema = defineType({
  name: "testimonioTexto",
  title: "Testimonio de Texto",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Referencia del Testimonio",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nombre del Testimonio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const testimonioVideoSchema = defineType({
  name: "testimonioVideo",
  title: "Testimonio de Video",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video del Testimonio",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const testimoniosSchema = defineType({
  name: "testimonios",
  title: "Testimonios",
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
      name: "textTestimonials",
      title: "Listado de Testimonios de Texto",
      type: "array",
      of: [{ type: "testimonioTexto" }],
    }),
    defineField({
      name: "videoTestimonials",
      title: "Listado de Testimonios de Video",
      type: "array",
      of: [{ type: "testimonioVideo" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      textCount: "textTestimonials",
      videoCount: "videoTestimonials",
    },
    prepare({ title, description, textCount, videoCount }) {
      const text = textCount?.length || 0;
      const video = videoCount?.length || 0;
      return {
        title: title,
        subtitle: `${description} (${text} texto, ${video} video)`,
      };
    },
  },
});

export type TestimonioTexto = {
  reference: string;
  name: string;
};

export type TestimonioVideo = {
  video: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
};

export type Testimonios = {
  _id: string;
  _type: "testimonios";
  title: string;
  description: string;
  textTestimonials?: TestimonioTexto[];
  videoTestimonials?: TestimonioVideo[];
};
