import { defineQuery } from "next-sanity";

export const GENEROS_QUERY = defineQuery(`*[_type == "generoMusical"]{
  _id,
  name,
  slug
}`);
