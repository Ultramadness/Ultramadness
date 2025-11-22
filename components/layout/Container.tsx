import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}

export const Container = ({
  className,
  children,
  style,
  id,
}: ContainerProps) => {
  return (
    <section
      id={id}
      className={cn("px-6 md:px-12 py-16", className)}
      style={style}
    >
      {children}
    </section>
  );
};
