// src/app/blogs/page.tsx
import ImageSlider from "@/components/ImageSlider";
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
<section className="relative bg-white py-3 lg:py-3 text-black">
  <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2 items-center">

    {/* Left Side – Text */}
    <div className="text-center lg:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-snug">
        FYP Blog<br />
        <span className="text-yellow-400">Tips, Guides & Success Stories</span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
        Learn how to ace your Final Year Project • Choose the right tech stack • 
        Avoid common mistakes • Get inspired by real student success stories
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
        <Link
          href="/blogs"
          className="bg-black text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-xl"
        >
          Read Latest Blogs →
        </Link>
        <Link
          href="/projects"
          className="border-2 border-black text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-black hover:text-white transition transform hover:scale-105 shadow-xl"
        >
          Still Need a Project?
        </Link>
      </div>

      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 justify-center lg:justify-start text-gray-600">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl font-bold">5000+</span>
          <span className="text-sm sm:text-base font-medium">Students Helped</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl font-bold">7+</span>
          <span className="text-sm sm:text-base font-medium">Years of Trust</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl font-bold">100%</span>
          <span className="text-sm sm:text-base font-medium">Original Projects</span>
        </div>
      </div>
    </div>

    {/* Right Side – Image */}
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-full rounded-3xl overflow-hidden shadow-2xl">
      <Image
        src="/images/PicsArt_11-18-11.48.24.png"
        alt="Students reading FYP guides and succeeding"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10">
        <div className="text-center lg:text-left">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Turn Your FYP Stress<br />Into Success
          </p>
          <p className="text-white/90 text-sm sm:text-base md:text-lg mt-2 sm:mt-3">
            Real tips from seniors who scored 90+ marks
          </p>
        </div>
      </div>
    </div>

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
                    className=" group-hover:scale-110 transition duration-500"
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