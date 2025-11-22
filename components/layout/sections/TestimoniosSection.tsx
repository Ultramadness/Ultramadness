import { Container } from "../Container";
import { sanityFetch } from "@/sanity/lib/live";
import { TitleSection } from "@/components/TitleSection";
import { TestimoniosContent } from "@/components/layout/sections/TestimoniosContent";
import { TESTIMONIOS_QUERY } from "@/sanity/query/HomeQuery";

export const TestimoniosSection = async () => {
  const { data: testimonios } = await sanityFetch({ query: TESTIMONIOS_QUERY });

  if (!testimonios) {
    return null;
  }

  return (
    <Container id="testimonios" className="py-16 md:py-24">
      <article className="flex flex-col items-center w-full h-full gap-16">
        <TitleSection
          title={testimonios.title || ""}
          description={testimonios.description || undefined}
          className="text-center flex flex-col items-center"
        />

        <TestimoniosContent
          textTestimonials={testimonios.textTestimonials || []}
          videoTestimonials={testimonios.videoTestimonials || []}
        />
      </article>
    </Container>
  );
};
