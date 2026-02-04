"use server";

import { resend } from "@/lib/resend";
import { getAudience, type AudienceMember } from "./audience";
import CustomCampaignEmail from "@/emails/CustomCampaignEmail";
import { z } from "zod";

const campaignSchema = z.object({
  template: z.object({
    title: z.string(),
    body: z.string(),
    imageUrl: z.string().optional().nullable(),
    ctaText: z.string().optional().nullable(),
    ctaUrl: z.string().optional().nullable(),
    subject: z.string(),
  }),
  filters: z.object({
    source: z.enum(["newsletter", "contact_form"]).optional(),
    genre: z.string().optional(),
    search: z.string().optional(),
  }),
  testEmail: z.string().email().optional(), // If present, only send to this email
});

export type CampaignData = z.infer<typeof campaignSchema>;

export async function sendCampaign(data: CampaignData) {
  try {
    const validated = campaignSchema.parse(data);

    // 1. Determine Recipients
    // We now keep the full object to support variables
    let recipients: AudienceMember[] = [];

    if (validated.testEmail) {
      // Try to find the real contact data if this email exists in the audience
      const audienceResult = await getAudience({});
      let realContact: AudienceMember | undefined;

      if (audienceResult.success) {
        realContact = audienceResult.data.find(
          (m) => m.email.toLowerCase() === validated.testEmail!.toLowerCase(),
        );
      }

      recipients = [
        realContact || {
          id: "test",
          email: validated.testEmail,
          name: "Usuario de Prueba", // Fallback if email not found
          source: "newsletter",
          createdAt: new Date(),
          tags: [],
          status: "active",
        },
      ];
    } else {
      const audienceResult = await getAudience(validated.filters);
      if (!audienceResult.success) {
        throw new Error(audienceResult.error);
      }
      recipients = audienceResult.data;
    }

    if (recipients.length === 0) {
      return { success: false, error: "No hay destinatarios seleccionados." };
    }

    // Helper for variables
    const replaceVariables = (text: string, member: AudienceMember) => {
      let res = text.replace(/{{email}}/g, member.email);
      if (member.name) res = res.replace(/{{name}}/g, member.name);
      return res;
    };

    const CHUNK_SIZE = 50;
    const errors: any[] = [];
    let sentCount = 0;

    for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
      const chunk = recipients.slice(i, i + CHUNK_SIZE);

      const emailBatch = chunk.map((member) => {
        const personalizedBody = replaceVariables(
          validated.template.body,
          member,
        );
        const personalizedSubject = replaceVariables(
          validated.template.subject,
          member,
        );
        const personalizedTitle = replaceVariables(
          validated.template.title,
          member,
        );

        return {
          from: "Ultramadness <notificaciones@ultramadness.mx>", // Verify domain
          to: member.email,
          subject: personalizedSubject,
          react: CustomCampaignEmail({
            title: personalizedTitle,
            body: personalizedBody,
            imageUrl: validated.template.imageUrl,
            ctaText: validated.template.ctaText,
            ctaUrl: validated.template.ctaUrl,
          }),
        };
      });

      try {
        await resend.batch.send(emailBatch);
        sentCount += chunk.length;
      } catch (err) {
        console.error("Batch error:", err);
        errors.push(err);
      }
    }

    if (errors.length > 0 && sentCount === 0) {
      return { success: false, error: "Fallo completo del envío." };
    }

    return {
      success: true,
      count: sentCount,
      message: `Enviado a ${sentCount} destinatarios. ${errors.length > 0 ? "Hubo algunos errores." : ""}`,
    };
  } catch (error) {
    console.error("Error sending campaign:", error);
    return { success: false, error: "Error al procesar la campaña." };
  }
}
