import { defineType, defineField } from "sanity";

export const redesSocialesSchema = defineType({
  name: "redesSociales",
  title: "Redes Sociales",
  type: "document",
  fields: [
    defineField({
      name: "twitter",
      title: "Twitter",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      twitter: "twitter",
      facebook: "facebook",
      instagram: "instagram",
      youtube: "youtube",
    },
    prepare({ twitter, facebook, instagram, youtube }) {
      const redes = [];
      if (twitter) redes.push("Twitter");
      if (facebook) redes.push("Facebook");
      if (instagram) redes.push("Instagram");
      if (youtube) redes.push("YouTube");
      return {
        title: "Redes Sociales",
        subtitle:
          redes.length > 0 ? redes.join(", ") : "Sin redes configuradas",
      };
    },
  },
});

export type RedesSociales = {
  _id: string;
  _type: "redesSociales";
  twitter?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
};
