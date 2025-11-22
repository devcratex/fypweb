// src/app/contact/page.tsx
import CountCardsContainer from "@/components/Counter";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact FYP Hub - 24/7 WhatsApp Support | Instant Reply",
  description:
    "Need help with your Final Year Project? Chat with us on WhatsApp instantly! 5000+ students helped since 2018. Fast response, free consultation, lifetime support.",
  openGraph: {
    title: "Contact FYP Hub - Get Instant Help via WhatsApp",
    description: "Available 24/7 • Reply within 5 minutes • Free project consultation",
    images: ["/og-contact.jpg"],
  },
};

export default function Contact() {
  return (
    <>
      {/* Hero Section - Strong WhatsApp CTA */}
      <section className="relative bg-white text-black py-4 overflow-hidden">
        <div className="absolute inset-0  opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Need Help With Your FYP?
            <br />
            <span className="text-yellow-300">We're Just One Message Away!</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl lg:text-3xl opacity-95 max-w-4xl mx-auto">
            24/7 Instant Support • Reply in <strong>under 5 minutes</strong> • 5000+ Students Helped
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link
              href="https://wa.me/+923126025681 ?text=Assalam-o-Alaikum! I need help with my Final Year Project"
              target="_blank"
              className="inline-flex items-center gap-4 bg-white text-green-600 px-12 py-8 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition duration-300"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
              </svg>
              Chat on WhatsApp Now
            </Link>
          </div>

          <p className="mt-10 text-lg opacity-90">
            Or message us directly: <strong className="text-yellow-300">+92 312 6025681</strong>
          </p>
        </div>
      </section>

      {/* Stats */}
      <CountCardsContainer />

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-black">Get in Touch Anytime</h2>
          <div className="grid md:grid-cols-3 gap-10 text-black">
            {[
              {
                icon: "💬",
                title: "WhatsApp (Fastest)",
                desc: "Get reply in minutes",
                btn: "Message Now",
                link: "https://wa.me/+923126025681 ",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: "✉️",
                title: "Email Us",
                desc: "fyphubinovative@gmail.com",
                btn: "Send Email",
                link: "mailto:fyphubinovative@gmail.com",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: "🌍",
                title: "Visit Website",
                desc: "www.fyphub.shop",
                btn: "Go to Site",
                link: "https://fyphub.shop",
                color: "from-purple-500 to-pink-600",
              },
            ].map((method, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-center border"
              >
                <div className="text-7xl mb-6">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-8">{method.desc}</p>
                <Link
                  href={method.link}
                  target="_blank"
                  className={`inline-block bg-gradient-to-r ${method.color} text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition`}
                >
                  {method.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Guarantee */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-10 text-black">We Reply to Every Message</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              "Average Reply Time: < 5 Minutes",
              "Available 24 Hours a Day",
              "Even on Weekends & Holidays",
            ].map((promise, i) => (
              <div key={i} className="bg-green-50 p-8 rounded-2xl border-2 border-green-200">
                <div className="text-6xl mb-4">✅</div>
                <p
                  className="text-xl font-bold text-green-700"
                  dangerouslySetInnerHTML={{ __html: promise }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Don't Wait Until Deadline!
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95">
            Message us now and get your project sorted today.
          </p>
          <Link
            href="https://wa.me/+923126025681 "
            target="_blank"
            className="inline-flex items-center gap-4 bg-white text-green-600 px-16 py-8 rounded-full text-2xl font-bold shadow-2xl transform hover:scale-110 transition duration-300"
          >
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
            </svg>
            Start Chat Now – We're Online!
          </Link>
        </div>
      </section>
    </>
  );
}