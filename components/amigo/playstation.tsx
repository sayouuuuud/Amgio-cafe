'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const CONSOLES = [
  {
    name: 'PS5 Booths',
    desc: 'Private booths with 4K screens and the latest PlayStation 5 — solo grind or squad up.',
    detail: '6 Stations',
  },
  {
    name: 'Co-op Couches',
    desc: 'Big-screen leather lounges built for FIFA nights, fighting games, and friendly trash talk.',
    detail: '4 Lounges',
  },
  {
    name: 'Tournaments',
    desc: 'Weekly brackets with a leaderboard, prizes, and a free Cafe de Olla for the champion.',
    detail: 'Every Thursday',
  },
]

const RATES = [
  { label: 'Solo / hr', price: '60', note: 'One controller, one player' },
  { label: 'Duo / hr', price: '100', note: 'Two controllers, split a couch' },
  { label: 'Squad / hr', price: '180', note: 'Up to four players, full booth' },
]

export function Playstation() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.ps-heading-line', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from('.ps-hero-img', {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.ps-hero-img', start: 'top 85%' },
      })

      gsap.from('.ps-card', {
        autoAlpha: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ps-cards', start: 'top 80%' },
      })

      gsap.from('.ps-rate', {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ps-rates', start: 'top 85%' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="playstation"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 md:px-8 md:py-40"
      aria-label="PlayStation gaming lounge"
    >
      <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            (Press Start)
          </p>
          <h2 className="font-heading uppercase leading-[0.9] text-foreground">
            <span className="block overflow-hidden text-[clamp(3rem,9vw,8rem)]">
              <span className="ps-heading-line block">Game</span>
            </span>
            <span className="block overflow-hidden pl-[6vw] text-[clamp(3rem,9vw,8rem)]">
              <span className="ps-heading-line text-stroke-caramel block">On</span>
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Amigo isn&apos;t just coffee. It&apos;s a PlayStation lounge built for
          late nights, long sessions, and bragging rights. Pull up, plug in.
        </p>
      </div>

      {/* hero image */}
      <div className="ps-hero-img relative mb-6 aspect-[16/9] w-full overflow-hidden md:mb-6">
        <Image
          src="/images/gaming-room.png"
          alt="Stylish PlayStation gaming booth inside the cafe with ambient lighting"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.25em] text-cream">
          The Lounge
        </span>
      </div>

      {/* feature cards */}
      <div className="ps-cards grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {CONSOLES.map((c) => (
          <article
            key={c.name}
            className="ps-card flex flex-col gap-4 border border-border bg-card p-6 md:p-8"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              {c.detail}
            </span>
            <h3 className="font-heading text-2xl uppercase leading-none text-card-foreground md:text-3xl">
              {c.name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {c.desc}
            </p>
          </article>
        ))}
      </div>

      {/* rates */}
      <div className="ps-rates mt-16 border-t border-border pt-10">
        <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="inline-block h-px w-10 bg-primary" aria-hidden="true" />
          Play Rates
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {RATES.map((r) => (
            <div
              key={r.label}
              className="ps-rate flex items-end justify-between border-b border-border pb-4"
            >
              <div className="flex flex-col gap-1">
                <span className="font-heading text-lg uppercase text-foreground">
                  {r.label}
                </span>
                <span className="text-xs text-muted-foreground">{r.note}</span>
              </div>
              <span className="font-heading text-3xl text-primary md:text-4xl">
                {r.price}
                <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
