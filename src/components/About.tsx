"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

const stats = [
  { value: 500, suffix: "+", label: "Clients Coached" },
  { value: 12, suffix: "", label: "Years in Business" },
  { value: 2, suffix: "B+", prefix: "$", label: "Revenue Unlocked" },
  { value: 97, suffix: "%", label: "Client Retention" },
];

export default function About() {
  return (
    <section id="philosophy" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(36px,6vw,80px)] font-black leading-[1.05] tracking-tight"
        >
          Coaching isn&rsquo;t a service.
          <br />
          It&rsquo;s a{" "}
          <span className="gradient-text">transformation.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div className="grid grid-cols-2 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="font-display text-4xl font-black text-highlight md:text-5xl">
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className="mt-2 text-sm font-light uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="font-light text-lg leading-relaxed text-text/80 md:text-xl">
              We don&rsquo;t do generic frameworks or recycled advice. Every
              engagement is built around the specific mountain you&rsquo;re
              climbing — whether that&rsquo;s scaling a team, sharpening your
              leadership presence, or rebuilding a business model from the
              ground up.
            </p>
            <p className="font-light text-base leading-relaxed text-muted">
              Our coaches have sat in the rooms where decisions get made.
              They&rsquo;ve built, sold, and scaled companies of their own.
              You won&rsquo;t get theory — you&rsquo;ll get a partner who has
              lived it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
