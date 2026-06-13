"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Executive Coaching",
    description:
      "One-on-one partnership designed to sharpen your leadership identity, decision-making, and presence at the highest levels.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 40c0-8.837 7.163-14 16-14s16 5.163 16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Team Performance",
    description:
      "Align your leadership team around a shared vision, sharpen communication, and build a culture that compounds results.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="16" cy="18" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="18" r="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 40c0-6.627 5.373-11 12-11s12 4.373 12 11M20 40c0-6.627 5.373-11 12-11s12 4.373 12 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Business Strategy",
    description:
      "Cut through the noise with a clear, executable roadmap — built around your market position, unit economics, and growth levers.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M8 40V24M20 40V12M32 40V20M44 40V8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="font-display text-[clamp(32px,5vw,64px)] font-black leading-tight tracking-tight">
            What We Do
          </h2>
          <p className="max-w-md font-light text-muted">
            Three core programs. One unifying goal — turn potential into
            performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-surface p-8 transition-colors duration-300 hover:border-accent/60"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(140% 140% at 0% 0%, rgba(168,85,247,0.18) 0%, rgba(10,0,16,0) 60%)",
                }}
              />
              <div className="relative z-10 text-accent">{service.icon}</div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 font-light text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-text">
                <span>Learn more</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
