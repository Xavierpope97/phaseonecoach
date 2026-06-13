"use client";

import { motion } from "framer-motion";

const lineVariants = {
  hidden: {},
  visible: {},
};

function AnimatedLine({
  words,
  className,
  delayStart = 0,
}: {
  words: string[];
  className: string;
  delayStart?: number;
}) {
  return (
    <motion.div
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center gap-x-4 ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delayStart + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block overflow-hidden"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
      {/* Ambient orb */}
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.25) 35%, rgba(10,0,16,0) 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2 font-display font-black leading-[0.95] tracking-tight">
        <AnimatedLine
          words={["We", "Build"]}
          className="text-[clamp(48px,9vw,120px)] text-text"
          delayStart={0.2}
        />
        <AnimatedLine
          words={["LEADERS"]}
          className="text-stroke text-[clamp(56px,10vw,140px)]"
          delayStart={0.5}
        />
        <AnimatedLine
          words={["Not", "Followers"]}
          className="text-[clamp(48px,9vw,120px)] text-text"
          delayStart={0.7}
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 mt-8 max-w-xl font-light text-base text-muted md:text-lg"
      >
        High-performance coaching for founders and executives who are done
        playing small.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-medium tracking-wide text-text transition-transform duration-300 hover:scale-105"
        >
          Start Your Journey
        </a>
        <a
          href="#philosophy"
          className="rounded-full border border-text/20 px-8 py-4 text-sm font-medium tracking-wide text-text transition-colors duration-300 hover:border-highlight hover:text-highlight"
        >
          Watch Our Story
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-text/30 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-highlight" />
        </motion.div>
      </motion.div>
    </section>
  );
}
