import React, { useEffect, useRef, useState } from 'react';

function HeroSummaryLoop({ text }) {
  const [isVisible, setIsVisible] = useState(false);
  const summaryRef = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    const element = summaryRef.current;
    if (!element) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.45 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={summaryRef} className="hero-summary-line" aria-label={text}>
      {words.map((word, wordIndex) => (
        <span className="hero-summary-word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((char, charIndex) => {
            const charIndexGlobal = words.slice(0, wordIndex).reduce((sum, item) => sum + item.length, 0) + charIndex + wordIndex;
            return (
              <span
                key={`${word}-${char}-${charIndex}`}
                className={`hero-summary-char ${isVisible ? 'is-visible' : ''}`}
                style={{ '--char-index': charIndexGlobal }}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? <span className="hero-summary-space" aria-hidden="true"> </span> : null}
        </span>
      ))}
    </span>
  );
}

export default HeroSummaryLoop;
