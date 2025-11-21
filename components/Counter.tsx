"use client";   // ← ADD THIS LINE AT THE VERY TOP

import { useState, useEffect } from "react";

type CounterProps = {
  end: number;
  label: string;
  isPercentage?: boolean;
  primary?: boolean;
};

function Counter({ end, label, isPercentage = false, primary = false }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 60; // smooth animation
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div
      className={`text-center p-10  rounded-2xl transition-all ${
        primary ? "bg-purple-600 text-white" : "bg-gray-200 shadow-2xl"
      }`}
    >
      <h3 className={`text-3xl font-extrabold text-black ${
        primary ? "text-white" : "text-black"
      }`}>
        {count}
        {isPercentage ? "%" : "+"}
      </h3>
      <p className={`mt-4 text-black font-semibold opacity-90  ${
        primary ? "text-white" : "text-black"
      }`}>{label}</p>
    </div>
  );
}

export default function CountCardsContainer() {
  return (
    <section className="py-20 bg-white text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter end={500} label="Happy Students" />
          <Counter end={145} label="Projects Delivered" />
          <Counter end={90} label="Repeat Buyers" isPercentage />
          <Counter end={5} label="Years of Excellence" primary />
        </div>
      </div>
    </section>
  );
}