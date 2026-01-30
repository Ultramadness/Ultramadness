import { Quote } from "lucide-react";
import Image from "next/image";

export const TestimonialCard = ({
  text,
  name,
}: {
  text: string;
  name: string;
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="relative w-full h-40 lg:max-w-[260px] lg:h-[360px]">
        <Image
          src={"/testimonial.jpg"}
          alt="Testimonial Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="bg-black-gray w-full h-full lg:h-[360px] px-6 py-8 lg:p-12 space-y-4">
        <Quote className="fill-primary stroke-0 size-8 mb-8" />

        <p className="font-light text-foreground-gray">{text}</p>

        <h4 className="text-lg font-medium">{name}</h4>
      </div>
    </div>
  );
};
