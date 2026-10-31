"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cakeFlavors, type Flavor } from "@/lib/data";

const CakeScene = dynamic(() => import("@/components/three/CakeScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 rounded-full border border-ivory/10" />
        <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-gold/70 [animation-duration:2.6s]" />
        <span className="absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.3em] uppercase text-ivory/40">
          Preparing
        </span>
      </div>
    </div>
  );
}

export default function CakeExperience() {
  const [flavor, setFlavor] = useState<Flavor>("vanilla");
  const [active, setActive] = useState(true);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const current = cakeFlavors.find((item) => item.id === flavor) ?? cakeFlavors[0];

  useEffect(() => {
    const element = stage.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "240px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-atelier-fade]", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
        },
      });

      gsap.from(stage.current, {
        opacity: 0,
        scale: 0.94,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stage.current,
          start: "top 85%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="atelier"
      className="relative overflow-hidden bg-chocolate text-ivory"
    >
      <div
        className="pointer-events-none absolute -left-[30vw] top-[10%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(184,147,95,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[20vw] bottom-0 h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(216,169,154,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-ivory/10" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1680px] grid-cols-1 px-5 pb-14 pt-20 md:grid-cols-12 md:gap-4 md:px-10 md:pb-16 md:pt-24">
        <div className="order-2 flex flex-col md:order-1 md:col-span-4 md:pt-8 lg:pt-12">
          <p data-atelier-fade className="eyebrow text-gold/80">
            III — The Atelier
          </p>

          <h2
            data-atelier-fade
            className="display mt-6 text-[clamp(2.7rem,4.6vw,4.7rem)]"
          >
            Turn it.
            <br />
            Study it.
            <br />
            <span className="serif-italic text-blush">Then taste it.</span>
          </h2>

          <p
            data-atelier-fade
            className="mt-6 max-w-[21rem] text-[13px] leading-[1.85] text-ivory/58"
          >
            Every cake is composed to order, so we build it in front of you
            first. Three house flavours, one silhouette. Rotate it, choose a
            finish, and we will take it from there.
          </p>

          <div data-atelier-fade className="mt-9 flex flex-col">
            {cakeFlavors.map((item) => {
              const selected = item.id === flavor;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFlavor(item.id)}
                  aria-pressed={selected}
                  className="group relative isolate flex items-center gap-4 border-t border-ivory/12 py-4 text-left last:border-b"
                >
                  {selected ? (
                    <motion.span
                      layoutId="atelier-flavor"
                      className="absolute inset-0 -z-10 bg-ivory/[0.055]"
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                  <span
                    className="h-3 w-3 shrink-0 rounded-full ring-1 ring-ivory/25 transition-transform duration-500 group-hover:scale-125"
                    style={{ backgroundColor: item.swatch }}
                    aria-hidden="true"
                  />
                  <span className="flex-1">
                    <span
                      className={`font-display text-2xl leading-none transition-colors duration-500 ${
                        selected ? "text-ivory" : "text-ivory/45"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="mt-1.5 block text-[9px] tracking-[0.18em] uppercase text-ivory/38">
                      {item.note}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] tracking-[0.18em] transition-colors duration-500 ${
                      selected ? "text-gold" : "text-ivory/35"
                    }`}
                  >
                    {item.price}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            data-atelier-fade
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[9px] tracking-[0.24em] uppercase text-ivory/40"
          >
            <span>Serves 10–14</span>
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            <span>48 hours&apos; notice</span>
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            <span>Copenhagen delivery</span>
          </div>

          <a
            data-atelier-fade
            href="#contact"
            className="btn-primary mt-9 w-fit border-ivory/50 text-ivory"
          >
            <span>Order the {current.name}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="order-1 md:order-2 md:col-span-8">
          <div
            ref={stage}
            className="relative h-[50vh] min-h-[360px] w-full md:h-[84vh] md:min-h-[560px]"
          >
            <div className="absolute inset-0">
              <CakeScene flavor={flavor} active={active} />
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2 md:p-4">
              <div className="flex items-start justify-between">
                <span className="text-[9px] tracking-[0.3em] uppercase text-ivory/35">
                  No. 03
                  <br />
                  The house cake
                </span>
                <span className="hidden text-right text-[9px] leading-[1.9] tracking-[0.26em] uppercase text-ivory/30 sm:block">
                  Buttercream study
                  <br />
                  Edition 01 / 03
                </span>
              </div>

              <div className="flex items-end justify-between">
                <span className="flex items-center gap-2 text-[9px] tracking-[0.26em] uppercase text-ivory/35">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden="true"
                  >
                    <path d="M4 12a8 8 0 1 1 2.4 5.7" />
                    <path d="M4 18v-6h6" />
                  </svg>
                  Move to rotate
                </span>
                <span className="font-display text-2xl text-ivory/25 md:text-3xl">
                  360°
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
