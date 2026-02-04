import { auth } from "@/auth";
import { CampaignWizard } from "@/components/admin/campaigns/CampaignWizard";
import { getTemplates } from "@/actions/templates";
import { getAudienceGenres } from "@/actions/audience";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nueva Campaña | Admin",
};

export default async function NewCampaignPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [templatesResult, genres] = await Promise.all([
    getTemplates(),
    getAudienceGenres(),
  ]);

  const templates =
    templatesResult.success && templatesResult.data ? templatesResult.data : [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin/comunicacion"
          className="text-primary hover:underline mb-2 block"
        >
          ← Volver a Comunicaciones
        </Link>

        <h1 className="text-3xl font-bold mb-8">Nueva Campaña de Email</h1>

        <CampaignWizard templates={templates} genres={genres} />
      </div>
    </div>
  );
}
