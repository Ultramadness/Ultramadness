import { defineType, defineField } from "sanity";

export const preguntasFrecuentesSchema = defineType({
  name: "preguntasFrecuentes",
  title: "Preguntas Frecuentes",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "questions",
      title: "Preguntas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pregunta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Respuesta",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              question: "question",
              answer: "answer",
            },
            prepare({ question, answer }) {
              return {
                title: question,
                subtitle: answer,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      questions: "questions",
    },
    prepare({ title, questions }) {
      const count = questions?.length || 0;
      return {
        title: title,
        subtitle: `${count} pregunta${count !== 1 ? "s" : ""}`,
      };
    },
  },
});

export type PreguntasFrecuentes = {
  _id: string;
  _type: "preguntasFrecuentes";
  title: string;
  questions?: Array<{
    question: string;
    answer: string;
  }>;
};
