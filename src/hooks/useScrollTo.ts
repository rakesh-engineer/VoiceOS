'use client';

import { useCallback } from 'react';

/**
 * Custom hook providing a smooth scrolling helper for elements by ID with a custom offset.
 */
export function useScrollTo() {
  const scrollTo = useCallback((id: string, offset = 80) => {
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return scrollTo;
}
