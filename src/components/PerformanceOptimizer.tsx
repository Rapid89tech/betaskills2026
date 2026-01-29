import React, { useEffect, useRef, useCallback } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Optimize scroll performance with reduced motion
  const optimizeScroll = useCallback(() => {
    let ticking = false;
    
    const updateScroll = () => {
      // Batch scroll updates with reduced motion
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimize animations with reduced motion
  const optimizeAnimations = useCallback(() => {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in, .animate-pulse-glow, .animate-podcast-float, .animate-wave, .animate-glow, .animate-bounce-slow, .animate-pulse-slow, .animate-gradient-x, .animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-card'
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enable animations with reduced motion
            entry.target.classList.add('animate-ready');
            // Reduce animation intensity
            entry.target.style.animationDuration = '0.3s';
            entry.target.style.transitionDuration = '0.15s';
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    animatedElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Optimize image loading
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    images.forEach((img) => {
      imageObserver.observe(img);
    });

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  // Prevent layout shifts and shaking
  const preventLayoutShifts = useCallback(() => {
    // Reserve space for dynamic content
    const style = document.createElement('style');
    style.textContent = `
      .content-placeholder {
        min-height: 200px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 2s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      .smooth-load {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      
      .smooth-load.loaded {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Prevent shaking */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Stabilize animations */
      .animate-pulse-glow {
        animation: pulseGlow 3s ease-in-out infinite;
      }
      
      .animate-bounce-slow {
        animation: bounceSlow 3s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulseSlow 4s ease-in-out infinite;
      }
      
      /* Reduce hover effects */
      .hover-lift:hover {
        transform: translateY(-2px);
      }
      
      .hover-scale:hover {
        transform: scale(1.02);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const cleanupScroll = optimizeScroll();
    const cleanupAnimations = optimizeAnimations();
    const cleanupImages = optimizeImages();
    const cleanupLayout = preventLayoutShifts();

    // Add smooth loading class to body with reduced motion
    document.body.classList.add('smooth-loading');
    document.body.classList.add('reduced-motion');

    return () => {
      cleanupScroll();
      cleanupAnimations();
      cleanupImages();
      cleanupLayout();
      document.body.classList.remove('smooth-loading');
      document.body.classList.remove('reduced-motion');
    };
  }, [optimizeScroll, optimizeAnimations, optimizeImages, preventLayoutShifts]);

  return <>{children}</>;
};

export default PerformanceOptimizer; 