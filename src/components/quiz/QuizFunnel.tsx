"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";

type Stage =
  | "hook"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "loading"
  | "results"
  | "booking";

type ResultKey = "launch" | "growth" | "strategy";

interface Answers {
  stage?: string;
  blocker?: string;
  businessType?: string;
  urgency?: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const CONTENT: Record<
  ResultKey,
  { phase: number; title: string; desc: string; focusLabel: string; items: string[]; program: string }
> = {
  launch: {
    phase: 1,
    title: "You're in the Launch Phase.",
    desc: "You have an idea or an early version of your business, but the plan underneath it isn't locked in yet. This is the most important phase to get right — the moves you make now decide how much rebuilding you'll have to do later.",
    focusLabel: "WHAT TO FOCUS ON RIGHT NOW",
    items: [
      "Validate the offer before investing further time or money",
      "Define exactly who your first customers are and where to find them",
      "Build a simple, real plan for your first 90 days — not a 40-page document",
    ],
    program: "Startup Launch Strategy",
  },
  growth: {
    phase: 2,
    title: "You're in the Growth Phase.",
    desc: "You've proven the business works — now the challenge is doing it without it all depending on you. Most founders hit a ceiling here not because demand dries up, but because there's no system underneath the momentum.",
    focusLabel: "WHAT TO FOCUS ON RIGHT NOW",
    items: [
      "Identify what's eating your time that shouldn't be",
      "Build the systems and priorities that let you grow without burning out",
      "Get a clear roadmap for the next 2–3 revenue milestones",
    ],
    program: "Growth & Operations",
  },
  strategy: {
    phase: 3,
    title: "You're in the Strategy Phase.",
    desc: "You're past the early questions — now it's about choosing the right growth lever and executing without wasted motion. At this stage, the cost of an unclear strategy is measured in months, not minutes.",
    focusLabel: "WHAT TO FOCUS ON RIGHT NOW",
    items: [
      "Get clarity on your market position and what actually differentiates you",
      "Pinpoint the 1–2 growth levers that matter most right now",
      "Build an executable plan tied to your finances, not just ambition",
    ],
    program: "Business Strategy",
  },
};

function computeResult(answers: Answers): ResultKey {
  const stageMap: Record<string, ResultKey> = {
    idea: "launch",
    "launched-no-revenue": "launch",
    "revenue-stuck": "growth",
    "growing-no-systems": "growth",
  };
  let key: ResultKey = stageMap[answers.stage ?? ""] ?? "growth";
  if (
    answers.blocker === "no-strategy" &&
    (answers.stage === "revenue-stuck" || answers.stage === "growing-no-systems")
  ) {
    key = "strategy";
  }
  return key;
}

// ── Trail component ──────────────────────────────────────────────────────────
function Trail({ done, label }: { done: number; label: string }) {
  return (
    <div className="trail">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={`trail-step ${n <= done ? "done" : ""}`}>
          <div className="fill" />
        </div>
      ))}
      <span className="trail-label">{label}</span>
    </div>
  );
}

// ── Option list component ────────────────────────────────────────────────────
function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string }[];
  selected?: string;
  onSelect: (v: string) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="options">
      {options.map((opt, i) => (
        <div
          key={opt.value}
          className={`option ${selected === opt.value ? "selected" : ""}`}
          onClick={() => onSelect(opt.value)}
        >
          <div className="option-content">
            <span className="letter">{letters[i]}</span>
            {opt.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main funnel ──────────────────────────────────────────────────────────────
export default function QuizFunnel() {
  const [stage, setStage] = useState<Stage>("hook");
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOpts, setSelectedOpts] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resultKey, setResultKey] = useState<ResultKey>("launch");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [utms, setUtms] = useState<UTMParams>({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
    });
  }, []);

  function goTo(s: Stage) {
    setStage(s);
    window.scrollTo(0, 0);
  }

  function pickAnswer(key: keyof Answers, value: string, next: Stage) {
    setSelectedOpts((prev) => ({ ...prev, [key]: value }));
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => goTo(next), 280);
  }

  async function submitQuiz() {
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitting(true);

    const key = computeResult(answers);
    setResultKey(key);
    goTo("loading");

    const loadingStart = Date.now();
    const supabase = createSupabaseClient();
    const { data } = await supabase
      .from("quiz_leads")
      .insert({
        first_name: contact.name || null,
        email: contact.email,
        phone: contact.phone || null,
        q1_stage: answers.stage,
        q2_blocker: answers.blocker,
        q3_business_type: answers.businessType,
        q4_urgency: answers.urgency,
        result_phase: CONTENT[key].phase,
        result_program: CONTENT[key].program,
        ...utms,
        completed_quiz: true,
      })
      .select("id")
      .single();

    if (data) setLeadId(data.id);
    setSubmitting(false);

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "New quiz lead — phaseonecoach.com",
        body: `Name: ${contact.name || "(not provided)"}\nEmail: ${contact.email}\nPhone: ${contact.phone || "(not provided)"}\n\nResult: ${CONTENT[key].program} (Phase ${CONTENT[key].phase})\nStage: ${answers.stage}\nBlocker: ${answers.blocker}`,
      }),
    }).catch(() => {});

    const elapsed = Date.now() - loadingStart;
    setTimeout(() => goTo("results"), Math.max(0, 1400 - elapsed));
  }

  async function handleBookingClick() {
    if (leadId) {
      const supabase = createSupabaseClient();
      await supabase
        .from("quiz_leads")
        .update({ clicked_booking: true })
        .eq("id", leadId);
    }
    window.open(
      "https://api.leadconnectorhq.com/widget/booking/66cqZhBSxtjczGA5K7u8",
      "_blank"
    );
  }

  const result = CONTENT[resultKey];

  return (
    <div className="quiz-root">
      {/* ── HOOK ── */}
      <div className={`stage ${stage === "hook" ? "active" : ""}`}>
        <div className="inner">
          <div className="eyebrow">
            <span className="dash" />
            PHASE ONE COACHING
          </div>
          <h1>
            You&rsquo;ve got the idea.
            <br />
            Let&rsquo;s find out <em>what&rsquo;s next.</em>
          </h1>
          <p className="lede">
            Most founders don&rsquo;t fail because the idea was bad — they fail
            because no one ever showed them the next move. Take our 60-second
            assessment to find out exactly what phase your business is in, and
            what to focus on right now.
          </p>
          <button className="btn btn-primary" onClick={() => goTo("q1")}>
            Start the 60-second assessment <span className="arrow">→</span>
          </button>
          <div className="tags">
            <span className="tag">FIRST-TIME FOUNDERS</span>
            <span className="tag">EARLY-STAGE BUSINESSES</span>
            <span className="tag">GO-TO-MARKET</span>
            <span className="tag">GROWTH ROADMAPS</span>
          </div>
        </div>
      </div>

      {/* ── Q1 ── */}
      <div className={`stage ${stage === "q1" ? "active" : ""}`}>
        <div className="inner">
          <Trail done={1} label="01 / 05" />
          <div className="q-number">QUESTION 01</div>
          <div className="q-text">Where is your business right now?</div>
          <OptionList
            options={[
              { value: "idea", label: "Still an idea — I haven't launched yet" },
              { value: "launched-no-revenue", label: "Launched, but no consistent revenue yet" },
              { value: "revenue-stuck", label: "Making money, but growth has stalled" },
              { value: "growing-no-systems", label: "Growing fast, but I'm holding it together with no real systems" },
            ]}
            selected={selectedOpts.stage}
            onSelect={(v) => pickAnswer("stage", v, "q2")}
          />
          <div className="nav-row">
            <button className="back-link" onClick={() => goTo("hook")}>← Back</button>
          </div>
        </div>
      </div>

      {/* ── Q2 ── */}
      <div className={`stage ${stage === "q2" ? "active" : ""}`}>
        <div className="inner">
          <Trail done={2} label="02 / 05" />
          <div className="q-number">QUESTION 02</div>
          <div className="q-text">What&rsquo;s the biggest thing slowing you down?</div>
          <OptionList
            options={[
              { value: "no-plan", label: "I don't have a clear plan — just instinct" },
              { value: "no-clients", label: "Not enough consistent clients or customers" },
              { value: "no-systems", label: "Everything depends on me — no systems or team" },
              { value: "no-strategy", label: "I don't know which growth lever to pull next" },
            ]}
            selected={selectedOpts.blocker}
            onSelect={(v) => pickAnswer("blocker", v, "q3")}
          />
          <div className="nav-row">
            <button className="back-link" onClick={() => goTo("q1")}>← Back</button>
          </div>
        </div>
      </div>

      {/* ── Q3 ── */}
      <div className={`stage ${stage === "q3" ? "active" : ""}`}>
        <div className="inner">
          <Trail done={3} label="03 / 05" />
          <div className="q-number">QUESTION 03</div>
          <div className="q-text">What does your business sell?</div>
          <OptionList
            options={[
              { value: "service", label: "A service (consulting, agency, freelance, trade)" },
              { value: "product", label: "A physical or e-commerce product" },
              { value: "coaching", label: "Coaching, wellness, or personal training" },
              { value: "other", label: "Something else / not sure yet" },
            ]}
            selected={selectedOpts.businessType}
            onSelect={(v) => pickAnswer("businessType", v, "q4")}
          />
          <div className="nav-row">
            <button className="back-link" onClick={() => goTo("q2")}>← Back</button>
          </div>
        </div>
      </div>

      {/* ── Q4 ── */}
      <div className={`stage ${stage === "q4" ? "active" : ""}`}>
        <div className="inner">
          <Trail done={4} label="04 / 05" />
          <div className="q-number">QUESTION 04</div>
          <div className="q-text">How soon do you want to make real progress?</div>
          <OptionList
            options={[
              { value: "now", label: "Immediately — I'm ready to move now" },
              { value: "month", label: "Within the next month" },
              { value: "exploring", label: "Just exploring my options for now" },
            ]}
            selected={selectedOpts.urgency}
            onSelect={(v) => pickAnswer("urgency", v, "q5")}
          />
          <div className="nav-row">
            <button className="back-link" onClick={() => goTo("q3")}>← Back</button>
          </div>
        </div>
      </div>

      {/* ── Q5: Contact capture ── */}
      <div className={`stage ${stage === "q5" ? "active" : ""}`}>
        <div className="inner">
          <Trail done={5} label="05 / 05" />
          <div className="q-number">LAST STEP</div>
          <div className="q-text">Where should we send your results?</div>
          <div className="contact-fields">
            <input
              type="text"
              placeholder="First name"
              value={contact.name}
              onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email address"
              value={contact.email}
              className={emailError ? "error" : ""}
              onChange={(e) => {
                setContact((p) => ({ ...p, email: e.target.value }));
                if (emailError) setEmailError("");
              }}
            />
            {emailError && <p className="field-error">{emailError}</p>}
            <input
              type="tel"
              placeholder="Phone number"
              value={contact.phone}
              onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={submitQuiz}
            disabled={submitting}
          >
            Get my results <span className="arrow">→</span>
          </button>
          <div className="nav-row" style={{ marginTop: "18px" }}>
            <button className="back-link" onClick={() => goTo("q4")}>← Back</button>
          </div>
        </div>
      </div>

      {/* ── LOADING ── */}
      <div className={`stage ${stage === "loading" ? "active" : ""}`}>
        <div className="inner">
          <div className="stamp-wrap">
            <div className="spinner" />
            <div className="loading-text">DIAGNOSING YOUR PHASE...</div>
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className={`stage ${stage === "results" ? "active" : ""}`}>
        <div className="inner">
          <div className="phase-stamp">
            <div className="phase-number">0{result.phase}</div>
            <div className="phase-meta">
              PHASE {result.phase}
              <br />
              OF YOUR BUSINESS
            </div>
          </div>
          <div className="result-title">
            <em>{result.title.replace("You're in the ", "").replace(".", "")}</em>
            <svg
              className="underline-svg"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q 75 2, 150 8 T 298 8"
                stroke="#E8623D"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="result-desc" style={{ marginTop: "24px" }}>
            {result.desc}
          </p>
          <div className="focus-card">
            <div className="focus-label">{result.focusLabel}</div>
            <ul className="focus-list">
              {result.items.map((item) => (
                <li key={item}>
                  <span className="bullet">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="cta-block">
            <button className="btn btn-primary" onClick={() => goTo("booking")}>
              Book my free consultation <span className="arrow">→</span>
            </button>
            <span className="cta-sub">
              Recommended program: {result.program} — we&rsquo;ll confirm fit on the call.
            </span>
          </div>
        </div>
      </div>

      {/* ── BOOKING BRIDGE ── */}
      <div className={`stage ${stage === "booking" ? "active" : ""}`}>
        <div className="inner">
          <div className="check-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 13L9 17L19 7"
                stroke="#FFFDF9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="eyebrow">
            <span className="dash" />
            YOUR ASSESSMENT IS COMPLETE
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>
            Let&rsquo;s talk through your plan.
          </h1>
          <p className="lede">
            Book a free 20-minute consultation. We&rsquo;ll walk through your
            results, answer your questions, and map out exactly what your next
            phase should look like — no pitch, just clarity.
          </p>
          <div className="booking-frame">
            <div className="booking-row">
              <div className="icon">20</div>
              <div>
                <div className="label-main">20-minute call</div>
                <div className="label-sub">Zoom — link sent after booking</div>
              </div>
            </div>
            <div className="booking-row">
              <div className="icon">$0</div>
              <div>
                <div className="label-main">No cost, no obligation</div>
                <div className="label-sub">Just a real conversation about your business</div>
              </div>
            </div>
            <div className="booking-row">
              <div className="icon">✓</div>
              <div>
                <div className="label-main">Personalized to your phase</div>
                <div className="label-sub">We&rsquo;ll reference your assessment results on the call</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <button className="btn btn-primary" onClick={handleBookingClick}>
              Book My Free Consultation <span className="arrow">→</span>
            </button>
          </div>
          <p className="footer-note">
            You&rsquo;ll pick a time that works for you on the next page.
          </p>
        </div>
      </div>
    </div>
  );
}
