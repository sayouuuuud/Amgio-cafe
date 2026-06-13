'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO =
  'A cafe is not a place. It is a feeling. The smell of fresh roast, the hum of conversation, a stranger who becomes an amigo.'

export function Vibe() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // word-by-word color reveal on scrub
      gsap.to('.vibe-word', {
        color: 'var(--cream)',
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vibe-manifesto',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 1,
        },
      })

      // parallax drift for the two images at different speeds
      gsap.to('.vibe-img-1', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to('.vibe-img-2', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-32 md:px-8 md:py-48"
    >
      {/* floating parallax images */}
      <div className="vibe-img-1 absolute top-12 right-[4%] hidden aspect-[3/4] w-56 overflow-hidden md:block lg:w-72">
        <Image
          src="/images/interior.png"
          alt="Warm cafe interior with friends sharing coffee at golden hour"
          fill
          sizes="288px"
          className="object-cover"
        />
      </div>
      <div className="vibe-img-2 absolute bottom-12 left-[4%] hidden aspect-[3/4] w-44 overflow-hidden md:block lg:w-60">
        <Image
          src="/images/pastry.png"
          alt="Fresh croissants beside a cup of coffee"
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>

      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-primary">
        (Our Philosophy)
      </p>

      <p className="vibe-manifesto mx-auto max-w-4xl text-center font-heading text-3xl uppercase leading-tight md:text-6xl text-balance">
        {MANIFESTO.split(' ').map((word, i) => (
          <span
            key={i}
            className="vibe-word inline-block text-secondary"
          >
            {word}
            {'\u00A0'}
          </span>
        ))}
      </p>
    </section>
  )
}
