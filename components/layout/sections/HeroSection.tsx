import { AnuncioSlider } from "@/components/AnuncioSlider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/query/HomeQuery";
import { REDES_QUERY } from "@/sanity/query/RedesSociales";
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

  const imgURL = hero.backgroundImage ? urlFor(hero.backgroundImage).url() : "";

  return (
    <section className="min-h-screen relative" id="inicio">
      <div
        className="min-h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col justify-between pt-24"
        style={{
          backgroundImage: imgURL
            ? `
        linear-gradient(
          to bottom,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0) 60%,
          var(--background) 100%
          ),
          url('${imgURL}')
          `
            : "none",
        }}
      >
        <div className="relative z-5 flex flex-col mt-2 gap-2 px-6 md:px-12 items-end">
          {redesSociales &&
            redesSociales.length > 0 &&
            Object.entries(redesSociales[0]).map(([key, value]) => {
              if (!value || key === "_id" || key === "_type") return null;

              const iconMap: Record<string, string> = {
                facebook: "ri-facebook-line",
                instagram: "ri-instagram-line",
                twitter: "ri-twitter-x-line",
                youtube: "ri-youtube-line",
              };

              const icon = iconMap[key];
              if (!icon) return null;

              return (
                <a
                  key={key}
                  href={value as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition-colors"
                >
                  <i className={`${icon} text-3xl text-primary`} />
                </a>
              );
            })}
        </div>

        <article className="relative w-full px-6 md:px-12 md:pb-4">
          <div className="relative w-full lg:w-[65%] 2xl:w-[55%]">
            {/* BLOQUE CLONADO PARA EL DIFUMINADO */}
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

            {/* BLOQUE REAL */}
            <div className="relative z-10">
              <Link
                href={"#eventos"}
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

      {hero.darkenImage ? (
        <div className="absolute inset-0 bg-background/15 z-0" />
      ) : null}

      <div>
        {hero.announcement && <AnuncioSlider anuncio={hero.announcement} />}
      </div>
    </section>
  );
};
