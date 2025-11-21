// src/app/blogs/page.tsx
import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "FYP Hub Blogs - Best Final Year Project Tips & Guides 2025",
  description: "Latest FYP tips, project ideas, MERN stack guides, and career advice from Hamza Nazir. Helped 5000+ students since 2018.",
};

export default function BlogsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
            FYP Hub Blog
          </h1>
          <p className="mt-6 text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
            Latest tips, project ideas, and guides to help you ace your Final Year Project
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border"
              >
                <div className="relative h-56 bg-gray-200">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {blog.tags[0]}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="mt-3 text-gray-600 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{blog.author}</span>
                    <span>{blog.date.split("-").slice(1).join("/")} • {blog.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}