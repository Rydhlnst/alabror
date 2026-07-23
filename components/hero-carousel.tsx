"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselSlide {
  image: string
  title: string
  description: string | { [key: string]: unknown }
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

function toString(val: string | { [key: string]: unknown }): string {
  if (typeof val === 'string') return val
  return ''
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: { slides: CarouselSlide[]; autoPlayInterval?: number }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval)
    return () => clearInterval(timer)
  }, [next, autoPlayInterval])

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-in-out",
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Content Overlay - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="site-shell py-8 sm:py-12">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-heading tracking-tight">
              {slides[current].title}
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2">
              {toString(slides[current].description)}
            </p>
            {slides[current].primaryCta && (
              <div className="flex gap-3 pt-2">
                <Link
                  href={slides[current].primaryCta!.href}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {slides[current].primaryCta!.label}
                </Link>
                {slides[current].secondaryCta && (
                  <Link
                    href={slides[current].secondaryCta!.href}
                    className="inline-flex items-center gap-2 border border-white/50 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    {slides[current].secondaryCta!.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        aria-label="Sebelumnya"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        aria-label="Selanjutnya"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "transition-all duration-300",
              index === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
