import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ultramadness Studio",
  description: "Administrador de contenido",
};

export default function SanityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
