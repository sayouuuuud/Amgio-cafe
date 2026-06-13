import { Hero } from '@/components/amigo/hero'
import { Marquee } from '@/components/amigo/marquee'
import { Journey } from '@/components/amigo/journey'
import { Vibe } from '@/components/amigo/vibe'
import { Gallery } from '@/components/amigo/gallery'
import { Menu } from '@/components/amigo/menu'
import { Playstation } from '@/components/amigo/playstation'
import { Location } from '@/components/amigo/location'
import { Footer } from '@/components/amigo/footer'
import { ScrollRefresher } from '@/components/amigo/scroll-refresher'

export default function Page() {
  return (
    <main>
      <ScrollRefresher />
      <Hero />
      <Marquee />
      <Journey />
      <Vibe />
      <Gallery />
      <Menu />
      <Playstation />
      <Location />
      <Footer />
    </main>
  )
}
