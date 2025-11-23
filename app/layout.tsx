import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
});

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
    <html lang="es">
      <body
        className={`${inter.variable} ${crimson.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
