"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const videoWrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const playVideo = () => {
      video.current?.play().catch(() => undefined);
    };
    playVideo();

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.to(videoWrap.current, {
          scale: 1.12,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (prefersReduced) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");

      const start = () => {
        gsap.set(lines, { yPercent: 118 });
        gsap.set(fades, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
        });

        tl.fromTo(
          video.current,
          { scale: 1.16 },
          { scale: 1, duration: 2.6, ease: "power3.out" },
          0,
        )
          .to(
            lines,
            {
              yPercent: 0,
              duration: 1.35,
              stagger: 0.1,
            },
            0.15,
          )
          .to(
            fades,
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.09,
            },
            0.55,
          );

        gsap.to("[data-scroll-dot]", {
          y: 52,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power2.inOut",
          delay: 1.2,
        });
      };

      if (sessionStorage.getItem("mb-intro-seen")) {
        start();
      } else {
        window.addEventListener("mb:intro-done", start, { once: true });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-chocolate text-ivory"
    >
      <div ref={videoWrap} className="absolute inset-0 -z-0">
        <video
          ref={video}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/assets/hero-cake.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,9,6,0.55)_0%,rgba(18,9,6,0.12)_32%,rgba(18,9,6,0.22)_58%,rgba(18,9,6,0.82)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_20%,rgba(18,9,6,0.45)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col px-5 pb-7 pt-28 md:px-10 md:pb-9 md:pt-32">
        <div className="flex items-start justify-between">
          <p
            data-hero-fade
            className="eyebrow max-w-[10rem] leading-[1.8] text-ivory/65"
          >
            Patisserie d&apos;art
            <br />
            Copenhagen, DK
          </p>
          <p
            data-hero-fade
            className="hidden text-right text-[10px] leading-[1.9] tracking-[0.24em] uppercase text-ivory/55 md:block"
          >
            Small batch · Always butter
            <br />
            55.6761° N / 12.5683° E
          </p>
        </div>

        <div className="mt-auto grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <h1 className="display-tight uppercase">
              <span className="block overflow-hidden pb-[0.06em]">
                <span
                  data-hero-line
                  className="block text-[clamp(2.5rem,6.9vw,7.4rem)]"
                >
                  A little{" "}
                  <span className="serif-italic normal-case text-blush">
                    art.
                  </span>
                </span>
              </span>
              <span className="mt-3 block overflow-hidden pb-[0.06em] md:mt-5">
                <span
                  data-hero-line
                  className="flex items-center gap-4 text-[clamp(0.62rem,1.1vw,0.8rem)] font-normal tracking-[0.32em] text-ivory/70"
                >
                  <span className="inline-block h-px w-10 bg-ivory/40 md:w-16" />
                  A lot of
                </span>
              </span>
              <span className="mt-2 block overflow-hidden pb-[0.08em] md:mt-3">
                <span
                  data-hero-line
                  className="block text-[clamp(2.9rem,7.9vw,8.6rem)]"
                >
                  Buttercream.
                </span>
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-7 md:col-span-4 md:items-end md:pb-2 md:text-right">
            <p
              data-hero-fade
              className="max-w-[21rem] text-[13px] leading-[1.8] text-ivory/72"
            >
              Sculptural cakes composed from cultured butter, seasonal fruit
              and a little theatre. Made by hand, in small batches, in a small
              atelier by the harbour.
            </p>
            <a
              data-hero-fade
              href="#collection"
              className="btn-primary group w-fit border-ivory/60 text-ivory"
            >
              <span>Explore the collection</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between border-t border-ivory/15 pt-5 md:mt-16">
          <div className="flex items-center gap-4">
            <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
              <span
                data-scroll-dot
                className="absolute left-0 top-0 block h-5 w-px bg-ivory"
              />
            </span>
            <span className="text-[9px] leading-[1.9] tracking-[0.28em] uppercase text-ivory/50">
              Scroll
              <br />
              to taste
            </span>
          </div>

          <p
            data-hero-fade
            className="hidden text-[9px] tracking-[0.3em] uppercase text-ivory/40 md:block"
          >
            Wheat · Butter · Sugar · Love
          </p>

          <p
            data-hero-fade
            className="text-right text-[9px] leading-[1.9] tracking-[0.28em] uppercase text-ivory/50"
          >
            Vol. I
            <br />
            The butter issue
          </p>
        </div>
      </div>

      <div
        className="vertical-rl absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[9px] tracking-[0.38em] uppercase text-ivory/35 lg:block"
        aria-hidden="true"
      >
        Made by hand — Maison Beurre — Est. 2016
      </div>
    </section>
  );
}
