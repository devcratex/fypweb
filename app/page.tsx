// src/app/page.tsx   ← This is a SERVER COMPONENT (no "use client"!)
import ProjectCard from "@/components/ProjectCard";
import ImageSlider from "@/components/ImageSlider";
import TechStack from "@/components/TechStack";
import CountCardsContainer from "@/components/Counter";
import TestimonialList from "@/components/TestimonialList";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { getProjects } from "@/lib/api";

export const metadata = {
  title: "FYP Hub - Buy Premium Final Year Projects with Full Source Code",
  description: "5000+ students trusted since 2018. Complete projects with code, report, PPT, video & lifetime support.",
};

export default async function HomePage() {
  // This works because it's a Server Component!
  const projects = await getProjects();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white py-10 lg:py-20 text-black">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              Buy Premium Final Year Projects<br />
              <span className="text-yellow-400">With Full Source Code</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              Complete Code • Report • PPT • Video Demo • Instant Delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="bg-black text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-xl"
              >
                Browse Projects →
              </Link>
              <Link
                href="https://wa.me/+923126025681"
                className="border-2 border-black text-black px-12 py-5 rounded-full text-xl font-bold hover:bg-black hover:text-white transition transform hover:scale-105 shadow-xl"
              >
                Book Now on WhatsApp
              </Link>
            </div>
          </div>
          <ImageSlider />
        </div>
      </section>

      {/* Stats */}
      <CountCardsContainer />

      {/* Popular Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">Popular Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.slice(0, 6).map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
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

      {/* Course Card */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-16 text-black">Learn & Earn with Our Course</h2>
          <CourseCard />
        </div>
      </section>

      {/* Tech Stack */}
      <TechStack />

      {/* Testimonials */}
      <TestimonialList />

      {/* Final CTA */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Don’t Waste Your Semester Struggling!
          </h2>
          <p className="text-xl mb-10">
            Get your complete FYP today and submit with 100% confidence.
          </p>
          <Link
            href="https://wa.me/+923126025681"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-16 py-8 rounded-full text-2xl font-bold shadow-2xl transform hover:scale-110 transition"
          >
            Chat Now – We’re Online!
          </Link>
        </div>
      </section>
    </>
  );
}