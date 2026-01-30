import { defineQuery } from "next-sanity";

export const EVENTOS_QUERY = defineQuery(`*[_id == "eventos"][0]{
  _id,
  title,
  description,
  image,
  eventList[]{
    title,
    description,
    image,
    date,
    url
  }
}`);
