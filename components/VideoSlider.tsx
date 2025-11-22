"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type VideoTestimonial = {
  video: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
  } | null;
};

export const VideoSlider = ({ videos }: { videos: VideoTestimonial[] }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-12">
      {/* Botones de navegación */}
      <Button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary/90 hover:bg-primary rounded-full shadow"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-primary/90 hover:bg-primary rounded-full shadow"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }
        }}
        className="pb-12"
      >
        {videos.map((videoItem, index) => {
          const videoUrl = videoItem.video?.asset?.url;
          if (!videoUrl) return null;

          return (
            <SwiperSlide key={index}>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
