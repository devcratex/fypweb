// src/app/privacy-policy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - FYP Hub | Your Data is 100% Safe With Us",
  description: "We never share your WhatsApp number or personal details. Trusted by 5000+ students since 2018. End-to-end encrypted chats. No emails, no accounts, no tracking.",
  openGraph: {
    title: "Privacy Policy - FYP Hub",
    description: "Your privacy is our priority. We don't collect emails, don't track you, and never sell your data.",
    images: ["/og-privacy.jpg"],
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "November 19, 2025";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Your Privacy Matters
          </h1>
          <p className="mt-8 text-2xl md:text-3xl opacity-95 max-w-4xl mx-auto">
            We <span className="text-yellow-300 font-bold">NEVER</span> sell, share, or misuse your personal information.
          </p>
          <div className="mt-12 inline-flex items-center gap-4 bg-white/20 backdrop-blur-md px-8 py-4 rounded-full">
            <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-xl font-bold">Trusted by 5000+ Students Since 2018</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-200">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 italic">
                Last updated: <strong>{lastUpdated}</strong>
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Promise to You</h2>
                <p className="text-lg leading-relaxed">
                  At <strong>FYP Hub</strong>, we believe your trust is everything. That's why we designed our service to collect <strong>as little information as possible</strong> — because you shouldn't need to create an account or give away personal details just to buy a project.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 border-l-8 border-green-500">
                <h3 className="text-2xl font-bold text-green-800 mb-4">What We DO Collect (Only When Needed)</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <strong>Your WhatsApp Number</strong> – Only when you message us first
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <strong>Your Name & University</strong> – Optional, only if you tell us during chat
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <strong>Payment Info</strong> – Processed securely via JazzCash, EasyPaisa, or Bank Transfer. We never see or store your card details.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-2xl p-8 border-l-8 border-red-500">
                <h3 className="text-2xl font-bold text-red-800 mb-4">What We NEVER Do With Your Data</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🚫</span>
                    Sell or share your number with anyone
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🚫</span>
                    Send spam or promotional messages without permission
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🚫</span>
                    Use tracking cookies or Google Analytics
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">🚫</span>
                    Require email sign-up or account creation
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Protect Your Privacy</h2>
                <ul className="space-y-6 text-lg">
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl">🔒</div>
                    <div>
                      <strong>End-to-End Encrypted Chats</strong><br />
                      All communication happens on WhatsApp — fully encrypted by default
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl">🗑️</div>
                    <div>
                      <strong>Auto-Delete Old Chats</strong><br />
                      Inactive conversations are removed after 12 months
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl">🔐</div>
                    <div>
                      <strong>No Third-Party Access</strong><br />
                      Only the founder (Hamza Nazir) can see your messages
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-10 text-center">
                <h2 className="text-4xl font-extrabold mb-6">
                  5000+ Students Trust Us With Their Privacy
                </h2>
                <p className="text-xl mb-8 opacity-95">
                  Join them today — your information is safe with us ❤️
                </p>
                <Link
                  href="https://wa.me/+923126025681"
                  className="inline-flex items-center gap-3 bg-white text-purple-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488Z"/>
                  </svg>
                  Chat Securely Now
                </Link>
              </div>

              <div className="mt-12 text-center text-gray-500">
                <p className="text-sm">
                  Have questions about privacy? Just message us on WhatsApp — we're here 24/7.<br />
                  © 2018–2025 FYP Hub. All rights reserved. Made with ❤️ in Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}