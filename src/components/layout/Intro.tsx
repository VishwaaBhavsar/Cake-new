"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const overlay = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("mb-intro-seen");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finish = () => {
      sessionStorage.setItem("mb-intro-seen", "1");
      setVisible(false);
      document.documentElement.classList.remove("mb-intro-lock");
      window.dispatchEvent(new Event("mb:intro-done"));
    };

    if (seen || reduced) {
      finish();
      return;
    }

    document.documentElement.classList.add("mb-intro-lock");

    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      const tl = gsap.timeline({
        onComplete: finish,
        defaults: { ease: "power3.out" },
      });

      tl.from(mark.current, {
        y: 18,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          line.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.3,
            ease: "power2.inOut",
          },
          0.2,
        )
        .to(
          progress,
          {
            value: 100,
            duration: 1.25,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(progress.value),
                ).padStart(3, "0");
              }
            },
          },
          0.15,
        )
        .to(
          overlay.current,
          {
            yPercent: -100,
            duration: 1.05,
            ease: "expo.inOut",
          },
          1.55,
        );
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ivory px-6 py-7 text-cocoa md:px-10 md:py-9"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between">
        <span className="eyebrow">Maison Beurre</span>
        <span className="eyebrow hidden md:block">Copenhagen · Est. 2016</span>
      </div>

      <div ref={mark} className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cocoa/30">
          <span className="font-display text-3xl leading-none">MB</span>
        </div>
        <span className="serif-italic text-2xl text-cocoa/80">
          a little art, a lot of buttercream
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-cocoa/50">Preparing the atelier</span>
          <span className="block h-px w-40 bg-cocoa/20 md:w-64">
            <span
              ref={line}
              className="block h-px w-full origin-left bg-cocoa"
            />
          </span>
        </div>
        <span
          ref={counter}
          className="font-display text-5xl leading-none md:text-7xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
