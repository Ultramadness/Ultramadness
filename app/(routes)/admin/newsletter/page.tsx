import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function NewsletterPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const stats = {
    total: subscribers.length,
    fromFooter: subscribers.filter((s) => s.source === "footer").length,
    fromContactForm: subscribers.filter((s) => s.source === "contact_form")
      .length,
  };

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
            <h1 className="text-4xl font-bold">Suscriptores del Newsletter</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-1">
              Total Suscriptores
            </h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-1">Desde Footer</h3>
            <p className="text-3xl font-bold">{stats.fromFooter}</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-1">
              Desde Formulario
            </h3>
            <p className="text-3xl font-bold">{stats.fromContactForm}</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Origen</th>
                <th className="text-left p-4">Fecha de Suscripción</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No hay suscriptores aún
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-t hover:bg-muted/50"
                  >
                    <td className="p-4">{subscriber.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          subscriber.source === "footer"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {subscriber.source === "footer"
                          ? "Footer"
                          : "Formulario de Contacto"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(subscriber.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
