import { auth } from "@/auth";
import { getTemplates } from "@/actions/templates";
import { TemplateCard } from "@/components/admin/templates/TemplateCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates de Email | Admin",
};

export default async function TemplatesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { data: templates } = await getTemplates();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin/comunicacion"
              className="text-primary hover:underline mb-2 block"
            >
              ← Volver a Comunicación
            </Link>
            <h1 className="text-4xl font-bold">Templates de Email</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tus diseños para campañas de email.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/comunicacion/templates/nuevo">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Template
            </Link>
          </Button>
        </div>

        {!templates || templates.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              No hay templates creados
            </h3>
            <p className="text-muted-foreground mb-6">
              Empieza creando tu primer diseño de email reutilizable.
            </p>
            <Button asChild>
              <Link href="/admin/comunicacion/templates/nuevo">
                Crear Template
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
