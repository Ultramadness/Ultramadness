import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "sonner";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

export const metadata: Metadata = {
  title: {
    template: "%s | Ultramadness",
    default: "Ultramadness",
  },
  description: "Experimenta la oscuridad, siente la música.",
  metadataBase: new URL("https://ultramadness.mx"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      <Toaster theme="dark" />

      {/* Live content API */}
      <SanityLive />

      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
