import React from 'react';

function AchievementCarousel({ photos, activePhoto, onChange, variant = '' }) {
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
            <img
              key={photo}
              src={photo}
              alt={`Achievement photo ${index + 1}`}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ))}
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
