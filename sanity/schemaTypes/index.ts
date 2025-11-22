import { type SchemaTypeDefinition } from "sanity";

// Schemas
import { heroSchema } from "./hero";
import { eventoSchema } from "./evento";
import { eventosSchema } from "./eventos";
import { serviciosSchema } from "./servicios";
import { performanceSchema } from "./performance";
import { sobreNosotrosSchema } from "./sobreNosotros";
import {
  testimonioTextoSchema,
  testimonioVideoSchema,
  testimoniosSchema,
} from "./testimonios";
import { contactoSchema } from "./contacto";
import { blogSchema } from "./blog";
import { preguntasFrecuentesSchema } from "./preguntasFrecuentes";
import { redesSocialesSchema } from "./redesSociales";
import { generoMusicalSchema } from "./generoMusical";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSchema,
    eventoSchema,
    eventosSchema,
    serviciosSchema,
    performanceSchema,
    sobreNosotrosSchema,
    testimonioTextoSchema,
    testimonioVideoSchema,
    testimoniosSchema,
    contactoSchema,
    blogSchema,
    preguntasFrecuentesSchema,
    redesSocialesSchema,
    generoMusicalSchema,
  ],
};

export * from "./blog";
export * from "./contacto";
export * from "./evento";
export * from "./eventos";
export * from "./generoMusical";
export * from "./hero";
export * from "./performance";
export * from "./preguntasFrecuentes";
export * from "./redesSociales";
export * from "./servicios";
export * from "./sobreNosotros";
export * from "./testimonios";
