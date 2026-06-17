const items = [
  "FIRST-TIME FOUNDERS",
  "EARLY-STAGE STARTUPS",
  "IDEA TO LAUNCH",
  "GO-TO-MARKET STRATEGY",
  "BUSINESS PLANNING",
  "GROWTH ROADMAPS",
  "PRODUCT-MARKET FIT",
  "SMALL BUSINESS OWNERS",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <section className="relative border-y border-black/10 bg-surface py-6">
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
