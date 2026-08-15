import React, { useState } from 'react';
import useRevealOnView from '../hooks/useRevealOnView';
import HardwareCarousel from './HardwareCarousel';

/**
 * Wraps every occurrence of a highlight phrase in a <mark> element.
 */
function applyHighlights(text, highlights = []) {
  if (!highlights.length) return text;
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase())
      ? <mark key={i} className="story-highlight">{part}</mark>
      : part
  );
}

function ProjectSpread({ project, reverse = false }) {
  const [ref, isVisible] = useRevealOnView(0.22);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const hasHardware = project.hardwarePhotos && project.hardwarePhotos.length > 0;

  return (
    <div
      ref={ref}
      className={`project-spread ${reverse ? 'project-spread--reverse' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      {/* ── Text content ── */}
      <div className="project-spread__content">
        <span className="project-spread__number">{project.number}</span>
        <h3 className="project-spread__title">{project.title}</h3>

        <p className="project-spread__story">
          {applyHighlights(project.story, project.highlights)}
        </p>

        <div className="project-spread__tech">
          <span className="project-spread__label">Technologies Used</span>
          <div className="project-spread__tags">
            {project.techs.map((tech) => (
              <span className="project-spread__tag" key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="project-spread__actions">
          <a className="project-button" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {project.caseStudy && (
            <a className="project-button project-button--ghost" href={project.caseStudy}>
              Case Study
            </a>
          )}
        </div>
      </div>

      {/* ── Media area ── */}
      <div className={`project-spread__media ${hasHardware ? 'project-spread__media--dual' : ''}`}>
        {/* Frame (Phone or Landscape Web) */}
        <div className={`project-spread__frame ${project.orientation === 'landscape' ? 'project-spread__frame--landscape' : ''}`}>
          {project.videoSrc && !videoFailed && isVisible && videoStarted ? (
            <>
              <video
                className={`project-spread__video ${videoReady ? 'is-ready' : ''}`}
                autoPlay loop muted playsInline controls
                preload="metadata"
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoFailed(true)}
                poster={project.backgroundSrc || undefined}
              >
                <source src={project.videoSrc} type="video/mp4" />
              </video>
              <div className={`project-spread__video-loading ${videoReady ? 'is-hidden' : ''}`} aria-live="polite">
                <span className="project-spread__loading-dot" aria-hidden="true" />
                <span>Loading preview</span>
              </div>
            </>
          ) : project.backgroundSrc ? (
            <img
              className="project-spread__poster"
              src={project.backgroundSrc}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          ) : (
            <div className="project-spread__fallback" aria-hidden="true">
              <span>{project.title}</span>
              <small>Preview ready</small>
            </div>
          )}
          {project.videoSrc && isVisible && !videoStarted && !videoFailed && (
            <button className="project-spread__play" type="button" onClick={() => setVideoStarted(true)}>
              <span aria-hidden="true">▶</span> Play demo
            </button>
          )}
        </div>

        {/* Hardware carousel — only for projects that have hardware photos */}
        {hasHardware && (
          <HardwareCarousel photos={project.hardwarePhotos} />
        )}
      </div>
    </div>
  );
}

export default ProjectSpread;
