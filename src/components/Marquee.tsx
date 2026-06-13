const items = [
  "FORTUNE 500 ALUMNI",
  "Y COMBINATOR FOUNDERS",
  "$2B+ REVENUE UNLOCKED",
  "500+ EXECUTIVES COACHED",
  "TEDX SPEAKERS",
  "SCALE-UP CEOS",
  "SERIES A–D LEADERS",
  "GLOBAL TEAMS",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <section className="relative border-y border-white/5 bg-surface py-6">
      <div className="marquee-track w-max">
        {track.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-8 px-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-muted whitespace-nowrap"
          >
            <span>{item}</span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
