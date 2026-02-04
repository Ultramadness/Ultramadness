"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { templateSchema, type TemplateData } from "@/lib/validations/template";

export async function createTemplate(data: TemplateData) {
  try {
    const validated = templateSchema.parse(data);

    // Clean empty optional strings to null
    const cleanedData = {
      ...validated,
      imageUrl: validated.imageUrl || null,
      ctaText: validated.ctaText || null,
      ctaUrl: validated.ctaUrl || null,
    };

    const template = await prisma.emailTemplate.create({
      data: cleanedData,
    });

    revalidatePath("/admin/comunicacion/templates");
    return { success: true, data: template };
  } catch (error) {
    console.error("Error creating template:", error);
    return { success: false, error: "Error al crear el template" };
  }
}

export async function updateTemplate(id: string, data: TemplateData) {
  try {
    const validated = templateSchema.parse(data);

    const cleanedData = {
      ...validated,
      imageUrl: validated.imageUrl || null,
      ctaText: validated.ctaText || null,
      ctaUrl: validated.ctaUrl || null,
    };

    const template = await prisma.emailTemplate.update({
      where: { id },
      data: cleanedData,
    });

    revalidatePath("/admin/comunicacion/templates");
    revalidatePath(`/admin/comunicacion/templates/${id}`);
    return { success: true, data: template };
  } catch (error) {
    console.error("Error updating template:", error);
    return { success: false, error: "Error al actualizar el template" };
  }
}

export async function deleteTemplate(id: string) {
  try {
    await prisma.emailTemplate.delete({
      where: { id },
    });

    revalidatePath("/admin/comunicacion/templates");
    return { success: true };
  } catch (error) {
    console.error("Error deleting template:", error);
    return { success: false, error: "Error al eliminar el template" };
  }
}

export async function getTemplates() {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: templates };
  } catch (error) {
    console.error("Error fetching templates:", error);
    return { success: false, error: "Error al obtener templates" };
  }
}

export async function getTemplateById(id: string) {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { id },
    });
    return { success: true, data: template };
  } catch (error) {
    console.error("Error fetching template:", error);
    return { success: false, error: "Error al obtener el template" };
  }
}
