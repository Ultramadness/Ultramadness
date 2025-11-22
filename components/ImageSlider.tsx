"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageData = {
  url: string;
  orientation: "square" | "horizontal" | "vertical";
};

export const ImageSlider = ({
  images,
  reverse = false,
}: {
  images: ImageData[];
  reverse?: boolean;
}) => {
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (scope.current) {
      animation.current = animate(
        scope.current,
        { x: reverse ? "0%" : "-50%" },
        { duration: 80, ease: "linear", repeat: Infinity }
      );
    }
  }, [animate, scope, reverse]);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);

  const duplicatedImages = [...images, ...images];

  const getImageDimensions = (orientation: string) => {
    switch (orientation) {
      case "horizontal":
        return "w-[400px] h-[250px] md:w-[500px] md:h-[300px]";
      case "vertical":
        return "w-[250px] h-[350px] md:w-[300px] md:h-[450px]";
      case "square":
      default:
        return "w-[300px] h-[300px] md:w-[400px] md:h-[400px]";
    }
  };

  return (
    <article>
      <div className="overflow-x-clip p-4 flex">
        <motion.div
          ref={scope}
          initial={{ x: reverse ? "-50%" : "0%" }}
          className="flex flex-none gap-8 pr-8 cursor-pointer items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className={`relative ${getImageDimensions(
                image.orientation
              )} shrink-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
            >
              <Image
                alt={`Performance ${index + 1}`}
                src={image.url}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </article>
  );
};
