import { useEffect, useRef, useCallback, useState } from 'react';

interface UseSmoothAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

export const useSmoothAnimations = (options: UseSmoothAnimationsOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    delay = 0,
    duration = 200 // Reduced from 300ms
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number | null>(null);

  // Smooth animation function with reduced motion
  const animate = useCallback((element: HTMLElement, from: number, to: number, duration: number) => {
    const start = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use gentler easing function for reduced motion
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = from + (to - from) * easeOutQuad;
      
      element.style.transform = `translateY(${currentValue}px)`;
      element.style.opacity = String(1 - (progress * 0.2)); // Reduced opacity change
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
        setIsAnimating(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  }, []);

  // Intersection Observer for triggering animations with reduced motion
  const setupObserver = useCallback(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            // Add delay if specified
            setTimeout(() => {
              if (elementRef.current) {
                setIsAnimating(true);
                animate(elementRef.current, 15, 0, duration); // Reduced movement
              }
            }, delay);
            
            // Stop observing after animation
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(elementRef.current);
  }, [threshold, rootMargin, delay, duration, animate, isVisible]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    setupObserver();
    return cleanup;
  }, [setupObserver, cleanup]);

  // Smooth scroll to element with reduced motion
  const scrollToElement = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: 'auto', // Use auto instead of smooth to prevent shaking
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  // Add smooth loading class with reduced motion
  const addSmoothClass = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.classList.add('smooth-load');
      elementRef.current.classList.add('animate-ready');
      // Reduce animation intensity
      elementRef.current.style.animationDuration = '0.2s';
      elementRef.current.style.transitionDuration = '0.15s';
    }
  }, []);

  // Remove smooth loading class
  const removeSmoothClass = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.classList.remove('smooth-load');
      elementRef.current.classList.remove('animate-ready');
    }
  }, []);

  return {
    elementRef,
    isVisible,
    isAnimating,
    scrollToElement,
    addSmoothClass,
    removeSmoothClass,
    cleanup
  };
};

// Hook for optimizing list rendering with reduced motion
export const useOptimizedList = <T>(items: T[], batchSize: number = 6) => { // Reduced batch size
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [currentIndex, setCurrentIndex] = useState(batchSize);

  useEffect(() => {
    setVisibleItems(items.slice(0, batchSize));
    setCurrentIndex(batchSize);
  }, [items, batchSize]);

  const loadMore = useCallback(() => {
    if (currentIndex < items.length) {
      const nextBatch = items.slice(currentIndex, currentIndex + batchSize);
      setVisibleItems(prev => [...prev, ...nextBatch]);
      setCurrentIndex(prev => prev + batchSize);
    }
  }, [items, currentIndex, batchSize]);

  const hasMore = currentIndex < items.length;

  return {
    visibleItems,
    loadMore,
    hasMore,
    totalItems: items.length
  };
};

// Hook for debounced state updates with reduced frequency
export const useDebouncedState = <T>(initialValue: T, delay: number = 200) => { // Reduced delay
  const [value, setValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setDebouncedValue = useCallback((newValue: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setValue(newValue);
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [value, setDebouncedValue] as const;
}; 