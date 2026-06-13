'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// four columns, each scrolling at a different parallax speed
const COLUMNS: { images: string[]; speed: number; offset: string }[] = [
  {
    images: ['/images/gallery-1.png', '/images/barista.png', '/images/beans.png'],
    speed: 200,
    offset: '-45%',
  },
  {
    images: ['/images/gallery-4.png', '/images/latte-art.png', '/images/pastry.png'],
    speed: 330,
    offset: '-95%',
  },
  {
    images: ['/images/gallery-gaming.png', '/images/gaming-setup.png', '/images/interior.png'],
    speed: 125,
    offset: '-45%',
  },
  {
    images: ['/images/gallery-3.png', '/images/gaming-room.png', '/images/hero-pour.png'],
    speed: 300,
    offset: '-75%',
  },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.gallery-heading-line', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // parallax: move each column upward by a different amount as the
      // gallery scrolls through the viewport
      const columns = gsap.utils.toArray<HTMLElement>('.gallery-column')
      columns.forEach((column) => {
        const speed = Number(column.dataset.speed) || 150
        gsap.fromTo(
          column,
          { y: 0 },
          {
            y: () => window.innerHeight * (speed / 100),
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-background"
      aria-label="Cafe gallery"
    >
      {/* heading */}
      <div className="px-4 pt-24 pb-12 md:px-8 md:pt-40 md:pb-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading uppercase leading-[0.9] text-foreground">
            <span className="block overflow-hidden text-[clamp(3rem,9vw,8rem)]">
              <span className="gallery-heading-line block">Inside</span>
            </span>
            <span className="block overflow-hidden pl-[6vw] text-[clamp(3rem,9vw,8rem)]">
              <span className="gallery-heading-line text-stroke-caramel block">
                Amigo
              </span>
            </span>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
            A few frames from a typical day &mdash; the bar, the pour, the
            screens, the people. Scroll through the room we built for you.
          </p>
        </div>
      </div>

      {/* parallax columns */}
      <div
        ref={galleryRef}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-card p-[2vw]"
      >
        {COLUMNS.map((column, ci) => (
          <div
            key={ci}
            data-speed={column.speed}
            className="gallery-column relative flex h-full w-1/4 min-w-[180px] flex-col gap-[2vw]"
            style={{ top: column.offset }}
          >
            {column.images.map((src, i) => (
              <figure
                key={i}
                className="group relative h-full w-full overflow-hidden"
              >
                <Image
                  src={src || '/placeholder.svg'}
                  alt="Inside Amigo cafe and PlayStation lounge"
                  fill
                  sizes="25vw"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-espresso/10 transition-colors duration-500 group-hover:bg-transparent"
                  aria-hidden="true"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
