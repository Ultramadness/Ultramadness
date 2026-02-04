"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { type AudienceSource } from "@/actions/audience";

interface AudienceFiltersProps {
  filters: {
    source?: AudienceSource;
    genre?: string;
    search?: string;
  };
  genres: string[];
  onFilterChange: (key: string, value: string | undefined) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export function AudienceFilters({
  filters,
  genres,
  onFilterChange,
  onClearFilters,
  isLoading,
}: AudienceFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por email o nombre..."
          className="pl-8"
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Select
        value={filters.source || "all"}
        onValueChange={(val) =>
          onFilterChange("source", val === "all" ? undefined : val)
        }
        disabled={isLoading}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Origen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los orígenes</SelectItem>
          <SelectItem value="newsletter">Newsletter</SelectItem>
          <SelectItem value="contact_form">Formulario</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.genre || "all"}
        onValueChange={(val) =>
          onFilterChange("genre", val === "all" ? undefined : val)
        }
        disabled={isLoading}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Género Musical" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los géneros</SelectItem>
          {genres.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(filters.source || filters.genre || filters.search) && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="px-2 lg:px-3"
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
