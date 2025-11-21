import { projects } from "@/data/projects";

// src/lib/api.ts
const API_BASE = "https://api.devcratex.site/devapi";

// Optional: Add a fallback/static data in case API is down
const FALLBACK_PROJECTS = projects

export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      cache: "force-cache", // Optional: cache results
    });

    // If API is down or returns error
    if (!res.ok) {
      console.warn("API failed, using fallback data:", res.status);
      return FALLBACK_PROJECTS;
    }

    const data = await res.json();

    // If data is empty or not array
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("API returned empty/no data, using fallback");
      return FALLBACK_PROJECTS;
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return FALLBACK_PROJECTS; // Always return something!
  }
}

// Same for blogs
export async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p: any) => p.slug === slug) || null;
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getBlogs();
  return blogs.find((b: any) => b.slug === slug) || null;
}