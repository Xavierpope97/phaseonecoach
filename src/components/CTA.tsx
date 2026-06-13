"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm, type ContactFormState } from "@/app/actions";

const initialState: ContactFormState = { status: "idle" };

export default function CTA() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

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

      <motion.form
        action={formAction}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mx-auto mt-12 flex max-w-xl flex-col gap-4 text-left"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="rounded-xl border border-white/10 bg-surface px-5 py-4 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="rounded-xl border border-white/10 bg-surface px-5 py-4 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="What are you looking to achieve?"
          required
          rows={4}
          className="rounded-xl border border-white/10 bg-surface px-5 py-4 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-10 py-5 text-sm font-medium tracking-wide text-text transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Book Your Strategy Call"}
        </button>

        {state.status === "success" && (
          <p className="text-sm font-light text-highlight">{state.message}</p>
        )}
        {state.status === "error" && (
          <p className="text-sm font-light text-red-400">{state.message}</p>
        )}
      </motion.form>
    </section>
  );
}
