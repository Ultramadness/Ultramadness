import { sanityFetch } from "@/sanity/lib/live";

import { urlFor } from "@/sanity/lib/image";
import { TitleSection } from "@/components/TitleSection";
import { ImageSlider } from "@/components/ImageSlider";
import { PERFORMANCE_QUERY } from "@/sanity/query/HomeQuery";

export const PerformanceSection = async () => {
  const { data: performance } = await sanityFetch({ query: PERFORMANCE_QUERY });

  if (!performance || !performance.images || performance.images.length === 0) {
    return null;
  }

  const imagesData = performance.images.map(
    (image: {
      asset: {
        metadata: { dimensions: { aspectRatio: number } };
      };
    }) => {
      const aspectRatio = image.asset.metadata.dimensions.aspectRatio;
      let orientation: "square" | "horizontal" | "vertical" = "square";

      if (aspectRatio > 1.2) {
        orientation = "horizontal";
      } else if (aspectRatio < 0.8) {
        orientation = "vertical";
      }

      return {
        url: urlFor(image).url(),
        orientation,
      };
    }
  );

  const reversedImagesData = [...imagesData].reverse();

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col items-center gap-12">
        <TitleSection
          title={performance.title}
          description={performance.description}
          className="text-center flex flex-col items-center"
        />

        <div className="w-full">
          <ImageSlider images={imagesData} />
          <ImageSlider images={reversedImagesData} reverse />
        </div>
      </div>
    </section>
  );
};
