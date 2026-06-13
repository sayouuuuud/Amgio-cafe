'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type MenuItem = {
  name: string
  desc: string
  price: string
  image: string
  tags?: string[]
}

type MenuGroup = {
  category: string
  caption: string
  items: MenuItem[]
}

const MENU: MenuGroup[] = [
  {
    category: 'Espresso',
    caption: 'Pulled to order',
    items: [
      {
        name: 'Cafe de Olla',
        desc: 'Cinnamon, piloncillo, slow-brewed',
        price: '4.5',
        image: '/images/hero-pour.png',
        tags: ['Signature'],
      },
      {
        name: 'Cortado Amigo',
        desc: 'Double shot, silky oat milk',
        price: '5.0',
        image: '/images/latte-art.png',
      },
      {
        name: 'Horchata Latte',
        desc: 'House horchata, espresso, ice',
        price: '6.0',
        image: '/images/beans.png',
        tags: ['Iced'],
      },
    ],
  },
  {
    category: 'Slow Bar',
    caption: 'Single origin, hand-poured',
    items: [
      {
        name: 'V60 Pour Over',
        desc: 'Rotating single-origin, 320ml',
        price: '5.5',
        image: '/images/barista.png',
      },
      {
        name: 'Cold Brew Tonic',
        desc: '18hr steep, citrus, tonic',
        price: '6.5',
        image: '/images/interior.png',
        tags: ['Iced'],
      },
    ],
  },
  {
    category: 'Pan Dulce',
    caption: 'Baked each morning',
    items: [
      {
        name: 'Concha & Cafe',
        desc: 'Fresh pan dulce, drip pairing',
        price: '7.5',
        image: '/images/pastry.png',
        tags: ['Pairing'],
      },
      {
        name: 'Butter Croissant',
        desc: 'Laminated 72 hours, sea salt',
        price: '4.0',
        image: '/images/gallery-3.png',
      },
    ],
  },
]

export function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useGSAP(
    () => {
      gsap.from('.menu-heading-line', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      const groups = gsap.utils.toArray<HTMLElement>('.menu-group')
      groups.forEach((group) => {
        gsap.from(group.querySelectorAll('.menu-row'), {
          autoAlpha: 0,
          y: 50,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 82%',
          },
        })
      })

      // floating image preview follows cursor (desktop only)
      if (window.matchMedia('(pointer: fine)').matches) {
        const xTo = gsap.quickTo(previewRef.current, 'x', {
          duration: 0.5,
          ease: 'power3',
        })
        const yTo = gsap.quickTo(previewRef.current, 'y', {
          duration: 0.5,
          ease: 'power3',
        })

        const move = (e: MouseEvent) => {
          xTo(e.clientX)
          yTo(e.clientY)
        }
        window.addEventListener('mousemove', move, { passive: true })
        return () => window.removeEventListener('mousemove', move)
      }
    },
    { scope: sectionRef },
  )

  const allImages = MENU.flatMap((g) => g.items.map((i) => i.image))

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative px-4 py-24 md:px-8 md:py-40"
    >
      <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <h2 className="font-heading uppercase leading-[0.9] text-foreground">
          <span className="block overflow-hidden text-[clamp(3rem,9vw,8rem)]">
            <span className="menu-heading-line block">The Menu,</span>
          </span>
          <span className="block overflow-hidden pl-[6vw] text-[clamp(3rem,9vw,8rem)]">
            <span className="menu-heading-line text-stroke-cream block">
              Amigo Style
            </span>
          </span>
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Roasted in-house, poured with intention. Prices in USD &mdash; ask
          your barista about today&apos;s rotating single origin.
        </p>
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {MENU.map((group) => (
          <div
            key={group.category}
            className="menu-group grid gap-6 md:grid-cols-12 md:gap-12"
          >
            {/* sticky category label */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-24">
                <h3 className="font-heading text-3xl uppercase text-primary md:text-4xl">
                  {group.category}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {group.caption}
                </p>
              </div>
            </div>

            {/* items */}
            <ul className="border-t border-border md:col-span-8 lg:col-span-9">
              {group.items.map((item) => (
                <li key={item.name} className="menu-row border-b border-border">
                  <div
                    className="group flex items-center gap-5 py-6 md:py-8"
                    onMouseEnter={() => setActiveImage(item.image)}
                    onMouseLeave={() => setActiveImage(null)}
                  >
                    {/* inline thumbnail */}
                    <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-sm md:block">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                      <span className="flex items-center gap-3">
                        <span className="font-heading text-2xl uppercase text-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary md:text-4xl">
                          {item.name}
                        </span>
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="border border-primary/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                      <span
                        className="hidden flex-1 translate-y-1 border-b border-dashed border-border md:block"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted-foreground md:order-last md:hidden">
                        {item.desc}
                      </span>
                    </div>

                    <span className="shrink-0 font-mono text-lg text-primary tabular-nums md:text-2xl">
                      ${item.price}
                    </span>
                  </div>
                  <p className="hidden pb-6 pl-[5.25rem] text-sm text-muted-foreground md:block">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* floating cursor-follow preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-56 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm md:block"
        style={{
          opacity: activeImage !== null ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      >
        {allImages.map((src) => (
          <Image
            key={src}
            src={src || '/placeholder.svg'}
            alt=""
            fill
            sizes="176px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: activeImage === src ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  )
}
