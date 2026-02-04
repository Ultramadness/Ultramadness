/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useTransition } from "react";
import { type AudienceMember, getAudience } from "@/actions/audience";
import { AudienceFilters } from "@/components/admin/audience/AudienceFilters";
import { AudienceTable } from "@/components/admin/audience/AudienceTable";
import { toast } from "sonner";

interface AudienceClientPageProps {
  initialData: AudienceMember[];
  genres: string[];
}

export default function AudienceClientPage({
  initialData,
  genres,
}: AudienceClientPageProps) {
  type AudienceFiltersState = {
    source?: "newsletter" | "contact_form";
    genre?: string;
    search?: string;
  };

  const [data, setData] = useState<AudienceMember[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<AudienceFiltersState>({});

  const handleFilterChange = (key: string, value: string | undefined) => {
    const newFilters = { ...filters };

    if (value === undefined) {
      delete newFilters[key as keyof AudienceFiltersState];
    } else {
      (newFilters as any)[key] = value; // Type assertion needed for dynamic key assignment but safe here
    }

    setFilters(newFilters);

    startTransition(async () => {
      const result = await getAudience(newFilters);
      if (result.success) {
        setData(result.data);
      } else {
        toast.error("Error al filtrar la audiencia");
      }
    });
  };

  const clearFilters = () => {
    setFilters({});
    startTransition(async () => {
      const result = await getAudience({});
      if (result.success) {
        setData(result.data);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Total: {data.length} personas</h2>
        <p className="text-sm text-muted-foreground">
          Gestiona tu base de datos de suscriptores y contactos.
        </p>
      </div>

      <AudienceFilters
        filters={filters}
        genres={genres}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        isLoading={isPending}
      />

      <AudienceTable data={data} isLoading={isPending} />
    </div>
  );
}
