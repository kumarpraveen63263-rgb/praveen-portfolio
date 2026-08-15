import React, { useRef } from 'react';

/**
 * MagneticBtn – a button/anchor that follows the cursor magnetically on hover.
 */
function MagneticBtn({ children, className = '', href, onClick, target, rel, ...props }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.32;
    const dy = (e.clientY - cy) * 0.32;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`mag-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="mag-btn__inner">{children}</span>
    </Tag>
  );
}

export default MagneticBtn;
