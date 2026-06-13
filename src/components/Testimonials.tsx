"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I had an idea and no clue where to start. Phase One helped me turn it into an actual business plan — and three months later I had my first paying customers.",
    name: "Sarah Chen",
  },
  {
    quote:
      "We'd been running for two years but felt stuck. Phase One gave us a clear roadmap and helped us finally build systems that don't depend on us doing everything.",
    name: "Marcus Reyes",
  },
  {
    quote:
      "The clarity we got from working with Phase One was worth more than any advice we'd gotten before. We finally know what to focus on next.",
    name: "Priya Anand",
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
