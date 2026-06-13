'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.footer-letter', {
        yPercent: 110,
        stagger: 0.06,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.footer-giant',
          start: 'top 85%',
        },
      })

      gsap.from('.footer-info', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
        },
      })
    },
    { scope: footerRef },
  )

  return (
    <footer
      id="visit"
      ref={footerRef}
      className="relative overflow-hidden border-t border-border bg-primary px-4 pt-20 pb-4 md:px-8 md:pt-32"
    >
      <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-3">
        <div className="footer-info flex flex-col gap-2">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
            Find Us
          </h3>
          <p className="text-lg leading-relaxed text-primary-foreground">
            14 Roastery Lane
            <br />
            Old Town District
          </p>
        </div>
        <div className="footer-info flex flex-col gap-2">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
            Hours
          </h3>
          <p className="text-lg leading-relaxed text-primary-foreground">
            Mon &ndash; Fri: 7am &ndash; 8pm
            <br />
            Weekends: 8am &ndash; 10pm
          </p>
        </div>
        <div className="footer-info flex flex-col gap-2">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
            Say Hola
          </h3>
          <a
            href="mailto:hola@amigocafe.com"
            className="text-lg text-primary-foreground underline-offset-4 transition-all hover:underline"
          >
            hola@amigocafe.com
          </a>
          <div className="mt-2 flex gap-4 font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
            <a href="#" className="transition-colors hover:text-primary-foreground">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-primary-foreground">
              TikTok
            </a>
          </div>
        </div>
      </div>

      <p
        className="footer-giant overflow-hidden text-center font-heading text-[clamp(4rem,18.5vw,22rem)] uppercase leading-[0.8] text-primary-foreground"
        aria-hidden="true"
      >
        {'AMIGO'.split('').map((l, i) => (
          <span key={i} className="footer-letter inline-block">
            {l}
          </span>
        ))}
      </p>

      <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/20 pt-4 font-mono text-[10px] uppercase tracking-widest text-primary-foreground/60 md:flex-row">
        <p>&copy; 2026 Amigo Cafe. Roasted with soul.</p>
        <p>Every cup is a story.</p>
      </div>
    </footer>
  )
}
