import React, { useRef } from 'react';

/**
 * TiltCard – 3-D perspective tilt with a moving light-reflection overlay.
 * Mouse position drives both the tilt angle and a radial highlight via CSS vars.
 */
function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;    // 0 → 1
    const rx = (y - 0.5) * -16;   // rotate X axis (tilt forward/back)
    const ry = (x - 0.5) * 16;    // rotate Y axis (tilt left/right)
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    el.style.setProperty('--light-x', `${x * 100}%`);
    el.style.setProperty('--light-y', `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default TiltCard;
