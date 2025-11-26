import { projects } from "@/data/projects";

// src/lib/api.ts
const API_BASE = "https://api.devcratex.site/devapi";

// Optional: Add a fallback/static data in case API is down
const FALLBACK_PROJECTS = projects

export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.warn("API failed, using fallback data:", res.status);
      return FALLBACK_PROJECTS.slice().reverse(); // also reverse fallback
    }

    const data = await res.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("API returned empty/no data, using fallback");
      return FALLBACK_PROJECTS.slice().reverse();
    }

    return data.slice().reverse(); // ← last item becomes first
  } catch (error) {
    console.error("Fetch error:", error);
    return FALLBACK_PROJECTS.slice().reverse();
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