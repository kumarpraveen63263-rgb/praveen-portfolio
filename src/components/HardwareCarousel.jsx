import React, { useEffect, useState } from 'react';

/**
 * HardwareCarousel – auto-cycles through hardware photos with dot nav.
 * Each photo crossfades every 3 seconds.
 */
function HardwareCarousel({ photos }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    const t = setInterval(
      () => setActive((c) => (c + 1) % photos.length),
      3000
    );
    return () => clearInterval(t);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="hw-carousel">
      {/* Label */}
      <span className="hw-carousel__label">Hardware</span>

      {/* Image stack */}
      <div className="hw-carousel__track">
        {photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Hardware photo ${i + 1}`}
            loading="lazy"
            decoding="async"
            className={`hw-carousel__img ${i === active ? 'is-active' : ''}`}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="hw-carousel__dots" aria-hidden="true">
        {photos.map((_, i) => (
          <button
            key={i}
            className={i === active ? 'is-active' : ''}
            onClick={() => setActive(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HardwareCarousel;
