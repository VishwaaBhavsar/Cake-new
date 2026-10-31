"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ingredients } from "@/lib/data";

const stats = [
  { value: "2016", label: "Established" },
  { value: "04:00", label: "First bake" },
  { value: "72h", label: "Per cake" },
  { value: "100%", label: "Cultured butter" },
];

export default function Craft() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-craft-fade]", {
        y: 36,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 72%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-craft-media]").forEach((media) => {
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { trigger: media, start: "top 88%" },
          },
        );

        const inner = media.querySelector("[data-craft-parallax]");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from("[data-craft-row]", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-craft-list]",
          start: "top 82%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="craft"
      className="relative overflow-hidden bg-paper py-24 text-cocoa md:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex items-center justify-between border-t border-cocoa/15 pt-5">
          <p data-craft-fade className="eyebrow text-cocoa/55">
            IV — Our Craft
          </p>
          <p
            data-craft-fade
            className="text-[9px] tracking-[0.28em] uppercase text-cocoa/40"
          >
            The atelier / Bredgade 24
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-end gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <h2
            data-craft-fade
            className="display text-[clamp(3rem,7vw,7.4rem)] md:col-span-7"
          >
            Slow hands,
            <br />
            <span className="serif-italic text-rose">warm butter.</span>
          </h2>

          <div className="md:col-span-4 md:col-start-9">
            <p
              data-craft-fade
              className="max-w-[24rem] text-[13px] leading-[1.85] text-cocoa/65"
            >
              Everything begins at four in the morning. The butter is already
              soft, the fruit still cold from the market. By seven the first
              cakes are in the oven, and the atelier smells the way it should.
            </p>
            <p
              data-craft-fade
              className="mt-5 text-[9px] tracking-[0.24em] uppercase text-cocoa/40"
            >
              No mixes. No shortcuts. No cake before its time.
            </p>
          </div>
        </div>

        {/* Film band */}
        <div
          data-craft-media
          className="relative mt-14 aspect-[4/5] overflow-hidden bg-chocolate md:mt-20 md:aspect-[21/9]"
        >
          <div data-craft-parallax className="absolute inset-[-8%]">
            <video
              className="h-full w-full scale-105 object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/mixkit-50018-thumb.jpg"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/assets/mixkit-50018.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,14,9,0.28)_0%,rgba(26,14,9,0.05)_40%,rgba(26,14,9,0.62)_100%)]" />

          <div className="absolute inset-x-5 bottom-5 flex flex-col gap-5 text-ivory md:inset-x-8 md:bottom-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-ivory/55">No. 04 — The icing room</p>
              <p className="mt-3 max-w-[26rem] font-display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.05]">
                Every cake is built twice. Once in the head,
                <span className="serif-italic text-blush"> once by hand.</span>
              </p>
            </div>
            <p className="max-w-[15rem] text-[9px] leading-[1.9] tracking-[0.24em] uppercase text-ivory/50">
              Filmed at the atelier
              <br />
              06:12, a Tuesday
            </p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:self-start md:pr-8 lg:sticky lg:top-28">
            <p data-craft-fade className="eyebrow text-cocoa/50">
              The ingredients
            </p>
            <h3
              data-craft-fade
              className="display mt-6 text-[clamp(2.6rem,4.4vw,4.4rem)]"
            >
              Nothing
              <br />
              <span className="serif-italic">hiding.</span>
            </h3>
            <p
              data-craft-fade
              className="mt-6 max-w-[23rem] text-[13px] leading-[1.85] text-cocoa/65"
            >
              A cake is only as good as what goes into it, so we keep the list
              short and the sourcing close. If we cannot explain an ingredient,
              it does not go in the bowl.
            </p>

            <div data-craft-list className="mt-10 border-t border-cocoa/15">
              {ingredients.map((item) => (
                <div
                  key={item.index}
                  data-craft-row
                  className="group grid grid-cols-[2.2rem_1fr] items-baseline gap-3 border-b border-cocoa/15 py-5"
                >
                  <span className="text-[9px] tracking-[0.22em] text-gold">
                    {item.index}
                  </span>
                  <div>
                    <p className="font-display text-2xl leading-none transition-colors duration-500 group-hover:text-rose">
                      {item.name}
                    </p>
                    <p className="mt-2 max-w-[20rem] text-[12px] leading-[1.75] text-cocoa/55">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              data-craft-fade
              className="mt-6 text-[9px] leading-[1.9] tracking-[0.22em] uppercase text-cocoa/40"
            >
              Flour from Bornholm · Butter from Jutland
              <br />
              Fruit from Torvehallerne, every morning
            </p>
          </div>

          <div className="md:col-span-7">
            <div
              data-craft-media
              className="relative aspect-[4/5] overflow-hidden bg-cream md:aspect-[5/6]"
            >
              <div data-craft-parallax className="absolute inset-[-8%]">
                <Image
                  src="/assets/craft-frosting.jpg"
                  alt="Two hands smoothing ivory buttercream across a cake"
                  fill
                  sizes="(max-width: 768px) 92vw, 55vw"
                  className="grade-warm object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(26,14,9,0.35)_100%)]" />
              <p className="absolute bottom-5 left-5 text-[9px] tracking-[0.26em] uppercase text-ivory/80">
                Finishing / 07:40
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-8">
              <div
                data-craft-media
                className="relative aspect-[4/5] overflow-hidden bg-cream"
              >
                <div data-craft-parallax className="absolute inset-[-8%]">
                  <Image
                    src="/assets/craft-chef.jpg"
                    alt="A pastry chef laminating dough in the atelier kitchen"
                    fill
                    sizes="(max-width: 768px) 46vw, 28vw"
                    className="grade-warm object-cover"
                  />
                </div>
              </div>

              <div
                data-craft-media
                className="relative aspect-[4/5] overflow-hidden bg-cream"
              >
                <div data-craft-parallax className="absolute inset-[-8%]">
                  <Image
                    src="/assets/ingredient-cocoa.jpg"
                    alt="A spoon of dark cocoa powder on a marble surface"
                    fill
                    sizes="(max-width: 768px) 46vw, 28vw"
                    className="grade-warm object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-cocoa/15 pt-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl leading-none md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[8.5px] tracking-[0.24em] uppercase text-cocoa/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <figure className="mt-24 border-t border-cocoa/15 pt-14 md:mt-32 md:pt-20">
          <blockquote className="mx-auto max-w-[62rem] text-center">
            <p className="display text-[clamp(2rem,4.2vw,4.2rem)] leading-[1.05]">
              “Butter is not an ingredient.
              <br />
              <span className="serif-italic text-rose">
                It is a point of view.
              </span>
              ”
            </p>
            <figcaption className="mt-8 flex flex-col items-center gap-2">
              <span className="h-8 w-px bg-cocoa/20" aria-hidden="true" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-cocoa/50">
                Ines Lund — Chef Patissière
              </span>
            </figcaption>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
