import { marqueeWords } from "@/lib/data";

export default function Marquee() {
  const content = (
    <>
      {marqueeWords.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cocoa/70">
            {word}
          </span>
          <span className="font-display text-lg text-gold" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden border-y border-cocoa/12 bg-cream py-5">
      <div className="marquee-track" aria-label="Maison Beurre values">
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}
