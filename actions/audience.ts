"use server";

import prisma from "@/lib/prisma";
import { type ContactForm, type NewsletterSubscriber } from "@prisma/client";

export type AudienceSource = "newsletter" | "contact_form" | "event";

export type AudienceMember = {
  id: string;
  email: string;
  name: string | null;
  source: AudienceSource;
  tags: string[]; // e.g., musical genres
  createdAt: Date;
  status: "active" | "unsubscribed"; // For future use
};

type GetAudienceFilters = {
  source?: AudienceSource;
  genre?: string;
  search?: string;
};

export async function getAudience(
  filters: GetAudienceFilters = {},
): Promise<
  { success: true; data: AudienceMember[] } | { success: false; error: string }
> {
  try {
    const { source, genre, search } = filters;

    // Map to deduplicate by email
    const audienceMap = new Map<string, AudienceMember>();

    // 1. Fetch Newsletter Subscribers
    // If strict source filter is 'contact_form', skip this
    if (!source || source === "newsletter") {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
      });

      subscribers.forEach((sub) => {
        // Strict Genre Filter: If filtering by genre, generic subscribers are excluded
        // because they don't have genre data.
        if (genre) return;

        // Search Filter
        if (search && !sub.email.toLowerCase().includes(search.toLowerCase()))
          return;

        audienceMap.set(sub.email, {
          id: `sub_${sub.id}`,
          email: sub.email,
          name: null,
          source: "newsletter",
          tags: [],
          createdAt: sub.createdAt,
          status: "active",
        });
      });
    }

    // 2. Fetch Contact Form Submissions
    // If strict source filter is 'newsletter', skip this
    if (!source || source === "contact_form") {
      const contacts = await prisma.contactForm.findMany({
        orderBy: { createdAt: "desc" },
      });

      contacts.forEach((contact) => {
        // Search Filter
        if (
          search &&
          !contact.email.toLowerCase().includes(search.toLowerCase()) &&
          !contact.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return;
        }

        const genreTag =
          contact.musicalGenre === "otro"
            ? contact.otherGenre
            : contact.musicalGenre;

        // Genre Filter
        if (genre) {
          // If filtering by genre, we strictly require:
          // 1. Opt-in (receiveNews)
          // 2. Genre Match
          if (!contact.receiveNews) return;
          if (genreTag.toLowerCase() !== genre.toLowerCase()) return;
        }

        const existing = audienceMap.get(contact.email);

        // Deduplication & Merge Logic
        // If exists (from Newsletter table), we enrich it with Contact data
        // If not exists, we add it (but check status based on receiveNews if it's new)

        if (existing) {
          // It was in newsletter table, so they are definitely active.
          // We update name and tags, and source becomes "contact_form" (more info)
          audienceMap.set(contact.email, {
            ...existing,
            name: contact.name, // Prefer name from form
            source: "contact_form", // Or "mixed"? Let's stick to contact_form
            tags: [genreTag].filter(Boolean),
            // Status remains active because they were in newsletter table
          });
        } else {
          // New entry from form
          audienceMap.set(contact.email, {
            id: `contact_${contact.id}`,
            email: contact.email,
            name: contact.name,
            source: "contact_form",
            tags: [genreTag].filter(Boolean),
            createdAt: contact.createdAt,
            status: contact.receiveNews ? "active" : "unsubscribed",
          });
        }
      });
    }

    // Convert Map to Array and Sort
    const audience = Array.from(audienceMap.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return { success: true, data: audience };
  } catch (error) {
    console.error("Error fetching audience:", error);
    return { success: false, error: "Error al obtener la audiencia" };
  }
}

export async function getAudienceGenres(): Promise<string[]> {
  try {
    const contacts = await prisma.contactForm.findMany({
      select: { musicalGenre: true, otherGenre: true },
    });

    const genres = new Set<string>();
    contacts.forEach((c) => {
      const g = c.musicalGenre === "otro" ? c.otherGenre : c.musicalGenre;
      if (g) genres.add(g);
    });

    return Array.from(genres).sort();
  } catch (error) {
    return [];
  }
}
