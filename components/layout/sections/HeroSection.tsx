import { AnuncioSlider } from "@/components/AnuncioSlider";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/query/HomeQuery";
import { REDES_QUERY } from "@/sanity/query/RedesSociales";
import { RedSocial } from "@/sanity/schemaTypes/redesSociales";
import Image from "next/image";
import Link from "next/link";
import { HeroSectionSkeleton } from "../skeletons/HeroSectionSkeleton";

export const HeroSection = async () => {
  const { data: hero } = await sanityFetch({
    query: HERO_QUERY,
  });

  const { data: redesSociales } = await sanityFetch({
    query: REDES_QUERY,
  });

  if (!hero || !hero.title) {
    return <HeroSectionSkeleton />;
  }

  const imgURL = hero.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).quality(75).auto("format").url()
    : "";

  return (
    <section className="relative min-h-screen" id="inicio">
      {/* Background image */}
      {imgURL && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={imgURL}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-transparent to-background" />

      {/* Dark overlay opcional */}
      {hero.darkenImage && (
        <div className="absolute inset-0 bg-background/15 -z-10" />
      )}

      {/* Contenido */}
      <div className="relative min-h-[80vh] flex flex-col justify-between pt-24">
        <div className="flex flex-col mt-2 gap-2 px-6 md:px-12 items-end">
          <TooltipProvider>
            {redesSociales?.redes?.map((social: RedSocial) => {
              if (!social.url || !social.name) return null;

              const iconMap: Record<string, string> = {
                facebook: "ri-facebook-line",
                instagram: "ri-instagram-line",
                twitter: "ri-twitter-x-line",
                youtube: "ri-youtube-line",
                whatsapp: "ri-whatsapp-line",
                tiktok: "ri-tiktok-fill",
              };

              const icon = iconMap[social.name];
              if (!icon) return null;

              return (
                <Tooltip key={social._key || social.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center transition-colors hover:text-primary/80"
                    >
                      <i className={`${icon} text-3xl text-primary`} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{social.title || social.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        <article className="w-full px-6 md:px-12 md:pb-4">
          <div className="relative w-full lg:w-[65%] 2xl:w-[55%]">
            {hero.blurText && (
              <div className="absolute inset-0 blur-2xl opacity-80 pointer-events-none">
                <h1 className="text-5xl 2xl:text-6xl font-crimson mb-1">
                  {hero.title}
                </h1>
                <p className="text-xl 2xl:text-2xl font-light">
                  {hero.subtitle}
                </p>
              </div>
            )}

            <div className="relative z-10">
              <Link
                href="#eventos"
                className={cn(
                  buttonVariants(),
                  "rounded-xs md:text-lg font-semibold md:h-10 mb-4",
                )}
              >
                Consigue Tus Entradas
              </Link>

              <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-crimson mb-1">
                {hero.title}
              </h1>

              <p className="text-base md:text-lg lg:text-xl 2xl:text-2xl font-light">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div>
        {hero.announcement && <AnuncioSlider anuncio={hero.announcement} />}
      </div>
    </section>
  );
};
