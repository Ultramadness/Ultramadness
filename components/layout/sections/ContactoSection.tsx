import { sanityFetch } from "@/sanity/lib/live";
import { Container } from "../Container";
import { ContactForm } from "@/components/ContactForm";
import { GENEROS_QUERY } from "@/sanity/query/Generos";
import { CONTACTO_QUERY } from "@/sanity/query/HomeQuery";

export const ContactoSection = async () => {
  const { data: contacto } = await sanityFetch({ query: CONTACTO_QUERY });
  const { data: generos } = await sanityFetch({ query: GENEROS_QUERY });

  if (!contacto) return null;

  // Construir la URL del mapa con las coordenadas
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${contacto.googleMapsCordenates}&zoom=14`;

  return (
    <Container
      id="contacto"
      className="flex flex-col lg:flex-row px-0 md:px-0 py-0 bg-black-gray"
    >
      <article className="w-full lg:w-1/2 px-4 md:px-12 space-y-12 py-28">
        <div className={`space-y-4 w-full`}>
          <h2 className={`font-crimson text-5xl italic`}>{contacto.title}</h2>

          <p className="text-xl lg:text-2xl font-light w-10/12">
            {contacto.description}
          </p>

          <div className="w-2/4 bg-primary h-1" />
        </div>

        <ContactForm generos={generos || []} />
      </article>

      <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full mt-8 lg:mt-0">
        <iframe
          className="min-h-[400px] h-full w-full"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación en Google Maps"
        />
      </div>
    </Container>
  );
};
