import React from 'react';

/**
 * GlitchText – wraps text in a CSS glitch effect on hover.
 * Pass `data-text` via the element itself so CSS ::before / ::after can mirror it.
 */
function GlitchText({ children, as: Tag = 'span', className = '' }) {
  return (
    <Tag className={`glitch-text ${className}`} data-text={children}>
      {children}
    </Tag>
  );
}

export default GlitchText;
