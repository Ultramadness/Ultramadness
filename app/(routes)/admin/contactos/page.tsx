import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ContactosPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const contactos = await prisma.contactForm.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin"
              className="text-primary hover:underline mb-2 block"
            >
              ← Volver al panel
            </Link>
            <h1 className="text-4xl font-bold">Formularios de Contacto</h1>
            <p className="text-muted-foreground">
              Total de mensajes: {contactos.length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {contactos.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">
                No hay mensajes de contacto aún
              </p>
            </div>
          ) : (
            contactos.map((contacto) => (
              <div
                key={contacto.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{contacto.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {contacto.email} • {contacto.phone}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(contacto.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Género Musical:</span>
                    <span className="text-sm ml-2">
                      {contacto.musicalGenre === "otro"
                        ? contacto.otherGenre
                        : contacto.musicalGenre}
                    </span>
                  </div>

                  {contacto.receiveNews && (
                    <div className="text-sm text-muted-foreground">
                      ✓ Desea recibir noticias
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="text-sm font-medium block mb-1">
                      Mensaje:
                    </span>
                    <p className="text-sm bg-muted p-3 rounded">
                      {contacto.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
