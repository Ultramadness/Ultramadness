import { TitleSection } from "@/components/TitleSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Container";
import { EVENTOS_QUERY } from "@/sanity/query/Eventos";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { EventoSectionSkeleton } from "../skeletons/EventoSectionSkeleton";

interface Evento {
  title: string;
  description: string;
  image: SanityImageSource;
  date: string;
  url: string;
}

interface EventosData {
  title: string;
  description?: string;
  image?: SanityImageSource;
  eventList?: Evento[];
}

export const EventoSection = async () => {
  const { data: eventos } = (await sanityFetch({ query: EVENTOS_QUERY })) as {
    data: EventosData;
  };

  if (!eventos || !eventos.title) {
    return <EventoSectionSkeleton />;
  }

  const imgUrl = eventos.image ? urlFor(eventos.image).url() : "";

  return (
    <Container
      id="eventos"
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: imgUrl
          ? `
        linear-gradient(
        to bottom,
        var(--background) 5%,
        rgba(10, 10, 10, 0.4) 50%,
        var(--background) 100%
        ),
        url('${imgUrl}')
        `
          : "none",
      }}
    >
      <article className="h-full w-full flex flex-col items-center justify-center gap-16">
        <TitleSection
          className="text-center flex flex-col items-center"
          title={eventos.title}
          description={eventos.description}
        />

        <div className="flex flex-row items-center justify-center flex-wrap gap-8">
          {eventos.eventList
            ?.filter((item) => item.image && item.url)
            .map((item, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Link href={item.url} target="_blank">
                  <div className="relative w-72 h-96 xl:w-80 xl:h-[400px]">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title || "Imagen del Evento"}
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                <Link
                  href={item.url}
                  target="_blank"
                  className={cn(
                    buttonVariants(),
                    "w-full rounded-xs h-10 text-base font-medium",
                  )}
                >
                  Consigue Tus Entradas
                </Link>
              </div>
            ))}
        </div>
      </article>
    </Container>
  );
};
