'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Espresso', 'Amigos', 'Cortado', 'Buenos Dias', 'Cold Brew', 'Hola']

export function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // infinite drift + scroll-velocity boost
      const track = wrapRef.current?.querySelector('.marquee-track')
      if (!track) return

      gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })

      gsap.fromTo(
        wrapRef.current,
        { rotate: -2.5 },
        {
          rotate: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      )
    },
    { scope: wrapRef },
  )

  const items = [...WORDS, ...WORDS]

  return (
    <div
      ref={wrapRef}
      className="relative z-20 -my-6 overflow-hidden border-y border-border bg-primary py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-heading text-2xl uppercase tracking-wide text-primary-foreground md:text-4xl"
          >
            {word}
            <span className="inline-block h-2 w-2 rotate-45 bg-primary-foreground" />
          </span>
        ))}
      </div>
    </div>
  )
}
