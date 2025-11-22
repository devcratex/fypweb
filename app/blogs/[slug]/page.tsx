// src/app/blogs/[slug]/page.tsx

import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PopularProjectsCarousel from "@/components/PopularProjectsCarousel";
import { getProjects } from "@/lib/api";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} - FYP Hub Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  // CORRECT WAY – Call the function with () and await it!
  const projects = await getProjects();   // ← This is the fix!

  return (
    <>
      <article className="py-4 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tags */}
          <div className="text-center mb-8">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 mb-12 text-sm md:text-base">
            <span className="font-bold text-gray-900">{blog.author}</span>
            <span>•</span>
            <span>{new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              
            />
          </div>

 <article className="blog-content prose prose-lg max-w-none text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>


          <div className="mt-20 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl text-center">
            <p className="text-xl font-bold text-gray-800 mb-4">
              Found this helpful? Share with your friends!
            </p>
            <Link
              href={`https://wa.me/?text=Check out this amazing blog: ${encodeURIComponent(blog.title)}\n${encodeURIComponent(`https://fyphub.shop/blogs/${blog.slug}`)}`}
              target="_blank"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.2 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
              </svg>
              Share on WhatsApp
            </Link>
          </div>
        </div>
      </article>

      {/* Now this works perfectly */}
      <PopularProjectsCarousel projects={projects} />
    </>
  );
}