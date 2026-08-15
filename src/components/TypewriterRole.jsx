import React, { useEffect, useState } from 'react';

const ROLES = [
  'App Developer',
  'AI Engineer',
  'IoT Builder',
  'ML Researcher',
  'ECE Graduate',
];

/**
 * TypewriterRole – cycles through ROLES with a typing/deleting animation.
 */
function TypewriterRole() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => {
        setPause(false);
        setDeleting(true);
      }, 2200);
      return () => clearTimeout(t);
    }

    const current = ROLES[roleIdx];
    const speed = deleting ? 38 : 72;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setPause(true);
      } else {
        const next = text.slice(0, -1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, roleIdx, pause]);

  return (
    <span className="typewriter" aria-label={ROLES[roleIdx]}>
      <span className="typewriter__text">{text}</span>
      <span className="typewriter__cursor" aria-hidden="true">|</span>
    </span>
  );
}

export default TypewriterRole;
