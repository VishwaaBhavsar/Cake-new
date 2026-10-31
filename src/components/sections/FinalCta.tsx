"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/lib/data";

export default function FinalCta() {
  const section = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-cta-line]", {
        yPercent: 110,
        duration: 1.35,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: section.current, start: "top 72%" },
      });

      gsap.from("[data-cta-fade]", {
        y: 26,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 58%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={section}
      id="contact"
      className="relative overflow-hidden bg-chocolate text-ivory"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(184,147,95,0.18),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1680px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="flex items-center justify-between border-t border-ivory/15 pt-5">
          <p className="eyebrow text-gold/80">V — Commissions</p>
          <p className="text-[9px] tracking-[0.26em] uppercase text-ivory/40">
            Winter 2026 · Four slots remaining
          </p>
        </div>

        <h2 className="display-tight mt-14 text-[clamp(3.1rem,11.4vw,12rem)] uppercase md:mt-20">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-cta-line className="block">
              Made to be
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span
              data-cta-line
              className="serif-italic block normal-case text-blush"
            >
              remembered.
            </span>
          </span>
        </h2>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-ivory/15 pt-8 md:mt-16 md:flex-row md:items-center">
          <a
            data-cta-fade
            href="mailto:hello@maisonbeurre.example?subject=Cake%20commission"
            className="btn-primary group border-ivory/60 text-ivory"
            data-dark="true"
          >
            <span>Order your cake</span>
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          <p
            data-cta-fade
            className="max-w-[24rem] text-[12.5px] leading-[1.85] text-ivory/55 md:text-right"
          >
            Tell us the occasion, the date and how many people you would like
            to make happy. We will reply within one working day with a sketch
            and a plan.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-ivory/15 pt-12 md:mt-28 md:grid-cols-12 md:gap-8">
          <div data-cta-fade className="md:col-span-4">
            <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/35">
              Visit
            </p>
            <p className="mt-4 font-display text-2xl leading-[1.35] text-ivory/85">
              Bredgade 24
              <br />
              1260 København K
              <br />
              Denmark
            </p>
            <p className="mt-4 text-[9px] leading-[1.9] tracking-[0.22em] uppercase text-ivory/40">
              Tue–Sat · 08:00–17:00
              <br />
              Sunday by appointment
            </p>
          </div>

          <div data-cta-fade className="md:col-span-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/35">
              Write
            </p>
            <a
              href="mailto:hello@maisonbeurre.example"
              className="link-line mt-4 text-[13px] text-ivory/85"
            >
              hello@maisonbeurre.example
            </a>
            <a
              href="tel:+4533124488"
              className="mt-3 block text-[13px] text-ivory/60"
            >
              +45 33 12 44 88
            </a>
            <p className="mt-4 text-[9px] leading-[1.9] tracking-[0.22em] uppercase text-ivory/40">
              Press &amp; collaborations
              <br />
              studio@maisonbeurre.example
            </p>
          </div>

          <div data-cta-fade className="md:col-span-2">
            <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/35">
              Follow
            </p>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="link-line mt-4 text-[13px] text-ivory/85"
            >
              Instagram
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-[13px] text-ivory/60"
            >
              Pinterest
            </a>
            <p className="mt-4 text-[9px] tracking-[0.22em] uppercase text-ivory/40">
              @maisonbeurre
            </p>
          </div>

          <div data-cta-fade className="md:col-span-3">
            <p className="text-[9px] tracking-[0.3em] uppercase text-ivory/35">
              The letter
            </p>
            <p className="mt-4 max-w-[18rem] text-[12.5px] leading-[1.8] text-ivory/55">
              Seasonal cakes, atelier openings and the occasional recipe. Once
              a month, never more.
            </p>
            <form
              className="mt-5 flex items-center border-b border-ivory/25 pb-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) return;
                setSent(true);
                setEmail("");
              }}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent text-[12px] tracking-[0.04em] text-ivory placeholder:text-ivory/30 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-3 text-ivory/60 transition-colors duration-300 hover:text-ivory"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
            <p
              className={`mt-3 text-[9px] tracking-[0.2em] uppercase transition-opacity duration-500 ${
                sent ? "text-gold opacity-100" : "text-ivory/0 opacity-0"
              }`}
              aria-live="polite"
            >
              Thank you — you are on the list.
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-ivory/15 pt-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[9px] tracking-[0.26em] uppercase text-ivory/45 transition-colors duration-300 hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#top"
            className="ml-auto flex items-center gap-2 text-[9px] tracking-[0.26em] uppercase text-ivory/45 transition-colors duration-300 hover:text-ivory"
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </nav>

        <div className="relative mt-14 overflow-hidden">
          <p
            className="display select-none whitespace-nowrap text-center text-[17vw] leading-[0.78] tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_rgba(242,235,222,0.16)]"
            aria-hidden="true"
          >
            Maison Beurre
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/12 py-7 text-[8.5px] tracking-[0.22em] uppercase text-ivory/30 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Maison Beurre ApS · CVR 38 12 44 09</p>
          <div className="flex flex-wrap gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Made in Copenhagen</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
