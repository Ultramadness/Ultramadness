import { auth } from "@/auth";
import { AdminEvents } from "@/components/admin/AdminEvents";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Bienvenido, {session.user.email}
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Formularios de Contacto
            </h2>
            <p className="text-muted-foreground mb-4">
              Ver y gestionar los mensajes recibidos
            </p>
            <a href="/admin/contactos" className="text-primary hover:underline">
              Ver contactos →
            </a>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Newsletter</h2>
            <p className="text-muted-foreground mb-4">
              Ver suscriptores del newsletter
            </p>
            <a
              href="/admin/newsletter"
              className="text-primary hover:underline"
            >
              Ver suscriptores →
            </a>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Contenido</h2>
            <p className="text-muted-foreground mb-4">
              Gestionar el contenido del sitio
            </p>
            <a
              href="/studio"
              className="text-primary hover:underline"
              target="_blank"
            >
              Ir a Sanity Studio →
            </a>
          </div>
        </div>

        <AdminEvents />
      </div>
    </div>
  );
}
