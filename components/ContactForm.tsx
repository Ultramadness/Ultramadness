"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { contactFormSchema } from "@/lib/validations/contact-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/contact";

type GeneroMusical = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

export const ContactForm = ({ generos }: { generos: GeneroMusical[] }) => {
  const [showOtherGenre, setShowOtherGenre] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      musicalGenre: "",
      otherGenre: "",
      receiveNews: false,
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    startTransition(async () => {
      const result = await submitContactForm(values);

      if (result.success) {
        toast.success(
          "¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto."
        );
        form.reset();
        setShowOtherGenre(false);
      } else {
        toast.error(result.error || "Hubo un problema al enviar el mensaje.");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:gap-x-16">
          {/* Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-lg mb-1">
                  Nombre
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className="border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-lg mb-1">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                    className="border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Teléfono */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-lg mb-1">
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Tu teléfono"
                    {...field}
                    className="border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Género Musical */}
          <FormField
            control={form.control}
            name="musicalGenre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-lg mb-1">
                  Género Musical
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setShowOtherGenre(value === "otro");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus:ring-0 focus:border-primary">
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {generos.map((genero) => (
                      <SelectItem key={genero._id} value={genero.slug.current}>
                        {genero.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Otro Género (condicional) */}
        {showOtherGenre && (
          <FormField
            control={form.control}
            name="otherGenre"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="font-light text-lg mb-1">
                  Especifica el género musical
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe el género musical"
                    {...field}
                    className="border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Switch de noticias */}
        <FormField
          control={form.control}
          name="receiveNews"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="space-y-0.5">
                <FormLabel className="font-light text-lg mb-1">
                  Deseo recibir noticias sobre próximos eventos y experiencias.
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Mensaje */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light text-lg mb-1">
                ¿Qué tipo de experiencias musicales te gustaría vivir?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos sobre tus experiencias musicales ideales..."
                  {...field}
                  className="border-0 border-b-2 border-white rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary resize-none h-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer md:w-44 h-10 text-lg rounded-xs"
        >
          {isPending ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </Form>
  );
};
