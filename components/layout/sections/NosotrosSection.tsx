import { Container } from "../Container";
import { sanityFetch } from "@/sanity/lib/live";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NOSOTROS_QUERY } from "@/sanity/query/HomeQuery";

export const NosotrosSection = async () => {
  const { data: sobreNosotros } = await sanityFetch({
    query: NOSOTROS_QUERY,
  });

  if (!sobreNosotros) return null;

  const imgURL = sobreNosotros.image
    ? urlFor(sobreNosotros.image).width(1920).quality(75).auto("format").url()
    : null;

  return (
    <Container id="blog" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      {imgURL && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={imgURL}
            alt="Sobre Nosotros Background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-transparent to-background" />

      {/* Contenido */}
      <article className="relative py-20 flex flex-col items-start justify-end">
        <div className="relative w-64 h-20 sm:w-80 md:w-md md:h-24 xl:w-lg 2xl:h-28 2xl:w-2xl xl:mb-2">
          <Image
            src="/ultramadness-logo.png"
            alt="Ultramadness Logo"
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h2 className="font-crimson font-semibold text-2xl xl:text-3xl italic mb-1">
            {sobreNosotros.title}
          </h2>
          <div className="w-[68%] bg-primary h-1" />
        </div>

        <p className="my-6 font-light w-[60%] lg:text-lg lg:w-1/2 xl:w-[40%] 2xl:w-[30%]">
          {sobreNosotros.description}
        </p>

        <div className="my-8 space-y-4 w-full">
          <p className="text-lg xl:text-xl w-[70%] xl:w-1/2 2xl:w-[30%]">
            {sobreNosotros.subtitle}
          </p>

          <Link
            href="/blog"
            className={cn(
              buttonVariants(),
              "rounded-xs text-lg font-semibold h-10 group w-44",
            )}
          >
            Entra al Blog
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </article>
    </Container>
  );
};
