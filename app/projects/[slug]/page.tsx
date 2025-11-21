// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/api";

// Strip HTML safely
const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, "").trim();

// Extract YouTube ID
const extractYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} - pkr${project.price} | FYP Hub`,
    description: stripHtml(project.description || "").slice(0, 160),
    openGraph: {
      title: project.name,
      description: stripHtml(project.description || "").slice(0, 200),
      images: project.images?.[0] ? [{ url: project.images[0] }] : [],
    },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const allProjects = await getProjects();
  const similarProjects = allProjects
    .filter((p: any) => p.category === project.category && p.slug !== slug)
    .slice(0, 6);

  const videoId = extractYouTubeId(project.youtubeUrl);
  const techList = project.categoriesList || [];

  // Handle images array safely
  const mainImage = project.images && project.images.length > 0
    ? project.images[0]
    : "/fallback-project.jpg";

  const hasMultipleImages = project.images && project.images.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">

        {/* Hero Image / Gallery */}
        <div className="mb-12">
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gray-200">
            <Image
              src={mainImage}
              alt={project.name}
              fill
              priority
            />
            {/* Multiple Images Indicator */}
            {hasMultipleImages && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {project.images.slice(0, 5).map((img: string, i: number) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                    <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
                {project.images.length > 5 && (
                  <div className="w-16 h-16 rounded-xl bg-black/60 text-white flex items-center justify-center font-bold text-xl">
                    +{project.images.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Title + Price + Buy Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              {project.category}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {project.name}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <span className="text-3xl font-bold text-green-600">
              {project.price}/-Rs
            </span>
            <Link
              href={`https://wa.me/+923126025681?text=Hi! I want to buy: *${encodeURIComponent(project.name)}* - pkr${project.price}`}
              target="_blank"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
              </svg>
              Buy Now on WhatsApp
            </Link>
          </div>
        </div>

        {/* Description */}
       <section className="mb-16 bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100">
  <h2 className="text-4xl font-bold text-gray-900 mb-10 border-b-4 border-purple-600 inline-block pb-2">
    Project Description
  </h2>

  <article 
    className="prose prose-lg max-w-none 
               text-gray-700 leading-relaxed
               prose-headings:font-bold prose-headings:text-gray-900 
               prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-purple-600 prose-h2:pl-4
               prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-purple-800
               prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-purple-700
               prose-ul:my-6 prose-li:my-2 prose-li:marker:text-purple-600
               prose-strong:text-gray-900 prose-strong:font-semibold
               prose-p:my-4"
    dangerouslySetInnerHTML={{ __html: project.description || "No description available." }}
  />
</section>

        {/* Demo Video */}
        {videoId && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Demo Video</h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Project Demo"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* Technologies */}
        {techList.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-4">
              {techList.map((tech: string) => (
                <span
                  key={tech}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              More Projects You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProjects.map((p: any) => {
                const simImg = p.images?.[0] || "/fallback-project.jpg";
                return (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border"
                  >
                    <div className="h-56 overflow-hidden bg-gray-100">
                      <Image
                        src={simImg}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 line-clamp-2">
                        {p.name}
                      </h3>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold text-green-600">{p.price}/-Rs</span>
                        <span className="text-sm text-gray-500">{p.category}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}