"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Apex didn't just help me become a better leader — they rebuilt how I think about decisions entirely. Our revenue grew 3x in eighteen months.",
    name: "Sarah Chen",
    title: "CEO, Northwind Labs",
  },
  {
    quote:
      "The clarity I got from this program is something I couldn't have found anywhere else. It's not coaching, it's a complete operating system upgrade.",
    name: "Marcus Reyes",
    title: "Founder, Halcyon Group",
  },
  {
    quote:
      "Our leadership team finally moves like one unit. The alignment work alone was worth ten times the investment.",
    name: "Priya Anand",
    title: "COO, Verge Dynamics",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-surface px-6 py-32 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[40vw] w-[40vw] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(10,0,16,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-10 font-display text-sm font-bold uppercase tracking-[0.3em] text-accent">
          Results, Not Promises
        </p>

        <div className="min-h-[280px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-[clamp(24px,4vw,48px)] font-bold leading-tight tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="font-display text-lg font-bold text-highlight">
                  {current.name}
                </p>
                <p className="font-light text-sm uppercase tracking-[0.2em] text-muted">
                  {current.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-highlight" : "w-2 bg-text/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
