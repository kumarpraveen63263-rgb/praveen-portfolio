import React from 'react';

function SplitTitle({ text, isVisible }) {
  const words = text.split(' ');

  return (
    <span className="split-title" aria-label={text}>
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => {
        const charOffset = words.slice(0, wordIndex).reduce((sum, item) => sum + item.length + 1, 0);

        return (
          <span className="split-title__word" key={`${text}-${word}-${wordIndex}`}>
            {Array.from(word).map((char, charIndex) => (
              <span
                key={`${text}-${char}-${wordIndex}-${charIndex}`}
                className={`split-title__char ${isVisible ? 'is-visible' : ''}`}
                style={{ '--char-index': charOffset + charIndex }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 ? <span className="split-title__space" aria-hidden="true"> </span> : null}
          </span>
        );
      })}
    </span>
  );
}

export default SplitTitle;
