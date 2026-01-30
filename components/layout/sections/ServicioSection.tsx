import { TitleSection } from "@/components/TitleSection";
import { Container } from "../Container";

import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SERVICIOS_QUERY } from "@/sanity/query/HomeQuery";
import { GeneralSectionSkeleton } from "../skeletons/GeneralSectionSkeleton";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ServiceItem {
  _key: string;
  icon: SanityImageSource;
  title: string;
  description: string | null;
}

interface ServiciosData {
  title: string;
  description?: string;
  services?: ServiceItem[];
}

export const ServicioSection = async () => {
  const { data: servicios } = (await sanityFetch({
    query: SERVICIOS_QUERY,
  })) as {
    data: ServiciosData;
  };

  if (!servicios || !servicios.title) {
    return <GeneralSectionSkeleton itemsCount={3} />;
  }

  return (
    <Container className="flex flex-col items-center justify-center gap-16">
      <TitleSection
        title={servicios.title}
        description={servicios.description || ""}
        className="text-center flex flex-col items-center"
      />
      <article className="max-w-7xl mx-auto flex flex-row items-start justify-center xl:justify-between flex-wrap gap-16">
        {servicios.services
          ?.filter((item: ServiceItem) => item.icon && item.title)
          .map((item: ServiceItem) => (
            <div
              key={item._key}
              className="flex flex-col items-center max-w-[340px]"
            >
              <div className="relative w-60 h-72 mb-4">
                <Image
                  src={urlFor(item.icon).url()}
                  alt="Icon"
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="font-crimson text-center font-semibold text-3xl mb-1">
                {item.title}
              </h3>

              <p className="font-medium text-xl text-center">
                {item.description}
              </p>
            </div>
          ))}
      </article>
    </Container>
  );
};
