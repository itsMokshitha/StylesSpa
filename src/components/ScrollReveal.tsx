import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  direction?: 'up' | 'none';
  as?: 'div' | 'section' | 'article' | 'header';
  threshold?: number;
  rootMargin?: string;
}

/**
 * Reusable hook to detect when an element scrolls into view.
 * Respects prefers-reduced-motion and gracefully falls back to visible.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (options?.triggerOnce !== false) {
              observer.unobserve(entry.target);
            }
          } else if (options?.triggerOnce === false) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.08,
        rootMargin: options?.rootMargin ?? '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { ref: elementRef, isVisible };
}

/**
 * Component that adds subtle fade-in and slide-up entrance animation
 * when the element scrolls into the user's viewport.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Component = 'div',
  threshold = 0.08,
  rootMargin = '0px 0px -30px 0px',
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin, triggerOnce: true });

  const baseStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  const animationClasses =
    direction === 'up'
      ? `reveal-init ${isVisible ? 'reveal-visible' : ''}`
      : `reveal-fade-init ${isVisible ? 'reveal-fade-visible' : ''}`;

  return (
    <Component
      ref={ref as any}
      style={baseStyle}
      className={`${animationClasses} ${className}`}
    >
      {children}
    </Component>
  );
};
