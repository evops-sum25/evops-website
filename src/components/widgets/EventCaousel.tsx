import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TouchEvent, useRef, useState } from 'react'

export default function EventCarousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const scrollTo = (idx: number) => {
    setCurrent(idx)
    if (scrollRef.current) {
      const child = scrollRef.current.children[idx] as HTMLElement
      child.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta < 0 && current < images.length - 1) scrollTo(current + 1)
      if (delta > 0 && current > 0) scrollTo(current - 1)
    }
    touchStartX.current = null
  }

  return (
    <div className="relative w-full">
      <button
        className="btn btn-circle btn-sm absolute top-1/2 left-2 z-10 hidden md:flex"
        style={{ transform: 'translateY(-50%)' }}
        onClick={() => scrollTo(Math.max(0, current - 1))}
        disabled={current === 0}
        aria-label="Назад"
      >
        <ChevronLeft />
      </button>
      <button
        className="btn btn-circle btn-sm absolute top-1/2 right-2 z-10 hidden md:flex"
        style={{ transform: 'translateY(-50%)' }}
        onClick={() => scrollTo(Math.min(images.length - 1, current + 1))}
        disabled={current === images.length - 1}
        aria-label="Вперёд"
      >
        <ChevronRight />
      </button>
      <div
        ref={scrollRef}
        className="carousel flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((link, i) => (
          <div
            key={i}
            className="carousel-item relative w-full flex-shrink-0 snap-center justify-center"
            style={{ scrollSnapAlign: 'center' }}
          >
            <img
              src={link}
              alt="Event thumbnail"
              className="z-10 h-auto max-h-[90vh] min-h-[35vh] w-auto max-w-[90vw] min-w-[35vw] rounded-md md:max-h-[80vh] md:max-w-[80vw]"
            />
            <img
              src={link}
              alt="Event thumbnail"
              className="absolute size-full object-fill blur-3xl"
            />
          </div>
        ))}
      </div>
      <div className="my-2 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`btn btn-xs ${i === current ? 'btn-primary' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Перейти к изображению ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
