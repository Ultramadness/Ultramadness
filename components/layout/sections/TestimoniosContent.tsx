"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwipperTestimonial } from "@/components/SwipperTestimonial";
import { VideoSlider } from "@/components/VideoSlider";

type TextTestimonial = {
  reference: string | null;
  name: string | null;
};

type VideoTestimonial = {
  video: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
  } | null;
};

export const TestimoniosContent = ({
  textTestimonials,
  videoTestimonials,
}: {
  textTestimonials: TextTestimonial[];
  videoTestimonials: VideoTestimonial[];
}) => {
  const hasTextTestimonials = textTestimonials.length > 0;
  const hasVideoTestimonials = videoTestimonials.length > 0;

  // Si solo hay un tipo, mostrar directamente sin tabs
  if (hasTextTestimonials && !hasVideoTestimonials) {
    return <SwipperTestimonial testimonials={textTestimonials} />;
  }

  if (hasVideoTestimonials && !hasTextTestimonials) {
    return <VideoSlider videos={videoTestimonials} />;
  }

  // Si hay ambos tipos, mostrar tabs
  return (
    <Tabs defaultValue="text" className="w-full max-w-6xl">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
        <TabsTrigger value="text">Testimonios de Texto</TabsTrigger>
        <TabsTrigger value="video">Testimonios de Video</TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        {hasTextTestimonials && (
          <SwipperTestimonial testimonials={textTestimonials} />
        )}
      </TabsContent>

      <TabsContent value="video">
        {hasVideoTestimonials && <VideoSlider videos={videoTestimonials} />}
      </TabsContent>
    </Tabs>
  );
};
