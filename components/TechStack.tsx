"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Import from your data file
import { technologies, categories } from "@/data/projects";

export default function TechStack() {
 const [activeCategory, setActiveCategory] = useState("Frontend");
  useEffect(() => {
    const categoryContainer = document.querySelector('.categories-container');
    if (categoryContainer) {
      categoryContainer.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);
  const filteredTechnologies =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);
  return (
    <section className="py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Our Tech Stack
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          We master the latest & most powerful technologies
        </p>

       <div className="categories-container flex overflow-x-auto whitespace-nowrap scrollbar-hide mb-12 justify-between md:px-10 lg:px-12">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`text-sm px-3 py-1 relative mb-2 transition-transform duration-300 ${activeCategory === category
                ? "text-black"
                : "text-gray-600"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            {activeCategory === category && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
            )}
          </button>
        ))}
      </div>


        {/* Tech Grid */}
         <div className="flex justify-center lg:h-40">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-20 lg:gap-x-16 md:gap-x-16 xl:gap-x-28">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6"
            >
              <div className="relative w-20 h-20 mb-4 items-center justify-center ">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
             
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}