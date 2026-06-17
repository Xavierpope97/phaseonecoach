"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#testimonials" },
  { label: "Free Resources", href: "/free-guide" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-black/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#"
          className="font-display text-xl font-black tracking-tight text-text md:text-2xl"
        >
          Phase One<span className="text-accent"> Coaching</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-light tracking-wide text-text/80 transition-colors hover:text-highlight"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://api.leadconnectorhq.com/widget/booking/66cqZhBSxtjczGA5K7u8"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden overflow-hidden rounded-full border border-primary px-6 py-2.5 text-sm font-medium tracking-wide text-primary md:inline-block"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary to-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Book a Call</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-6 bg-text transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass border-b border-black/10 md:hidden"
          >
            <ul className="flex flex-col gap-6 px-6 py-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl font-bold text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/66cqZhBSxtjczGA5K7u8"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-medium tracking-wide text-primary"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
