import React, { useEffect, useState, useRef } from 'react';

interface TechTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  triggerOnView?: boolean;
}

const GLYPHS = '01!@#$%^&*░▒▓/\\|[]{}<>+=-_~';

export const TechText: React.FC<TechTextProps> = ({
  text,
  speed = 35,
  delay = 0,
  className = '',
  triggerOnView = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggerOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }

        iteration += 1 / 2;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasStarted, text, speed, delay]);

  return (
    <span ref={elementRef} className={`font-mono ${className}`}>
      {displayText || text.replace(/[^\s]/g, '░')}
    </span>
  );
};
