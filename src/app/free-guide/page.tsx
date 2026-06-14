import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata: Metadata = {
  title: "Free Guide: 21 Money Traps That Kill First-Time Businesses — Phase One Coaching",
  description:
    "Download our free guide and learn the 21 money mistakes that sink first-time businesses before they ever get off the ground.",
};

const traps = [
  "Underpricing your product or service from day one",
  "Spending on branding before validating the idea",
  "Mixing personal and business finances",
  "Ignoring cash flow until it's a crisis",
  "Skipping the numbers and going with your gut",
];

export default function FreeGuidePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden px-6 py-32 text-center md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,121,249,0.3) 0%, rgba(124,58,237,0.2) 40%, rgba(10,0,16,0) 70%)",
            filter: "blur(60px)",
          }}
        />

        <p className="relative z-10 mb-6 font-display text-sm font-bold uppercase tracking-[0.3em] text-accent">
          Free Resources
        </p>

        <h1 className="relative z-10 mx-auto max-w-4xl font-display text-[clamp(36px,7vw,88px)] font-black leading-[1.05] tracking-tight">
          21 Money Traps That Kill{" "}
          <span className="gradient-text">First-Time Businesses</span>{" "}
          Before They Start
        </h1>

        <p className="relative z-10 mx-auto mt-6 max-w-xl font-light text-muted">
          Most first-time founders don&rsquo;t fail because of a bad idea —
          they fail because of avoidable money mistakes. Grab the free guide
          and learn how to dodge the most common ones before they cost you.
        </p>

        <LeadMagnetForm />

        <div className="relative z-10 mx-auto mt-24 max-w-2xl text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            A few of the traps inside:
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {traps.map((trap) => (
              <li
                key={trap}
                className="flex items-start gap-3 font-light text-text/80"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-highlight" />
                {trap}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
