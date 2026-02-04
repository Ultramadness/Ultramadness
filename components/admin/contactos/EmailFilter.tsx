"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmailOption {
  email: string;
  count: number;
}

interface EmailFilterProps {
  emails: EmailOption[];
  totalCount: number;
}

export function EmailFilter({ emails, totalCount }: EmailFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedEmail = searchParams.get("email") || "";

  const [open, setOpen] = React.useState(false);

  const handleSelect = (email: string) => {
    if (email === "") {
      router.push("/admin/contactos");
    } else {
      router.push(`/admin/contactos?email=${encodeURIComponent(email)}`);
    }
    setOpen(false);
  };

  const handleClear = () => {
    router.push("/admin/contactos");
  };

  const selectedOption = emails.find((e) => e.email === selectedEmail);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium whitespace-nowrap">
        Filtrar por email:
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {selectedEmail ? (
              <span className="truncate">
                {selectedEmail} ({selectedOption?.count || 0})
              </span>
            ) : (
              <span>Todos los emails ({totalCount})</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar email..." />
            <CommandList>
              <CommandEmpty>No se encontró el email.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value=""
                  onSelect={() => handleSelect("")}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedEmail === "" ? "opacity-100" : "opacity-0",
                    )}
                  />
                  Todos los emails ({totalCount})
                </CommandItem>
                {emails.map((option) => (
                  <CommandItem
                    key={option.email}
                    value={option.email}
                    onSelect={() => handleSelect(option.email)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedEmail === option.email
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span className="truncate flex-1">{option.email}</span>
                    <span className="text-muted-foreground ml-2">
                      ({option.count})
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedEmail && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Limpiar filtro</span>
        </Button>
      )}
    </div>
  );
}
