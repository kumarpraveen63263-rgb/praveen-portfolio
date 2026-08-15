import { useEffect, useState } from 'react';

function AchievementCarousel({ photos, activePhoto, onChange, variant = '' }) {
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!loadedIndexes.has(activePhoto));
  }, [activePhoto, loadedIndexes]);

  const markLoaded = (index) => {
    setLoadedIndexes((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
    if (index === activePhoto) setIsLoading(false);
  };

  return (
    <div className={`achievement-carousel ${variant ? `achievement-carousel--${variant}` : ''}`}>
      <div className="achievement-carousel__images" aria-live="polite">
        <div
          className="achievement-carousel__track"
          style={{
            width: `${photos.length * 100}%`,
            '--achievement-slide-width': `${100 / photos.length}%`,
            transform: `translate3d(-${activePhoto * (100 / photos.length)}%, 0, 0)`,
          }}
        >
          {photos.map((photo, index) => (
            <div className="achievement-carousel__slide" key={photo}>
              {loadedIndexes.has(index) || index === activePhoto ? (
                <img
                  src={photo}
                  alt={`Achievement photo ${index + 1}`}
                  loading={index === activePhoto ? 'eager' : 'lazy'}
                  decoding="async"
                  onLoad={() => markLoaded(index)}
                  onError={() => markLoaded(index)}
                />
              ) : (
                <div className="achievement-carousel__placeholder" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <div className={`achievement-carousel__loading ${isLoading ? 'is-visible' : ''}`} aria-live="polite">
          <span className="achievement-carousel__loading-dot" aria-hidden="true" />
          <span>Loading image</span>
        </div>
      </div>
      <div className="achievement-carousel__caption">
        <span>Gallery</span>
        <small>Auto-rotating photos</small>
      </div>
      <div className="achievement-carousel__dots">
        {photos.map((photo, index) => (
          <button
            key={photo}
            className={activePhoto === index ? 'is-active' : ''}
            onClick={() => onChange(index)}
            aria-label={`Show achievement photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default AchievementCarousel;
