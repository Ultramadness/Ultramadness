import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ContactoSection } from "./sections/ContactoSection";
import { EventoSection } from "./sections/EventoSection";
import { HeroSection } from "./sections/HeroSection";
import { NosotrosSection } from "./sections/NosotrosSection";
import { PerformanceSection } from "./sections/PerformanceSection";
import { PreguntasSection } from "./sections/PreguntasSection";
import { ServicioSection } from "./sections/ServicioSection";
import { TestimoniosSection } from "./sections/TestimoniosSection";

export const HomeContent = async () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EventoSection />
      <ServicioSection />
      <PerformanceSection />
      <NosotrosSection />
      <PreguntasSection />
      <TestimoniosSection />
      <ContactoSection />
      <Footer />
    </>
  );
};
