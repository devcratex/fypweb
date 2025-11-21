// src/app/projects/page.tsx   ← REMOVE "use client"!
import { getProjects } from "@/lib/api";
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "All Final Year Projects 2025 - FYP Hub",
  description: "100+ premium FYP projects with source code, documentation & video demo",
};

export default async function ProjectsPage() {
  const projects = await getProjects(); // ← This works because it's a Server Component!

  return <ProjectsClient initialProjects={projects} />;
}