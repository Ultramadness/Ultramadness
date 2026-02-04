"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AudienceMember } from "@/actions/audience";

interface AudienceTableProps {
  data: AudienceMember[];
  isLoading: boolean;
}

export function AudienceTable({ data, isLoading }: AudienceTableProps) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Cargando audiencia...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-12 text-center border rounded-lg bg-muted/10">
        <Mail className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-1">
          No se encontraron contactos
        </h3>
        <p className="text-muted-foreground text-sm">
          Prueba ajustando los filtros de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead>Intereses</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">
                    {(member.name || member.email).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  {member.name && (
                    <span className="font-medium text-sm">{member.name}</span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {member.email}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    member.source === "newsletter"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100"
                  }
                >
                  {member.source === "newsletter" ? "Newsletter" : "Formulario"}
                </Badge>
                {member.status === "active" &&
                  member.source === "contact_form" && (
                    <Badge
                      variant="outline"
                      className="ml-2 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Recibe News
                    </Badge>
                  )}
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {member.tags.length > 0 ? (
                    member.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-xs text-muted-foreground">
                {new Date(member.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(member.email)
                      }
                    >
                      Copiar Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>Enviar Mensaje Directo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
