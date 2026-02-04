"use client";

import Image from "next/image";
import { useActionState, useEffect } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "sonner";
import {
  EventAnnouncementState,
  sendEventAnnouncement,
} from "@/actions/newsletter";
import { Evento } from "@/sanity.types";

export const EventCard = ({ item }: { item: Evento }) => {
  const [state, action, isPending] = useActionState<EventAnnouncementState>(
    sendEventAnnouncement,
    { success: false, message: "" },
  );

  // Mostrar toast cuando cambie el estado
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="border rounded-lg p-4 space-y-4 flex flex-col bg-card shadow-sm">
      <div className="relative w-full h-64 rounded-md overflow-hidden">
        <Image
          src={urlFor(item.image).url()}
          alt="Imagen del evento"
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold">{item.title}</h3>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {item?.description}
      </p>

      <form action={action} className="flex flex-col gap-2 mt-auto">
        <input type="hidden" name="eventId" value={item._key} />

        <button
          disabled={isPending}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full rounded-xs",
          )}
        >
          {isPending ? "Enviando..." : "Enviar Anuncio"}
        </button>
      </form>

      {state.message && (
        <p
          className={cn(
            "text-sm",
            state.success ? "text-primary" : "text-red-500",
          )}
        >
          {state.message}
        </p>
      )}
    </div>
  );
};
