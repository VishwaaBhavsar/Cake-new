"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    label: "01 — The egg",
    lines: ["It begins with", "a single,", "good egg."],
    accentClass: "",
    body: "Organic, from a farm forty kilometres south. The yolk is almost orange. We bake at dawn, while the kitchen is still cold and the harbour is still quiet.",
    image: "/assets/story-wedding.jpg",
    alt: "An elaborate wedding cake display with sculptural white sugar flowers",
  },
  {
    label: "02 — Time",
    lines: ["Then,", "patience."],
    accentClass: "",
    body: "Three days for the buttercream to settle. Two for the fruit to macerate. A cake cannot be hurried — only understood.",
    image: "/assets/cake-berry.jpg",
    alt: "Dark chocolate cake with figs, blackberries and rose petals",
  },
  {
    label: "03 — Butter",
    lines: ["And rather", "a lot of", "butter."],
    accentClass: "text-blush",
    body: "Cultured, churned slowly, eighty-two percent fat. Enough to make a nutritionist look away and a pastry chef smile.",
    image: "/assets/cake-rose.jpg",
    alt: "Pale rose cake with macarons and raspberries",
  },
];

function StaticStory() {
  return (
    <section id="story" className="relative bg-ivory py-24 text-cocoa md:py-32">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex items-center justify-between border-t border-cocoa/15 pt-5">
          <p className="eyebrow text-cocoa/55">I — The Story</p>
          <p className="text-[9px] tracking-[0.28em] uppercase text-cocoa/40">
            Three chapters
          </p>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-3 md:gap-8">
          {chapters.map((chapter) => (
            <div key={chapter.label}>
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 30vw"
                  className="grade-warm object-cover"
                />
              </div>
              <p className="eyebrow mt-6 text-cocoa/45">{chapter.label}</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,3.4vw,3.2rem)]">
                {chapter.lines.map((line, index) => (
                  <span key={line} className="block">
                    <span
                      className={
                        index === chapter.lines.length - 1
                          ? `serif-italic ${chapter.accentClass}`
                          : ""
                      }
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
              <p className="mt-4 max-w-[24rem] text-[13px] leading-[1.8] text-cocoa/60">
                {chapter.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Story() {
  const [reduced, setReduced] = useState(false);
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const img1 = useRef<HTMLDivElement>(null);
  const img2 = useRef<HTMLDivElement>(null);
  const img3 = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  const text3 = useRef<HTMLDivElement>(null);
  const finalLine = useRef<HTMLParagraphElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const chapterLabel = useRef<HTMLSpanElement>(null);
  const float1 = useRef<HTMLSpanElement>(null);
  const float2 = useRef<HTMLSpanElement>(null);
  const float3 = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const shift = window.matchMedia("(min-width: 768px)").matches ? 42 : 0;

    const ctx = gsap.context(() => {
      gsap.set([img2.current, img3.current], {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set([text2.current, text3.current], { opacity: 0, y: 50 });
      gsap.set(finalLine.current, { opacity: 0, y: 24 });
      gsap.set([float1.current, float2.current, float3.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          pin: pin.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const step = p < 0.33 ? 0 : p < 0.68 ? 1 : 2;
            if (counter.current) {
              counter.current.textContent = `0${step + 1} / 03`;
            }
            if (chapterLabel.current) {
              chapterLabel.current.textContent = chapters[step].label;
            }
            if (progress.current) {
              progress.current.style.transform = `scaleX(${p})`;
            }
          },
        },
      });

      tl.to(img1.current, { scale: 1.08, duration: 1 }, 0)
        .to(text1.current, { opacity: 0, y: -40, duration: 0.16 }, 0.16)
        .to(imageWrap.current, { xPercent: shift, y: -18, duration: 0.3 }, 0.18)
        .to(img2.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.18 }, 0.3)
        .to(text2.current, { opacity: 1, y: 0, duration: 0.2 }, 0.34)
        .to(bg.current, { backgroundColor: "#e7d8c3", duration: 0.25 }, 0.3)
        .to(
          [float1.current, float2.current],
          { opacity: 1, duration: 0.2, stagger: 0.05 },
          0.36,
        )
        .to(float1.current, { yPercent: -120, duration: 0.5 }, 0.38)
        .to(float2.current, { yPercent: 90, duration: 0.5 }, 0.38)
        .to(text2.current, { opacity: 0, y: -40, duration: 0.16 }, 0.52)
        .to(imageWrap.current, { xPercent: 0, y: 10, duration: 0.3 }, 0.54)
        .to(img3.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.18 }, 0.62)
        .to(bg.current, { backgroundColor: "#1a0e09", duration: 0.25 }, 0.6)
        .to(
          [chapterLabel.current, counter.current],
          { color: "#f2ebde", duration: 0.25 },
          0.6,
        )
        .to(text3.current, { opacity: 1, y: 0, duration: 0.2 }, 0.68)
        .to(
          [float2.current, float3.current],
          { opacity: 0.7, duration: 0.2 },
          0.66,
        )
        .to(float3.current, { yPercent: -100, duration: 0.5 }, 0.7)
        .to(imageWrap.current, { scale: 1.06, duration: 0.3 }, 0.7)
        .to(finalLine.current, { opacity: 1, y: 0, duration: 0.16 }, 0.88)
        .to(imageWrap.current, { y: -30, duration: 0.12 }, 0.88);
    }, section);

    return () => ctx.revert();
  }, []);

  if (reduced) return <StaticStory />;

  return (
    <section ref={section} id="story" className="relative h-[320vh] bg-ivory text-cocoa">
      <div ref={pin} className="relative h-[100svh] overflow-hidden">
        <div ref={bg} className="absolute inset-0 bg-ivory" />

        <div className="absolute left-5 top-20 z-20 flex w-[calc(100%-2.5rem)] items-center justify-between md:left-10 md:top-28 md:w-[calc(100%-5rem)]">
          <span ref={chapterLabel} className="eyebrow text-cocoa/55">
            {chapters[0].label}
          </span>
          <span ref={counter} className="text-[10px] tracking-[0.28em] text-cocoa/40">
            01 / 03
          </span>
        </div>

        <div
          ref={imageWrap}
          className="absolute left-[8vw] top-[17vh] z-10 h-[31vh] w-[84vw] overflow-hidden md:left-[7vw] md:top-[19vh] md:h-[62vh] md:w-[39vw]"
        >
          <div ref={img1} className="absolute inset-0">
            <Image
              src={chapters[0].image}
              alt={chapters[0].alt}
              fill
              sizes="(max-width: 768px) 84vw, 39vw"
              className="grade-warm object-cover"
            />
            <div className="absolute inset-0 bg-chocolate/10" />
          </div>
          <div ref={img2} className="absolute inset-0">
            <Image
              src={chapters[1].image}
              alt={chapters[1].alt}
              fill
              sizes="(max-width: 768px) 84vw, 39vw"
              className="grade-warm object-cover"
            />
          </div>
          <div ref={img3} className="absolute inset-0">
            <Image
              src={chapters[2].image}
              alt={chapters[2].alt}
              fill
              sizes="(max-width: 768px) 84vw, 39vw"
              className="grade-warm object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-[9px] tracking-[0.26em] uppercase text-ivory/80 mix-blend-difference">
            <span className="h-1 w-1 rounded-full bg-current" />
            L&apos;atelier, Copenhagen
          </div>
        </div>

        <div
          ref={text1}
          className="absolute bottom-[6vh] left-5 z-20 w-[calc(100%-2.5rem)] md:bottom-auto md:left-auto md:right-[7vw] md:top-[28vh] md:w-[34vw]"
        >
          <p className="eyebrow mb-5 text-cocoa/45">{chapters[0].label}</p>
          <h2 className="display text-[clamp(2.9rem,5.2vw,5.6rem)]">
            {chapters[0].lines.map((line, index) => (
              <span key={line} className="block">
                <span
                  className={
                    index === chapters[0].lines.length - 1 ? "serif-italic" : ""
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[24rem] text-[13px] leading-[1.8] text-cocoa/65">
            {chapters[0].body}
          </p>
        </div>

        <div
          ref={text2}
          className="absolute bottom-[6vh] left-5 z-20 w-[calc(100%-2.5rem)] md:bottom-auto md:left-[7vw] md:top-[30vh] md:w-[30vw]"
        >
          <p className="eyebrow mb-5 text-cocoa/45">{chapters[1].label}</p>
          <h2 className="display text-[clamp(2.9rem,5.2vw,5.6rem)]">
            {chapters[1].lines.map((line, index) => (
              <span key={line} className="block">
                <span
                  className={
                    index === chapters[1].lines.length - 1 ? "serif-italic" : ""
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[24rem] text-[13px] leading-[1.8] text-cocoa/65">
            {chapters[1].body}
          </p>
        </div>

        <div
          ref={text3}
          className="absolute bottom-[6vh] left-5 z-20 w-[calc(100%-2.5rem)] text-ivory md:bottom-auto md:left-auto md:right-[7vw] md:top-[27vh] md:w-[36vw]"
        >
          <p className="eyebrow mb-5 text-ivory/45">{chapters[2].label}</p>
          <h2 className="display text-[clamp(2.9rem,5.2vw,5.6rem)]">
            {chapters[2].lines.map((line, index) => (
              <span key={line} className="block">
                <span
                  className={
                    index === chapters[2].lines.length - 1
                      ? `serif-italic ${chapters[2].accentClass}`
                      : ""
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[24rem] text-[13px] leading-[1.8] text-ivory/60">
            {chapters[2].body}
          </p>
        </div>

        <p
          ref={finalLine}
          className="absolute bottom-8 left-1/2 z-20 w-max -translate-x-1/2 text-center text-[9px] tracking-[0.34em] uppercase text-ivory/60"
        >
          Everything else is love
        </p>

        <span
          ref={float1}
          className="serif-italic pointer-events-none absolute right-[12vw] top-[18vh] z-20 hidden text-2xl text-rose/70 md:block"
          aria-hidden="true"
        >
          vanille
        </span>
        <span
          ref={float2}
          className="serif-italic pointer-events-none absolute right-[38vw] top-[70vh] z-20 hidden text-xl text-gold md:block"
          aria-hidden="true"
        >
          beurre
        </span>
        <span
          ref={float3}
          className="serif-italic pointer-events-none absolute left-[52vw] top-[24vh] z-20 hidden text-xl text-blush/80 md:block"
          aria-hidden="true"
        >
          fraise
        </span>

        <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-cocoa/10">
          <span ref={progress} className="block h-px w-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </section>
  );
}
