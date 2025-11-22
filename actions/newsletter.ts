"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTOS_QUERY } from "@/sanity/query/Eventos";
import { sendWelcomeEmail } from "./emails-action";

import EventAnnouncementEmail from "@/emails/EventAnnouncementEmail";
import { urlFor } from "@/sanity/lib/image";

export async function subscribeToNewsletter(
  data: z.infer<typeof newsletterSchema>,
  source: "footer" | "contact_form" = "footer"
) {
  try {
    // Validar los datos con Zod
    const validatedData = newsletterSchema.parse(data);

    // Verificar si el email ya está suscrito
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscriber) {
      return {
        success: true,
        message: "Este email ya está suscrito al newsletter.",
      };
    }

    // Crear nuevo suscriptor
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        source,
      },
    });

    // ENVIAR EMAIL DE BIENVENIDA AUTOMÁTICO
    await sendWelcomeEmail(validatedData.email);

    return {
      success: true,
      data: subscriber,
      message: "¡Gracias por suscribirte al newsletter!",
    };
  } catch (error) {
    console.error("Error al suscribir al newsletter:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Email inválido",
        details: error.message,
      };
    }

    return {
      success: false,
      error: "Error al suscribirse. Por favor intenta de nuevo.",
    };
  }
}

export type EventAnnouncementState = {
  success: boolean;
  message: string;
};

// Server Action con estado
export async function sendEventAnnouncement(
  prevState: EventAnnouncementState,
  formData: FormData
): Promise<EventAnnouncementState> {
  try {
    const eventId = formData.get("eventId") as string;
    if (!eventId) {
      return { success: false, message: "ID de evento no enviado" };
    }

    const { data: eventos } = await sanityFetch({ query: EVENTOS_QUERY });
    const event = eventos?.eventList?.find((ev) => ev._key === eventId);

    if (!event) {
      return { success: false, message: "Evento no encontrado" };
    }

    const subscribers = await prisma.newsletterSubscriber.findMany();
    const emails = subscribers.map((s) => s.email);

    if (emails.length === 0) {
      return { success: false, message: "No hay suscriptores" };
    }

    const imageUrl = urlFor(event.image).url();

    const formattedDate = event.date
      ? new Intl.DateTimeFormat("es-AR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(event.date))
      : "";

    await resend.emails.send({
      from: "Ultramadness <notificaciones@resend.dev>",
      to: emails,
      subject: `Nuevo Evento: ${event.title}`,
      react: EventAnnouncementEmail({
        title: event.title,
        description: event.description,
        date: formattedDate,
        image: imageUrl,
      }),
    });

    return { success: true, message: "Emails enviados correctamente" };
  } catch (err) {
    return { success: false, message: "Error enviando el anuncio" };
  }
}
