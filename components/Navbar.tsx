// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/about" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
];

const mobilenumber = "+923126025681 "; // Change to your number

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${mobilenumber}`, "_blank");
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-black text-white py-2 text-center text-sm">
        <p>✆ Call/WhatsApp: +92 312 6025681 | ✉ fyphubinovative@gmail.com</p>
      </div>

      <nav className="bg-white text-black px-4 sm:px-8 py-4 sticky top-0 z-50  font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
         <Link href="/" className="flex items-center">
  <div>
    <div>
      <img 
        src="/logo.png" 
        alt="Logo"
        className="w-25 h-25"
      />
    </div>
  </div>
</Link>

          {/* Desktop Menu */}
  <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className="relative group text-black transition text-lg font-medium"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <button
              onClick={openWhatsApp}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white"
            >
              Let's Talk 💬
            </button>
          </div>


          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={openWhatsApp}
              className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-bold text-white"
            >
             Let's Talk 💬
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 shadow-2xl"
          >
            <div className="py-4 px-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-xl text-gray-300 hover:text-white transition py-3 border-b border-gray-800"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={openWhatsApp}
                className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-lg font-bold text-lg"
              >
                💬 WhatsApp Now
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}