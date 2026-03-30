import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (rootMargin = '0px 0px -50px 0px') => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
