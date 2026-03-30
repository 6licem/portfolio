import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (rootMargin = '0px 0px -50px 0px') => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Initialize to true on mobile so it's already "loaded" and doesn't fade in
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    // Check if it's already visible due to mobile screen
    if (isVisible) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0, // 0 threshold means it triggers as soon as 1 pixel enters the rootMargin
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return { ref, isVisible };
};
