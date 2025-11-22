import { sanityFetch } from "@/sanity/lib/live";
import { EVENTOS_QUERY } from "@/sanity/query/Eventos";
import { EventCard } from "./EventCard";

export async function AdminEvents() {
  const { data: eventos } = await sanityFetch({ query: EVENTOS_QUERY });

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Eventos</h2>

      <p className="text-muted-foreground mb-6">
        Aquí puedes ver los eventos cargados en Sanity y enviar anuncios.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos?.eventList?.map((item) => (
          <EventCard key={item._key} item={item} />
        ))}
      </div>
    </div>
  );
}
