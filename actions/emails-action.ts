"use server";

import { resend } from "@/lib/resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

export async function sendWelcomeEmail(email: string) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "¡Bienvenido a Ultramadness!",
      react: WelcomeEmail({ email }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error enviando email de bienvenida:", error);
    return { success: false, error: "No se pudo enviar el email" };
  }
}
