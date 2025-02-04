import { useRef } from 'react'

// Header height plus main content margin in pixels
const HEADER_HEIGHT = 80 + 32

export function useScrollToTop() {
  const ref = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: (ref.current?.offsetTop ?? 0) - HEADER_HEIGHT,
      behavior: 'instant',
    })
  }

  return { ref, scrollToTop }
}
