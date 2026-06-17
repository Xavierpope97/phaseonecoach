"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Startup Launch Strategy",
    description:
      "For aspiring entrepreneurs — turn your idea into a real plan. We help you validate the concept, define your offer, and map the first steps to get off the ground.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 4l5 11 12 1.5-9 8.5 2.5 12L24 31l-10.5 6L16 25 7 16.5 19 15l5-11z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Growth & Operations",
    description:
      "For young businesses that are up and running but not sure what's next. We help you build the systems, priorities, and roadmap to grow with confidence.",
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
      "Cut through the noise with a clear, executable plan — built around your market position, finances, and the growth levers that matter most right now.",
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
              className="group relative flex flex-col justify-between gap-8 rounded-2xl border border-primary/15 bg-surface p-8 transition-colors duration-300 hover:border-accent/60"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(140% 140% at 0% 0%, rgba(168,85,247,0.18) 0%, rgba(250,250,250,0) 60%)",
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
