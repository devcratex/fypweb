"use client";   // ← ADD THIS LINE AT THE VERY TOP
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src:"/images/PicsArt_11-18-11.44.54.png", alt: "E-Commerce Project" },
  { src: "/images/PicsArt_11-18-11.47.54.png", alt: "Management System Project" },
  { src: "/images/PicsArt_11-18-11.46.19.png", alt: "Unique Custom Project" },
  // Add more or use real images
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden ">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority
          />
          <div className="absolute inset-0  to-transparent" />
          <div className="absolute bottom-8 left-8 text-black">
            <h3 className="text-3xl font-bold">{img.alt}</h3>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-black w-8" : "bg-black/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}