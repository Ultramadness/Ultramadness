"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const AnuncioSlider = ({ anuncio }: { anuncio: string }) => {
  const animation = useRef<AnimationPlaybackControls>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 120, ease: "linear", repeat: Infinity }
    );
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);

  return (
    <section className="py-4">
      <div className="py-1 w-full bg-primary" />

      <div className="overflow-x-clip p-4 flex">
        <motion.div
          ref={scope}
          animate={{ x: "-50%" }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl text-primary font-semibold group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center uppercase gap-16">
              <span className="text-7xl">&#10038;</span>
              <span>{anuncio}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="py-1 w-full bg-primary" />
    </section>
  );
};
