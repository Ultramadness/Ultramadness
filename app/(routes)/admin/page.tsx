import { auth } from "@/auth";
import { AdminEvents } from "@/components/admin/AdminEvents";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { redirect } from "next/navigation";

import Link from "next/link";
import { Mail, Users, LayoutDashboard, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Gestión de contenidos y usuarios de Ultramadness",
};

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Módulo de Comunicación */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Comunicación</h2>
            </div>
            <p className="text-muted-foreground mb-6 h-12">
              Gestiona campañas de email, templates y comunicados.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/comunicacion"
                className="text-primary hover:underline font-medium flex items-center gap-2"
              >
                Ir al Panel <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <Link
                  href="/admin/comunicacion/crear"
                  className="hover:text-foreground"
                >
                  Nueva Campaña
                </Link>
                <Link
                  href="/admin/comunicacion/templates"
                  className="hover:text-foreground"
                >
                  Templates
                </Link>
              </div>
            </div>
          </div>

          {/* Módulo de Audiencia */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Audiencia</h2>
            </div>
            <p className="text-muted-foreground mb-6 h-12">
              Base de datos unificada de suscriptores y contactos.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/audiencia"
                className="text-primary hover:underline font-medium flex items-center gap-2"
              >
                Ver Audiencia <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <Link
                  href="/admin/newsletter"
                  className="hover:text-foreground"
                >
                  Newsletter
                </Link>
                <Link href="/admin/contactos" className="hover:text-foreground">
                  Contactos
                </Link>
              </div>
            </div>
          </div>

          {/* Módulo de Contenido */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Contenido</h2>
            </div>
            <p className="text-muted-foreground mb-6 h-12">
              Administra el contenido del sitio web desde Sanity.
            </p>
            <a
              href="/studio"
              className="text-primary hover:underline font-medium flex items-center gap-2"
              target="_blank"
            >
              Ir a Sanity Studio <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <AdminEvents />
      </div>
    </div>
  );
}
