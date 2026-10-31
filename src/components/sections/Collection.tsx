"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cakes } from "@/lib/data";

export default function Collection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-collection-head]", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 74%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-cake-card]").forEach((card) => {
        gsap.from(card, {
          y: 64,
          opacity: 0,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });

        const media = card.querySelector("[data-cake-parallax]");
        if (!media) return;
        gsap.fromTo(
          media,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="collection"
      className="relative overflow-hidden bg-ivory py-24 text-cocoa md:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex items-center justify-between border-t border-cocoa/15 pt-5">
          <p data-collection-head className="eyebrow text-cocoa/55">
            II — The Collection
          </p>
          <p
            data-collection-head
            className="text-[9px] tracking-[0.28em] uppercase text-cocoa/40"
          >
            Five cakes / 2026
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h2
              data-collection-head
              className="display-tight text-[clamp(3.2rem,7.6vw,8rem)] uppercase"
            >
              The signature
              <br />
              <span className="serif-italic normal-case text-rose">
                collection.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4 md:mt-4 md:pl-6">
            <p
              data-collection-head
              className="max-w-[24rem] text-[13px] leading-[1.85] text-cocoa/65"
            >
              Five cakes, each built around a single idea. Nothing is
              decorated for the sake of it — every petal, drip and crumb has a
              reason to be there. Available whole, or by the slice at the
              atelier counter.
            </p>
            <a
              data-collection-head
              href="#contact"
              className="link-line w-fit text-[10px] tracking-[0.24em] uppercase text-cocoa/70"
            >
              Enquire about a bespoke cake
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24">
          {cakes.map((cake) => (
            <article
              key={cake.id}
              data-cake-card
              className={`group ${cake.layout}`}
            >
              <a href="#contact" className="block" aria-label={`${cake.name} — ${cake.price}`}>
                <div
                  className={`relative overflow-hidden bg-cream ${cake.aspect}`}
                >
                  <div
                    data-cake-parallax
                    className="absolute inset-[-6%] scale-105"
                  >
                    <Image
                      src={cake.image}
                      alt={cake.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 52vw"
                      className="grade object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <Image
                      src={cake.hoverImage}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 768px) 92vw, 52vw"
                      className="grade absolute inset-0 object-cover [clip-path:inset(0_0_100%_0)] transition-[clip-path,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(0_0_0%_0)]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,14,9,0.16)_0%,transparent_28%,transparent_70%,rgba(26,14,9,0.28)_100%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase text-ivory/85 md:left-5 md:top-5">
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {cake.index}
                  </div>

                  <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 text-[9px] tracking-[0.26em] uppercase text-ivory/85 opacity-0 transition-all duration-500 group-hover:opacity-100 md:bottom-5 md:right-5">
                    View cake
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-6 border-t border-cocoa/15 pt-4">
                  <div>
                    <h3 className="font-display text-[1.9rem] leading-none transition-colors duration-500 group-hover:text-rose md:text-[2.2rem]">
                      {cake.name}
                    </h3>
                    <p className="mt-2 text-[9px] tracking-[0.24em] uppercase text-cocoa/45">
                      {cake.notes}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 text-[10px] tracking-[0.2em] uppercase text-cocoa/55">
                    {cake.price}
                  </span>
                </div>

                <p className="mt-3 max-w-[34rem] text-[12.5px] leading-[1.8] text-cocoa/55">
                  {cake.description}
                </p>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-5 border-t border-cocoa/15 pt-5 md:mt-28 md:flex-row md:items-center">
          <p className="text-[9px] tracking-[0.26em] uppercase text-cocoa/45">
            All cakes serve 10–14 · 48 hours&apos; notice · Delivery across
            Copenhagen
          </p>
          <a
            href="#contact"
            className="link-line text-[10px] tracking-[0.24em] uppercase text-cocoa/70"
          >
            See the full menu
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
