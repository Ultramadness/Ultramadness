import { auth } from "@/auth";
import { getTemplateById } from "@/actions/templates";
import { TemplateForm } from "@/components/admin/templates/TemplateForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Template | Admin",
};

interface PageProps {
  params: Promise<{
    templateId: string;
  }>;
}

export default async function TemplateEditorPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { templateId } = await params;
  const isNew = templateId === "nuevo";

  let initialData = undefined;

  if (!isNew) {
    const { data } = await getTemplateById(templateId);
    if (!data) {
      return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Template no encontrado</h1>
          <Button asChild>
            <Link href="/admin/comunicacion/templates">Volver</Link>
          </Button>
        </div>
      );
    }
    initialData = data;
  }

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/admin/comunicacion/templates"
            className="text-primary hover:underline mb-1 block text-sm"
          >
            ← Volver a templates
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Crear Nuevo Template" : `Editar: ${initialData?.name}`}
        </h1>

        <TemplateForm
          initialData={
            initialData
              ? {
                  ...initialData,
                  imageUrl: initialData.imageUrl ?? undefined,
                  ctaText: initialData.ctaText ?? undefined,
                  ctaUrl: initialData.ctaUrl ?? undefined,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
