// src/components/Footer.tsx
import Link from "next/link";
import { Facebook, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white rounded-xl">
                <Link href="/">

      <img 
        src="/logo.png" 
        alt="Logo"
        className="w-25 h-25"
      />

 
</Link>
              </div>
              <span className="ml-3 text-3xl font-bold">FYP Hub</span>
            </div>
            <p className="text-gray-200 leading-relaxed max-w-sm">
              Pakistan's #1 marketplace for premium Final Year Projects with complete source code, documentation, video explanation & 24/7 support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-200">
              <li><Link href="/projects" className="hover:text-white transition">All Projects</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition">Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-200">
              <li><a href="https://wa.me/923126025681 " className="hover:text-white transition">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-white transition">How to Install</a></li>
              <li><a href="#" className="hover:text-white transition">FYP Guidelines</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61551889625005" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                <Facebook size={24} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61551889625005" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/devcratex/" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-10 border-white/20" />

        <div className="text-center text-gray-300">
          <p>© 2025 <span className="font-bold text-white">FYP Hub</span>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}