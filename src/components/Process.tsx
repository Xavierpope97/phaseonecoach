"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Start",
    description:
      "We start with a deep diagnostic — your goals, blind spots, and the gap between where you are and where you need to be.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "A clear plan and the systems to back it up — built around your specific stage, challenges, timeline, and definition of success.",
  },
  {
    number: "03",
    title: "Scale",
    description:
      "Hands-on support, real-time feedback, and the roadmap to grow into your business's next stage.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mb-20 font-display text-[clamp(32px,5vw,64px)] font-black leading-tight tracking-tight"
        >
          How We Work
        </motion.h2>

        <div className="relative">
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-gradient-to-r from-primary via-accent to-highlight md:block"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-accent to-highlight md:hidden"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative flex flex-col gap-4 pl-16 md:pl-0"
              >
                <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-highlight shadow-[0_0_12px_2px_rgba(232,121,249,0.7)] md:left-1/2 md:top-[18px] md:-translate-x-1/2" />
                <span className="text-stroke font-display text-6xl font-black md:text-7xl">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="font-light text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
