import { defineQuery } from "next-sanity";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const BLOG_QUERY = defineQuery(`*[_type == "blog" && _id == $id][0]{
  _id,
  title,
  description,
  coverImage,
  genre->{
    name,
    slug
  },
  content
}`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: { id },
  });

  if (!blog) {
    return {
      title: "Blog no encontrado",
      description: "El artículo que buscas no existe.",
    };
  }

  return {
    title: blog.title || "Artículo de Blog",
    description: blog.description || "",
    openGraph: {
      title: blog.title || undefined,
      description: blog.description || undefined,
      images: blog.coverImage ? [urlFor(blog.coverImage).url()] : [],
    },
  };
}

export const revalidate = 60;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: { id },
  });

  if (!blog) return notFound();

  return (
    <div className="bg-black-gray">
      <Navbar external />

      <main className="container mx-auto px-4 py-24 max-w-7xl">
        <Link href="/blog" className={cn(buttonVariants(), "rounded-xs mb-4")}>
          <ArrowLeft />
          Volver al blog
        </Link>

        {blog.genre && (
          <span className="text-sm text-gray-600 mb-2 block">
            {blog.genre.name}
          </span>
        )}

        {blog.coverImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(blog.coverImage).url()}
              alt={blog.title || "Imagen del Blog"}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-crimson mb-2">{blog.title}</h1>
        <p className="text-xl text-foreground-gray mb-8">{blog.description}</p>

        {blog.content && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={blog.content} />
          </div>
        )}
      </main>

      <Footer external />
    </div>
  );
}
