import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAudience, getAudienceGenres } from "@/actions/audience";
import AudienceClientPage from "./AudienceClientPage";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestión de Audiencia | Admin",
  description: "Administra suscriptores y contactos",
};

export default async function AudiencePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch initial data
  const [audienceResult, genres] = await Promise.all([
    getAudience(),
    getAudienceGenres(),
  ]);

  const initialData = audienceResult.success ? audienceResult.data : [];

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
            <h1 className="text-4xl font-bold">Gestión de Audiencia</h1>
          </div>
        </div>

        <AudienceClientPage initialData={initialData} genres={genres} />
      </div>
    </div>
  );
}
