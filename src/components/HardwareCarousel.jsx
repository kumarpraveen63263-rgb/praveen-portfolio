import { useEffect, useState } from 'react';

/**
 * HardwareCarousel – auto-cycles through hardware photos with dot nav.
 * Only the active photo is requested, keeping the initial page load light.
 */
function HardwareCarousel({ photos }) {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!photos || photos.length <= 1) return undefined;
    const t = setInterval(
      () => {
        setActive((current) => (current + 1) % photos.length);
        setIsLoading(true);
      },
      3000
    );
    return () => clearInterval(t);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="hw-carousel">
      <span className="hw-carousel__label">Hardware</span>

      <div className="hw-carousel__track">
        <img
          key={photos[active]}
          src={photos[active]}
          alt={`Hardware photo ${active + 1}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`hw-carousel__img is-active ${isLoading ? 'is-loading' : ''}`}
        />
        <div className={`hw-carousel__loading ${isLoading ? 'is-visible' : ''}`} aria-live="polite">
          <span className="hw-carousel__loading-dot" aria-hidden="true" />
          <span>Loading image</span>
        </div>
      </div>

      <div className="hw-carousel__dots" aria-hidden="true">
        {photos.map((_, index) => (
          <button
            key={index}
            className={index === active ? 'is-active' : ''}
            onClick={() => {
              setActive(index);
              setIsLoading(true);
            }}
            aria-label={`Photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HardwareCarousel;
