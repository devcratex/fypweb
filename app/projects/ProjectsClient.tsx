// src/app/projects/ProjectsClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const projects = initialProjects;

  const allCategories = useMemo(() => {
    const cats = projects.map((p) => p.category);
    return Array.from(new Set(cats)).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        p.name?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, projects]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredProjects.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-4">
            Final Year Projects 2025
          </h1>
          <p className="text-xl text-gray-600">
            {projects.length}+ Premium Projects • Full Source Code • Video Demo
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-5 top-4 text-gray-500" size={24} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects... (e.g. e-commerce, AI, hospital)"
              className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-600 focus:outline-none transition"
            />
          </div>

          {/* Category Pills */}
          <div className="overflow-x-auto hide-scrollbar pb-4">
            <div className="flex gap-3 justify-start min-w-max px-4"> {/* px-4 for mobile padding */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-full font-bold transition whitespace-nowrap ${selectedCategory === "all"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                All ({projects.length})
              </button>
              {allCategories.map((cat) => {
                const count = projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-full font-bold transition whitespace-nowrap ${selectedCategory === cat
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleCount).map((project, i) => {
            // Safely get first image from array
            const mainImage = project.images && project.images.length > 0
              ? project.images[0]
              : "/fallback-project.jpg";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <Image
                      src={mainImage}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-6 md:p-7">
                    {/* Category */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                        Price:{project.price}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="font-bold text-xl md:text-2xl text-gray-900 mt-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {project.name}
                    </h3>
                    {project.categoriesList && project.categoriesList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.categoriesList.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Price + CTA */}
                    <div className="flex justify-center items-center mt-6">
                      <span className="text-sm font-medium text-gray-500 group-hover:text-purple-600 transition">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-600 mb-8">No projects found 😢</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="text-purple-600 underline text-xl font-bold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}