import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Mail, Users, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de Comunicación | Admin",
  description: "Gestiona tus campañas de email y templates",
};

export default async function CommunicationPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

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
            <h1 className="text-4xl font-bold">Centro de Comunicación</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona campañas y templates de email para tu audiencia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Tarjeta de Campaña */}
          <Card className="hover:shadow-lg transition-all border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Nueva Campaña
              </CardTitle>
              <CardDescription>
                Envía un correo a tu audiencia o segmentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/comunicacion/crear">
                  <Plus className="w-4 h-4 mr-2" />
                  Iniciar Campaña
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tarjeta de Templates */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Templates
              </CardTitle>
              <CardDescription>
                Gestiona tus diseños reutilizables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/admin/comunicacion/templates">Ver Templates</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tarjeta de Audiencia */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Audiencia
              </CardTitle>
              <CardDescription>
                Visualiza y gestiona suscriptores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/admin/audiencia">Ir a Audiencia</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sección Informativa */}
        <div className="border rounded-lg p-6 bg-muted/30">
          <h3 className="font-semibold mb-2">¿Cómo funciona?</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Templates:</strong> Crea
              diseños base para tus correos. Puedes guardar textos, títulos e
              imágenes predefinidos.
            </li>
            <li>
              <strong className="text-foreground">Campañas:</strong> Elige un
              template, selecciona a quién enviárselo (toda la audiencia o
              filtrada por intereses) y envíalo.
            </li>
            <li>
              <strong className="text-foreground">Seguridad:</strong> El sistema
              utiliza Resend para garantizar la entrega y evitar spam.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
