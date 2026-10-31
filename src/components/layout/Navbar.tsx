"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";

function Monogram({ light }: { light: boolean }) {
  return (
    <a
      href="#top"
      className="group flex items-center gap-3"
      aria-label="Maison Beurre — back to top"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
          light ? "border-ivory/40" : "border-cocoa/30"
        }`}
      >
        <span className="font-display text-[15px] leading-none">MB</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] tracking-[0.02em]">
          Maison Beurre
        </span>
        <span
          className={`mt-1 text-[8px] tracking-[0.34em] uppercase transition-colors duration-500 ${
            light ? "text-ivory/55" : "text-cocoa/50"
          }`}
        >
          Patisserie d&apos;art
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      if (progress.current) {
        progress.current.style.transform = `scaleX(${value})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const light = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-700 ${
          scrolled
            ? "border-b border-cocoa/10 bg-ivory/92 text-cocoa backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-ivory"
        }`}
      >
        <span
          ref={progress}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold"
          aria-hidden="true"
        />
        <div className="mx-auto grid h-[76px] w-full max-w-[1680px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-3 md:px-10">
          <div className="flex items-center">
            <Monogram light={light} />
          </div>

          <nav
            className="hidden items-center justify-center gap-9 md:flex"
            aria-label="Primary"
          >
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[10px] font-normal tracking-[0.24em] uppercase"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <a
              href="#contact"
              className="hidden items-center gap-2 text-[10px] tracking-[0.24em] uppercase md:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              Order a cake
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-chocolate px-6 pb-8 pt-28 text-ivory md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-ivory/12 py-5"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.18 + index * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="font-display text-4xl leading-none">
                    {link.label}
                  </span>
                  <span className="eyebrow text-ivory/40">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@maisonbeurre.example"
                className="serif-italic text-2xl text-ivory/80"
              >
                hello@maisonbeurre.example
              </a>
              <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-ivory/45">
                <span>Copenhagen</span>
                <span>Est. 2016</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
