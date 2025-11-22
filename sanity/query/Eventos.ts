import { defineQuery } from "next-sanity";

export const EVENTOS_QUERY = defineQuery(`*[_id == "eventos"][0]{
...
}
`);
