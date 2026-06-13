'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    number: '01',
    title: 'The Bean',
    body: 'Single-origin beans, hand-picked at high altitude. We roast in small batches every morning so the first cup of the day smells like the farm it came from.',
    image: '/images/beans.png',
    alt: 'Roasted coffee beans glistening under warm light',
  },
  {
    number: '02',
    title: 'The Craft',
    body: 'Nine grams of pressure, twenty-five seconds of patience. Our baristas treat every shot like a signature — dialed in, tasted, and pulled with intention.',
    image: '/images/barista.png',
    alt: "Barista's hands tamping espresso grounds in a portafilter",
  },
  {
    number: '03',
    title: 'The Play',
    body: 'When the cup is empty, the games begin. Grab a controller, pick your match, and settle into our PlayStation lounge — where the only thing more intense than the espresso is the rivalry.',
    image: '/images/gaming-setup.png',
    alt: 'Two friends playing PlayStation on a couch in a warmly lit cafe lounge',
  },
]

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.journey-panel')

      const tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + (sectionRef.current?.offsetWidth ?? 0) * 2,
        },
      })

      // per-panel inner parallax + reveals tied to the horizontal tween
      panels.forEach((panel) => {
        const img = panel.querySelector('.journey-img')
        const title = panel.querySelector('.journey-title')
        const num = panel.querySelector('.journey-num')

        gsap.fromTo(
          img,
          { scale: 1.3, xPercent: 8 },
          {
            scale: 1,
            xPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
        gsap.from(title, {
          yPercent: 100,
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 60%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(num, {
          xPercent: -40,
          autoAlpha: 0,
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative flex h-svh w-full overflow-hidden bg-background"
      aria-label="From bean to cup journey"
    >
      {CHAPTERS.map((chapter) => (
        <article
          key={chapter.number}
          className="journey-panel relative flex h-full w-screen shrink-0 items-center px-6 md:px-16"
        >
          {/* oversized chapter number behind */}
          <span
            className="journey-num pointer-events-none absolute top-8 left-4 font-heading text-[clamp(8rem,28vw,24rem)] leading-none text-stroke-caramel opacity-40 md:left-8"
            aria-hidden="true"
          >
            {chapter.number}
          </span>

          <div className="relative z-10 grid w-full items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[4/5] max-h-[62vh] w-full overflow-hidden">
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="journey-img object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="overflow-hidden font-heading text-5xl uppercase leading-none text-foreground md:text-8xl">
                <span className="journey-title block">{chapter.title}</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
                {chapter.body}
              </p>
              <span
                className="inline-block h-px w-24 bg-primary"
                aria-hidden="true"
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
