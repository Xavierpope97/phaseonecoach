"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitLeadMagnetForm, type LeadMagnetState } from "@/app/actions";

const initialState: LeadMagnetState = { status: "idle" };

export default function LeadMagnetForm() {
  const [state, formAction, pending] = useActionState(
    submitLeadMagnetForm,
    initialState
  );

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 mx-auto mt-12 flex max-w-md flex-col gap-4 text-left"
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

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-10 py-5 text-sm font-medium tracking-wide text-text transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Me The Free Guide"}
      </button>

      {state.status === "success" && (
        <p className="text-sm font-light text-highlight">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-sm font-light text-red-400">{state.message}</p>
      )}
    </motion.form>
  );
}
