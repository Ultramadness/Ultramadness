import type { StructureResolver } from "sanity/structure";
import {
  HomeIcon,
  UsersIcon,
  CogIcon,
  SparklesIcon,
  CalendarIcon,
  CommentIcon,
  MobileDeviceIcon,
  HelpCircleIcon,
  ShareIcon,
  DocumentTextIcon,
  PlayIcon,
} from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons - Solo una entrada
      S.listItem()
        .title("Hero (Inicio)")
        .icon(HomeIcon)
        .child(S.document().schemaType("hero").documentId("hero")),

      S.listItem()
        .title("Sobre Nosotros")
        .icon(UsersIcon)
        .child(
          S.document().schemaType("sobreNosotros").documentId("sobreNosotros")
        ),

      S.listItem()
        .title("Servicios")
        .icon(CogIcon)
        .child(S.document().schemaType("servicios").documentId("servicios")),

      S.listItem()
        .title("Performance")
        .icon(SparklesIcon)
        .child(
          S.document().schemaType("performance").documentId("performance")
        ),

      S.listItem()
        .title("Eventos")
        .icon(CalendarIcon)
        .child(S.document().schemaType("eventos").documentId("eventos")),

      S.listItem()
        .title("Testimonios")
        .icon(CommentIcon)
        .child(
          S.document().schemaType("testimonios").documentId("testimonios")
        ),

      S.listItem()
        .title("Contacto")
        .icon(MobileDeviceIcon)
        .child(S.document().schemaType("contacto").documentId("contacto")),

      S.listItem()
        .title("Preguntas Frecuentes")
        .icon(HelpCircleIcon)
        .child(
          S.document()
            .schemaType("preguntasFrecuentes")
            .documentId("preguntasFrecuentes")
        ),

      S.listItem()
        .title("Redes Sociales")
        .icon(ShareIcon)
        .child(
          S.document().schemaType("redesSociales").documentId("redesSociales")
        ),

      S.divider(),

      // Documentos múltiples
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blog").title("Entradas de Blog")),

      S.listItem()
        .title("Géneros Musicales")
        .icon(PlayIcon)
        .child(S.documentTypeList("generoMusical").title("Géneros Musicales")),
    ]);
