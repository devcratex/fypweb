// src/app/about/page.tsx
import TechStack from "@/components/TechStack";
import CountCardsContainer from "@/components/Counter";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About FYP Hub - 7+ Years Helping Students Get A+ in Final Year Projects",
  description:
    "Trusted by 5000+ students since 2018. Buy complete final year projects with source code, documentation, PPT, video explanation & 24/7 support. 100% working & submission-ready projects.",
  openGraph: {
    title: "About FYP Hub - Best Final Year Project Provider in Pakistan & India",
    description: "5000+ students | 7+ years | 100% money-back guarantee | Instant delivery",
    images: ["/og-about.jpg"],
  },
};

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white text-black py-12 overflow-hidden">
        <div className="absolute inset-0  opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300">FYP Hub</span>
            <br />
            Your Trusted Final Year Project Partner Since 2018
          </h1>
          <p className="mt-8 text-xl md:text-2xl opacity-95 max-w-4xl mx-auto">
            We don’t just sell projects — we help you <strong className="text-yellow-300">secure your degree with confidence</strong>
          </p>
          <div className="mt-10">
            <Link
              href="https://wa.me/+923126025681 "
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
              </svg>
              Chat with Founder Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <CountCardsContainer />

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              We Started With One Mission:<br />
              <span className="text-purple-600">Help Every Student Pass FYP</span>
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                Founded in <strong>2018</strong> by a group of senior developers who once struggled with their own final year projects, 
                <strong> FYP Hub</strong> was born out of frustration with low-quality, copied, or incomplete projects available online.
              </p>
              <p>
                Today, we are proud to be the <strong>#1 trusted platform</strong> for final year projects in Pakistan, India, UAE, and beyond — 
                serving over <strong>5000+ students</strong> from top universities like NUST, FAST, COMSATS, LUMS, UET, NED, and many more.
              </p>
              <p className="text-xl font-semibold text-purple-600">
                Every project is built from scratch, fully tested, documented, and comes with video explanation — because your degree matters.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/PicsArt_11-18-11.48.24.png"
              alt="FYP Hub Team developing projects"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-10">
              <p className="text-white text-2xl font-bold">Building Tomorrow's Engineers Today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">Why 5000+ Students Trust Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: "✅", title: "100% Original Code", desc: "Never copied. Every line written by our senior developers." },
              { icon: "🎥", title: "Video Explanation Included", desc: "Understand & explain your project confidently in viva." },
              { icon: "📄", title: "Complete Documentation + PPT", desc: "Ready-to-submit report, SRS, diagrams & presentation." },
              { icon: "🛠️", title: "Free Installation Help", desc: "We install & run the project on your laptop via AnyDesk." },
              { icon: "💬", title: "Lifetime WhatsApp Support", desc: "Clear doubts anytime — even after 2 years!" },
              { icon: "🔄", title: "Free Future Updates", desc: "Get improved versions free forever." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border">
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Tech Stack */}
      <TechStack />

      {/* Our Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 text-black">Our Journey So Far</h2>
          <div className="space-y-12">
            {[
              { year: "2018", title: "Founded FYP Hub", desc: "Started with just 5 projects & a dream to help students" },
              { year: "2019", title: "Reached 500 Students", desc: "Grew through word-of-mouth & trust" },
              { year: "2021", title: "Launched 100+ Projects", desc: "Added AI, Blockchain, IoT & Mobile categories" },
              { year: "2023", title: "5000+ Happy Students", desc: "Became #1 FYP provider in Pakistan" },
              { year: "2025", title: "Serving Globally", desc: "Now helping students in UAE, UK, Canada & USA" },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-8 items-center">
                <div className="text-6xl font-bold text-purple-600 w-32">{milestone.year}</div>
                <div className="flex-1 bg-gray-50 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 mt-2">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-pink-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Ready to Secure Your Degree with Confidence?
          </h2>
          <p className="text-xl mb-10 opacity-95">
            Join 5000+ students who already submitted their FYP successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/projects"
              className="bg-white text-purple-700 px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-110 transition shadow-2xl"
            >
              Browse All Projects →
            </Link>
            <Link
              href="https://wa.me/+923126025681 "
              className="bg-green-500 px-12 py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 transform hover:scale-110 transition shadow-2xl"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
              </svg>
              Need Help? Chat Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}