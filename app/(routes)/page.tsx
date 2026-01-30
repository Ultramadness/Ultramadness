import { HomeContent } from "@/components/layout/HomeContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Bienvenido a Ultramadness. Una experiencia sensorial única.",
};

export const dynamic = "force-dynamic";

export const revalidate = 60;

export default function Home() {
  return <HomeContent />;
}
