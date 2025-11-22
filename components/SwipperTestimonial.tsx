"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialCard } from "./TestimonialCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

type Testimonial = {
  reference: string | null;
  name: string | null;
};

export const SwipperTestimonial = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide className="pb-12" key={index}>
            <TestimonialCard
              text={testimonial.reference || ""}
              name={testimonial.name || ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
