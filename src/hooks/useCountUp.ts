import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  isVisible?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  isVisible = false,
  decimals = 0,
  prefix = '',
  suffix = ''
}: UseCountUpOptions): string {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || hasStartedRef.current) return;

    hasStartedRef.current = true;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = end * progress;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formattedCount = count.toFixed(decimals);
  const displayCount = decimals === 0
    ? Math.floor(count).toLocaleString()
    : parseFloat(formattedCount).toLocaleString();

  return `${prefix}${displayCount}${suffix}`;
}
