"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";



export default function PopularProjectsCarousel({ projects }: any) {
  const scrollLeft = () => {
    document
      .getElementById("scroll-container")
      ?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("scroll-container")
      ?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="py-2 bg-white rounded">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Popular Projects
        </h2>

        {/* Carousel with Arrows on ALL devices */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 sm:p-4 hover:scale-110 transition-all duration-200 flex items-center justify-center"
            aria-label="Scroll left"
          >
            <span className="text-1xl sm:text-3xl font-bold text-gray-800">←</span>
          </button>

          {/* Scrollable Container */}
          <div
            id="scroll-container"
            className="overflow-x-auto hide-scrollbar scroll-smooth px-10 sm:px-16" // extra side padding so cards aren't hidden under arrows
          >
            <div className="inline-flex gap-6 sm:gap-8 py-4">
              {projects.slice(0, 6).map((project:any) => (
                <div
                  key={project.id}
                  className="w-80 sm:w-80 md:w-84 flex-shrink-0" // consistent width
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 sm:p-4 hover:scale-110 transition-all duration-200 flex items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="text-1xl sm:text-3xl font-bold text-gray-800">→</span>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition"
          >
            View All {projects.length}+ Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}