import { Container } from "../Container";
import { sanityFetch } from "@/sanity/lib/live";
import { TitleSection } from "@/components/TitleSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PREGUNTAS_QUERY } from "@/sanity/query/HomeQuery";

export const PreguntasSection = async () => {
  const { data: preguntas } = await sanityFetch({ query: PREGUNTAS_QUERY });

  if (!preguntas) return null;

  return (
    <Container className="py-16 md:py-24" id="faq">
      <div className="flex flex-col items-center gap-12">
        <TitleSection
          title={preguntas.title}
          className="text-center flex flex-col items-center"
        />

        <Accordion type="single" collapsible className="w-full max-w-4xl">
          {preguntas.questions?.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-500">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};
