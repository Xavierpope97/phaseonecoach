"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 text-center md:px-10"
    >
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] w-[50vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,121,249,0.3) 0%, rgba(124,58,237,0.2) 40%, rgba(10,0,16,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl font-display text-[clamp(36px,7vw,96px)] font-black leading-[1.05] tracking-tight"
      >
        Ready to become the leader your business needs?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 mx-auto mt-6 max-w-xl font-light text-muted"
      >
        Book a complimentary strategy call. No pitch — just clarity on what
        your next level looks like.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mt-10"
      >
        <a
          href="mailto:hello@apexcoaching.com"
          className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-10 py-5 text-sm font-medium tracking-wide text-text transition-transform duration-300 hover:scale-105"
        >
          Book Your Strategy Call
        </a>
      </motion.div>
    </section>
  );
}
