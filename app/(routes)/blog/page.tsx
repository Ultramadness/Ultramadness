import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const BLOGS_QUERY = defineQuery(`*[_type == "blog"] | order(_createdAt desc){
  _id,
  title,
  description,
  coverImage,
  genre->{
    name,
    slug
  },
  _createdAt
}`);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Descubrí el universo detrás de la música a oscuras. Crónicas, análisis y reflexiones.",
};

export default async function BlogPage() {
  const { data: blogs } = await sanityFetch({ query: BLOGS_QUERY });

  return (
    <>
      <Navbar external />
      <main className="container mx-auto px-4 py-24 space-y-12">
        <div className={`space-y-4 w-full`}>
          <h1 className={`font-crimson text-6xl lg:text-7xl font-light italic`}>
            Descubrí el universo detrás de la música a oscuras.
          </h1>

          <p className="text-xl font-light">
            En el blog de Ultramadness exploramos las historias, sensaciones y
            secretos que nacen cuando la luz desaparece y el sonido toma el
            control. Aquí vas a encontrar crónicas de nuestros eventos, análisis
            de álbumes escuchados en completa oscuridad, reflexiones sobre la
            experiencia sensorial y contenidos exclusivos que profundizan en
            cómo vivimos y entendemos la música.
          </p>

          <p className="text-xl font-light">
            Ya seas parte de nuestra comunidad o estés por descubrirnos, este
            espacio te invita a mirar —o mejor dicho, sentir— la música desde
            otra perspectiva.
          </p>

          <p className="text-xl font-light">
            Bienvenidos al lugar donde las palabras iluminan lo que la oscuridad
            revela.
          </p>

          <div className="w-2/4 bg-primary h-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs?.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog._id}`}
              className="group block"
            >
              <Card className="py-0 gap-2 overflow-clip">
                {blog.coverImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(blog.coverImage).url()}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {blog.genre && (
                    <span className="text-sm text-gray-600 mb-2 block">
                      {blog.genre.name}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-foreground-gray line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-start gap-2 mb-1 mt-6">
                    <CalendarDays />
                    {format(new Date(blog._createdAt), "d 'de' MMMM yyyy", {
                      locale: es,
                    })}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer external />
    </>
  );
}
