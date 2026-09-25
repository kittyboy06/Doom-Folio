import { useEffect, useRef, useState } from 'react';

interface UseCanvasVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useCanvasVisibility(options: UseCanvasVisibilityOptions = {}) {
  const { threshold = 0.05, rootMargin = '100px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { containerRef, isVisible };
}
