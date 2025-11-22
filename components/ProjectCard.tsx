// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  category: string;
  images: string[]; // ← Now an array!
  youtubeUrl?: string;
  categoriesList?: string[];
  description?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  // Safely get the first image with fallback
  const mainImage = project.images && project.images.length > 0 
    ? project.images[0] 
    : "/fallback-project.jpg"; // ← Add a placeholder in public/
const techList = project.categoriesList || [];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border hover:border-purple-200"
    >
      {/* Image */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gray-100">
        <Image
          src={mainImage}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Optional: Badge for multiple images */}
        {project.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            +{project.images.length} images
          </div>
        )}
      </div>

      {/* Content */}
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
        {techList.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-2 mt-2">
              {techList.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
        {/* Price + CTA */}
        <div className="flex justify-center items-center mt-6">
          <span className="text-sm font-medium text-gray-500 group-hover:text-purple-600 transition">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}