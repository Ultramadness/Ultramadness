import { defineQuery } from "next-sanity";

export const REDES_QUERY = defineQuery(`*[_type == "redesSociales"][0]{
  redes
}`);
