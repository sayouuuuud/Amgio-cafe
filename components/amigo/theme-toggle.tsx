'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  function toggle() {
    setTheme(isDark ? 'light' : 'dark')
    // Pinned/scrubbed sections measure layout in px — recalc after the
    // theme swap settles so ScrollTrigger positions stay accurate.
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? 'light' : 'dark'} mode`
          : 'Toggle color theme'
      }
      className="grid h-10 w-10 place-items-center border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {mounted && !isDark ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
