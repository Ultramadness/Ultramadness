import Image from "next/image";
import Link from "next/link";
import { navLinks, navLinksExternal } from "@/lib/data";
import { RevealText } from "../RevealText";
import { sanityFetch } from "@/sanity/lib/live";
import { NewsletterForm } from "../NewsletterForm";
import { REDES_QUERY } from "@/sanity/query/RedesSociales";

export const Footer = async ({ external }: { external?: boolean }) => {
  const { data: redesSociales } = await sanityFetch({ query: REDES_QUERY });

  return (
    <footer className="py-16 px-6 md:px-12 bg-background flex flex-wrap justify-between items-center lg:items-start">
      <div className="max-w-[420px]">
        <Link href={"/"}>
          <div className="relative h-16 w-60 md:h-20 md:w-[420px]">
            <Image
              src={"/ultramadness-logo.png"}
              alt="Ultramadness Logo"
              fill
              objectFit="contain"
            />
          </div>
        </Link>

        <p className="text-2xl font-light">
          Una experiencia inmersiva que te conecta con la esencia de la música.
        </p>

        <NewsletterForm />
      </div>

      <nav className="flex gap-16 flex-wrap mt-8 lg:mt-0">
        <div>
          <h4 className="font-crimson font-semibold text-2xl">
            Enlaces rápidos
          </h4>

          <ul className="flex flex-col mt-2">
            {external
              ? navLinksExternal.map((link) => (
                  <li
                    key={link.id}
                    className="text-2xl font-crimson h-10 overflow-clip"
                  >
                    <RevealText
                      text={link.title}
                      to={`${link.id}`}
                      delayPerLetter={30}
                    />
                  </li>
                ))
              : navLinks.map((link) => (
                  <li
                    key={link.id}
                    className="text-2xl font-crimson h-10 overflow-clip"
                  >
                    <RevealText
                      text={link.title}
                      to={`${link.id}`}
                      delayPerLetter={30}
                    />
                  </li>
                ))}
          </ul>
        </div>
        <div>
          <h4 className="font-crimson font-semibold text-2xl">Relacionados</h4>

          <ul className="flex flex-col mt-2 ">
            {redesSociales &&
              redesSociales.length > 0 &&
              Object.entries(redesSociales[0]).map(([key, value]) => {
                if (!value) return null;

                const title = key.charAt(0).toUpperCase() + key.slice(1);

                return (
                  <li
                    key={key}
                    className="text-2xl font-crimson h-10 overflow-clip"
                  >
                    <RevealText text={title} to={value} delayPerLetter={30} />
                  </li>
                );
              })}
          </ul>
        </div>

        <div>
          <h4 className="font-crimson font-semibold text-2xl">Información</h4>

          <ul className="flex flex-col mt-2 ">
            <li className="text-2xl font-crimson h-10 overflow-clip">
              <RevealText
                text={"Entradas / Prime Tickets"}
                to={"#eventos"}
                delayPerLetter={15}
              />
            </li>
            <li className="text-2xl font-crimson h-10 overflow-clip">
              <RevealText
                text={"Preguntas Frecuentes (FAQ)"}
                to={external ? "/#faq" : "#faq"}
                delayPerLetter={15}
              />
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};
