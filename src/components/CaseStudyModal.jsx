import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function CaseStudyModal({ project, study, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!study) return null;

  const hasRealGithub = project.github && !project.github.includes('your-username');

  return createPortal(
    <div
      className="case-study-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`case-study-title-${project.number}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article className="case-study-modal__panel">
        <header className="case-study-modal__header">
          <div>
            <span className="case-study-modal__label">{study.label}</span>
            <h2 id={`case-study-title-${project.number}`}>{study.title}</h2>
          </div>
          <button className="case-study-modal__close" type="button" onClick={onClose} aria-label="Close case study">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <p className="case-study-modal__intro">{study.intro}</p>

        <div className="case-study-modal__grid">
          <section>
            <span className="case-study-modal__eyebrow">The problem</span>
            <p>{study.problem}</p>
          </section>
          <section>
            <span className="case-study-modal__eyebrow">The approach</span>
            <p>{study.approach}</p>
          </section>
          <section>
            <span className="case-study-modal__eyebrow">My contribution</span>
            <p>{study.contribution}</p>
          </section>
          <section>
            <span className="case-study-modal__eyebrow">Outcome</span>
            <p>{study.outcome}</p>
          </section>
        </div>

        <footer className="case-study-modal__footer">
          <div className="case-study-modal__stack">
            <span className="case-study-modal__eyebrow">Built with</span>
            <div>
              {study.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          {hasRealGithub && (
            <a className="project-button" href={project.github} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          )}
        </footer>
      </article>
    </div>,
    document.body
  );
}

export default CaseStudyModal;
