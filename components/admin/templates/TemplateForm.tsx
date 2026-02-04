"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { templateSchema } from "@/lib/validations/template";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import CustomCampaignEmail from "@/emails/CustomCampaignEmail";
import { createTemplate, updateTemplate } from "@/actions/templates";
import { Loader2, Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TemplateFormValues = z.infer<typeof templateSchema>;

interface TemplateFormProps {
  initialData?: TemplateFormValues & { id: string };
}

export function TemplateForm({ initialData }: TemplateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: initialData || {
      name: "",
      subject: "",
      title: "",
      body: "",
      imageUrl: "",
      ctaText: "",
      ctaUrl: "",
    },
  });

  // Watch values for live preview
  const watchedValues = form.watch();

  const onSubmit = (data: TemplateFormValues) => {
    startTransition(async () => {
      let result;
      if (initialData) {
        result = await updateTemplate(initialData.id, data);
      } else {
        result = await createTemplate(data);
      }

      if (result.success) {
        toast.success(
          initialData
            ? "Template actualizado"
            : "Template creado correctamente",
        );
        router.push("/admin/comunicacion/templates");
        router.refresh();
      } else {
        toast.error(result.error || "Ocurrió un error");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
      {/* Columna Izquierda: Formulario */}
      <div className="overflow-y-auto pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Template (Interno)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Newsletter Mensual" {...field} />
                    </FormControl>
                    <FormDescription>
                      Identificador para uso interno en el panel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asunto del Correo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: ¡No te pierdas lo nuevo!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Título del email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de Imagen (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido (Markdown)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="# Hola mundo..."
                        className="min-h-[200px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <div className="mt-2 text-sm">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full border rounded-md px-3 bg-muted/20"
                      >
                        <AccordionItem
                          value="markdown-examples"
                          className="border-0"
                        >
                          <AccordionTrigger className="text-muted-foreground py-2 hover:no-underline hover:text-foreground text-xs font-normal">
                            Ver guía rápida de Markdown
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-xs text-muted-foreground space-y-2 border-t pt-2 mt-1">
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="col-span-2 mb-2 pt-2 pb-4 border-b">
                                  <span className="block font-semibold mb-1">
                                    Variables Dinámicas
                                  </span>
                                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                                    <div>
                                      <code className="bg-primary/20 text-primary px-1 py-0.5 rounded">
                                        {"{{name}}"}
                                      </code>
                                      <span className="ml-1 text-muted-foreground block text-[9px] leading-tight mt-1">
                                        Nombre (Solo si completó formulario)
                                      </span>
                                    </div>
                                    <div>
                                      <code className="bg-primary/20 text-primary px-1 py-0.5 rounded">
                                        {"{{email}}"}
                                      </code>
                                      <span className="ml-1 text-muted-foreground">
                                        Email
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <span className="block font-semibold mb-1">
                                    Encabezados
                                  </span>
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    # Título 1
                                  </code>
                                  <div className="text-[10px] mt-0.5 text-muted-foreground">
                                    (Espacio obligatorio)
                                  </div>
                                </div>
                                <div>
                                  <span className="block font-semibold mb-1">
                                    Subtítulos
                                  </span>
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    ## Título 2
                                  </code>
                                </div>

                                <div>
                                  <span className="block font-semibold mb-1">
                                    Texto
                                  </span>
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    **Negrita**
                                  </code>
                                  <br />
                                  <code className="bg-muted px-1 py-0.5 rounded mt-1 inline-block">
                                    *Cursiva*
                                  </code>
                                </div>

                                <div>
                                  <span className="block font-semibold mb-1">
                                    Enlaces
                                  </span>
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    [Texto](url)
                                  </code>
                                </div>

                                <div className="col-span-2">
                                  <span className="block font-semibold mb-1">
                                    Listas
                                  </span>
                                  <code className="bg-muted px-1 py-0.5 rounded">
                                    - Elemento 1
                                  </code>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <FormDescription className="sr-only">
                      Soporta Markdown.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-muted/20">
                <div className="col-span-2 text-sm font-medium mb-2">
                  Botón de Acción (Opcional)
                </div>
                <FormField
                  control={form.control}
                  name="ctaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto del Botón</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Ver Eventos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {initialData ? "Actualizar Template" : "Guardar Template"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Columna Derecha: Preview */}
      <div className="bg-[#121212] rounded-xl border p-4 flex flex-col justify-start items-center overflow-hidden">
        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider text-center">
          Vista Previa en Vivo
        </h3>

        {/* Wrapper para simular constraints de email */}
        <div className="w-full max-w-[700px] bg-transparent overflow-y-auto">
          <CustomCampaignEmail
            title={watchedValues.title || "Titulo del Email"}
            body={
              watchedValues.body ||
              "Escribe el contenido para ver el resultado..."
            }
            imageUrl={watchedValues.imageUrl}
            ctaText={watchedValues.ctaText}
            ctaUrl={watchedValues.ctaUrl}
            previewText={watchedValues.subject}
            disableHtmlWrapper={true}
          />
        </div>
      </div>
    </div>
  );
}
