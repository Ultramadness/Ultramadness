"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteTemplate } from "@/actions/templates";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    title: string;
    imageUrl?: string | null;
    updatedAt: Date;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteTemplate(template.id);
    if (result.success) {
      toast.success("Template eliminado");
      router.refresh();
    } else {
      toast.error("Error al eliminar el template");
    }
  };

  return (
    <Card className="p-0 gap-0 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-muted">
        {template.imageUrl ? (
          <Image
            src={template.imageUrl}
            alt={template.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sin imagen
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold truncate">{template.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {template.title}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 text-xs text-muted-foreground grow">
        Actualizado: {new Date(template.updatedAt).toLocaleDateString()}
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1 h-10" asChild>
          <Link href={`/admin/comunicacion/templates/${template.id}`}>
            <Edit2 className="w-3 h-3 mr-2" />
            Editar
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-10 w-10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente
                el template &quot;{template.name}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
