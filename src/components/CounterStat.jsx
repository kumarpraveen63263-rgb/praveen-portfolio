import React, { useEffect, useRef, useState } from 'react';

/**
 * CounterStat – animates a number from 0 to `target` when scrolled into view.
 */
function CounterStat({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();

          const duration = 1400;
          const steps = 55;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step += 1;
            const progress = step / steps;
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (step >= steps) {
              setCount(target);
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="counter-stat">
      <span className="counter-stat__number">
        {count}
        {suffix}
      </span>
      <span className="counter-stat__label">{label}</span>
    </div>
  );
}

export default CounterStat;
