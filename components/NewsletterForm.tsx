"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { z } from "zod";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    setMessage(null);
    startTransition(async () => {
      const result = await subscribeToNewsletter(values, "footer");

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "¡Gracias por suscribirte!",
        });
        form.reset();
      } else {
        setMessage({
          type: "error",
          text: result.error || "Hubo un problema. Intenta de nuevo.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 lg:mt-16">
        <Label className="text-2xl font-crimson text-start mb-2">
          Ingresa tu correo para recibir novedades
        </Label>

        <div className="flex w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="correoejemplo@gmail.com"
                    {...field}
                    disabled={isPending}
                    className="w-full rounded-none border-none bg-black-gray h-12 font-crimson text-lg placeholder:text-lg outline-0 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="rounded-none h-12 w-12 cursor-pointer"
            size={"icon"}
          >
            <ChevronRight className="size-9" />
          </Button>
        </div>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.type === "success" ? "text-primary" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </Form>
  );
}
