"use server";

import prisma from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations/contact-form";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { z } from "zod";

export async function submitContactForm(
  data: z.infer<typeof contactFormSchema>,
) {
  try {
    // Validar los datos con Zod
    const validatedData = contactFormSchema.parse(data);

    // Guardar en la base de datos
    const contactForm = await prisma.contactForm.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        musicalGenre: validatedData.musicalGenre,
        otherGenre: validatedData.otherGenre,
        receiveNews: validatedData.receiveNews,
        message: validatedData.message,
      },
    });

    // Si el usuario quiere recibir noticias, suscribirlo al newsletter
    if (validatedData.receiveNews) {
      await subscribeToNewsletter(
        { email: validatedData.email },
        "contact_form",
      );
    }

    return {
      success: true,
      data: contactForm,
    };
  } catch (error) {
    console.error("Error al guardar el formulario de contacto:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Datos del formulario inválidos",
        details: error.cause,
      };
    }

    return {
      success: false,
      error: "Error al enviar el formulario. Por favor intenta de nuevo.",
    };
  }
}
