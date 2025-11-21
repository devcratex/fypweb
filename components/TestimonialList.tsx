const testimonials = [
  { text: "Best FYP service ever! Got A+ grade.", author: "Ahmed Khan", position: "BSCS Student" },
  { text: "Complete code + report + video. Saved my semester!", author: "Ayesha Ali", position: "BSIT Final Year" },
  { text: "Instant delivery and 24/7 WhatsApp support. Highly recommended!", author: "Usman Raza", position: "Software Engineering" },
];

export default function TestimonialList() {
  return (
    <section className="py-2 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-6">What Students Say</h2>
            <p className="text-xl text-gray-700">Real reviews from real students who aced their final year projects</p>
          </div>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border hover:border-purple-300 transition">
                <p className="text-gray-700 italic text-lg mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-purple-600">{t.author}</h4>
                    <p className="text-sm text-gray-600">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}