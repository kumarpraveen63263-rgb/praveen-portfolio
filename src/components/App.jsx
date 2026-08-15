import React, { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import AchievementCarousel from './AchievementCarousel';
import ProjectSpread from './ProjectSpread';
import projectSpreads from '../data/projects.json';
import achievementDetails from '../data/achievements.json';
import photos from '../data/photos.json';

const {
  achievementOnePhotos,
  genesysPhotos,
  achievementThreePhotos,
  achievementFourPhotos,
  achievementFivePhotos,
  recognitionPhotos,
} = photos;

const heroSummaryText =
  'I specialize in Application Development, Artificial Intelligence, Machine Learning, IoT, Embedded Systems, and Java, engineering innovative products that bridge software, hardware, and real-world impact.';

function App() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [progress, setProgress]         = useState(0);
  const [achievementPhoto, setAchievementPhoto] = useState(0);
  const [genesysPhoto, setGenesysPhoto] = useState(0);
  const [achievementThreePhoto, setAchievementThreePhoto] = useState(0);
  const [achievementFourPhoto, setAchievementFourPhoto] = useState(0);
  const [achievementFivePhoto, setAchievementFivePhoto] = useState(0);
  const [recognitionPhoto, setRecognitionPhoto] = useState(0);
  const cursor = useRef(null);

  useEffect(() => {
    const onMove   = (e) => { if (cursor.current) cursor.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`; };
    const onScroll = () => { const max = document.body.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAchievementPhoto((c) => (c + 1) % achievementOnePhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setGenesysPhoto((c) => (c + 1) % genesysPhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAchievementThreePhoto((c) => (c + 1) % achievementThreePhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAchievementFourPhoto((c) => (c + 1) % achievementFourPhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAchievementFivePhoto((c) => (c + 1) % achievementFivePhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRecognitionPhoto((c) => (c + 1) % recognitionPhotos.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main > section'));
    if (!sections.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      sections.forEach((section) => section.classList.add('section-is-visible'));
      return undefined;
    }

    sections.forEach((section) => section.classList.add('section-transition'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const visitorEmail = String(data.get('visitorEmail') || '');
    const request = String(data.get('request') || '');
    const message = String(data.get('message') || '');
    const subject = request || 'Portfolio enquiry';
    const body = `Visitor email: ${visitorEmail}\n\nWhat they need: ${request}\n\nMessage:\n${message}`;
    window.location.href = `mailto:kumarpraveen63263@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="site-shell">
      <div className="cursor" ref={cursor} />
      <div className="scroll-line" style={{ '--progress': `${progress}%` }} />

      {/* ── Navigation ── */}
      <header className="nav">
        <button
          className={`menu-button ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span>Index</span>
          <i />
        </button>
      </header>

      {menuOpen && (
        <nav className="menu-panel">
          <a href="#projects"       onClick={() => setMenuOpen(false)}>Projects       <small>01</small></a>
          <a href="#experience"     onClick={() => setMenuOpen(false)}>Experience     <small>02</small></a>
          <a href="#education"      onClick={() => setMenuOpen(false)}>Education      <small>03</small></a>
          <a href="#recognition"    onClick={() => setMenuOpen(false)}>Achievements   <small>04</small></a>
          <a href="#journey"        onClick={() => setMenuOpen(false)}>Journey        <small>05</small></a>
          <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications <small>06</small></a>
          <a href="#mentor"         onClick={() => setMenuOpen(false)}>Mentor         <small>07</small></a>
          <a href="/resume.pdf" download>Download Resume <small>PDF</small></a>
          <a href="#contact"        onClick={() => setMenuOpen(false)}>Contact        <small>08</small></a>
        </nav>
      )}

      <main id="top">

        {/* ══ 01 HERO ══════════════════════════════════════════════ */}
        <section className="hero">
          <div className="hero__content">
            <div className="hero__copy">
              <h1 className="hero__name">
                Praveen <span className="hero__surname">Kumar</span>
              </h1>
              <p className="hero__role">App Developer · IoT Builder</p>
              <p className="hero__lede">{heroSummaryText}</p>
              <div className="hero__actions" aria-label="Professional links">
                <a className="project-button hero__resume-button" href="/resume.pdf" download>
                  Download Resume <Arrow />
                </a>
                <a className="project-button project-button--ghost" href="https://www.linkedin.com/in/prvn" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="project-button project-button--ghost" href="https://github.com/kumarpraveen63263-rgb" target="_blank" rel="noreferrer">GitHub</a>
                <a className="project-button project-button--ghost" href="https://leetcode.com/u/praveen89/" target="_blank" rel="noreferrer">LeetCode</a>
              </div>
            </div>
            <div className="hero__portrait-wrap">
              <div className="hero__portrait-frame">
                <img src="/profile.png" alt="Portrait of Praveen Kumar T" fetchPriority="high" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ 02 PROJECTS ══════════════════════════════════════════ */}
        <section id="projects" className="projects-section">
          <div className="projects__header">
            <span className="section-no">01</span>
            <span className="label" style={{ marginBottom: 0 }}>Selected Work</span>
          </div>
          <div className="projects__title-wrap">
            <h2 className="projects__title">PROJECTS</h2>
          </div>
          <div className="projects__list">
            {projectSpreads.map((project) => (
              <ProjectSpread key={project.number} project={project} reverse={project.reverse} />
            ))}
          </div>
        </section>

        {/* ══ 03 EXPERIENCE ════════════════════════════════════════ */}
        <section id="experience" className="section-wrap section--light">
          <div className="grid">
            <div className="section-heading" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 'var(--s4)' }}>
              <span className="section-no">02</span>
              <span className="label" style={{ marginBottom: 0 }}>Experience</span>
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--s8)', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s4)' }}>
              <h2 className="projects__title">WORK<br />EXPERIENCE</h2>
            </div>

            <div className="experience-left">
              <span className="label">May 2026 – Present</span>
              <h2>Mobile App<br /><em>Developer Intern</em></h2>
              <p style={{ color: 'var(--ink)', fontWeight: 500, marginTop: 'var(--s2)' }}>
                <a href="https://finalorigen.vercel.app/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                  ORIGEN — Where Future Begins
                </a>
                <br />
                <span style={{ color: 'var(--muted)', fontWeight: 400 }}>Chennai, India</span>
              </p>
            </div>

            <div className="experience-right">
              <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
                Developing a full-featured <mark className="story-highlight">mobile ticket booking application</mark> supporting movies, events, theatres, and metro ticketing. Contributing to application architecture, <mark className="story-highlight">scalable feature development</mark>, intuitive user experiences, and <mark className="story-highlight">cross-functional collaboration</mark> within an <mark className="story-highlight">Agile development environment</mark>.
              </p>
              <div className="project-spread__tags" style={{ marginBottom: 0 }}>
                <span className="project-spread__tag">Application Architecture</span>
                <span className="project-spread__tag">UI/UX Design</span>
                <span className="project-spread__tag">Feature Development</span>
                <span className="project-spread__tag">Agile Development</span>
                <span className="project-spread__tag">Product Engineering</span>
              </div>
            </div>

            {/* ── Experience 2 ── */}
            <div className="experience-left" style={{ marginTop: 'var(--s8)' }}>
              <span className="label">Apr 2025 – May 2025</span>
              <h2>Python Web<br /><em>Development Intern</em></h2>
              <p style={{ color: 'var(--ink)', fontWeight: 500, marginTop: 'var(--s2)' }}>
                <a href="https://pantechelearning.com/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                  Pantech eLearning
                </a>
                <br />
                <span style={{ color: 'var(--muted)', fontWeight: 400 }}>T Nagar, Chennai</span>
              </p>
            </div>

            <div className="experience-right" style={{ marginTop: 'var(--s8)' }}>
              <p style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
                Developed responsive web applications using <mark className="story-highlight">HTML, CSS, and JavaScript</mark>. Assisted with backend development using <mark className="story-highlight">Python</mark> and <mark className="story-highlight">REST API integration</mark>. Debugged and tested applications for stable, smooth deployment, and collaborated in an Agile environment using <mark className="story-highlight">Git</mark> for version control.
              </p>
              <div className="project-spread__tags" style={{ marginBottom: 0 }}>
                <span className="project-spread__tag">HTML / CSS</span>
                <span className="project-spread__tag">JavaScript</span>
                <span className="project-spread__tag">Python</span>
                <span className="project-spread__tag">REST API</span>
                <span className="project-spread__tag">Git</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 04 EDUCATION ═════════════════════════════════════════ */}
        <section id="education" className="section-wrap section--light" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="grid">
            <div className="section-heading" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 'var(--s4)' }}>
              <span className="section-no">03</span>
              <span className="label" style={{ marginBottom: 0 }}>Education</span>
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--s8)', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s4)' }}>
              <h2 className="projects__title">EDUCATION</h2>
            </div>

            <div className="education-left">
              <span className="label">Bachelor of Engineering</span>
              <h2>Electronics &amp;<br /><em>Communication</em></h2>
              <a
                className="education__college-link"
                href="https://saec.ac.in/"
                target="_blank"
                rel="noreferrer"
              >
                S.A. Engineering College, Chennai
              </a>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.75, marginTop: 'var(--s4)' }}>
                Relevant coursework: Data Structures, Machine Learning,
                IoT Systems, Power Electronics, Embedded Systems.
              </p>
            </div>

            <div className="education-right education__campus">
              <a
                href="https://saec.ac.in/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit S.A. Engineering College website"
              >
                <img
                  className="education__campus-image"
                  src="/clg/sa2.png"
                  alt="S.A. Engineering College campus"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>

            <div className="schooling-block">
              <div className="schooling-block__content">
                <span className="label">Schooling</span>
                <h2>Matriculation &amp;<br /><em>Higher Secondary</em></h2>
                <a
                  className="education__college-link education__school-link"
                  href="https://kalashetra.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kalashetra Matric Higher Secondary School
                </a>
              </div>

              <a
                className="schooling-block__image-link"
                href="https://kalashetra.in/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Kalashetra Matric Higher Secondary School website"
              >
                <img
                  className="schooling-block__image"
                  src="/scl/Untitled-1.jpg"
                  alt="Kalashetra Matric Higher Secondary School"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </section>

        {/* ══ 05 ACHIEVEMENTS ══════════════════════════════════════ */}
        <section id="recognition" className="section-wrap section--dark">
          <div className="grid">
            <div className="section-heading">
              <span className="section-no">04</span>
              <span className="label" style={{ marginBottom: 0 }}>Achievements</span>
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--s8)', borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: 'var(--s4)' }}>
              <h2 className="projects__title">ACHIEVEMENTS</h2>
            </div>

            <div className="recognition__header">
              <h2>Five wins.<br /><em>More to build.</em></h2>
              <div className="recognition__stat">
                <strong>05+</strong>
                <span>hackathon wins</span>
              </div>
            </div>

            <div className="achievement-grid">
              {achievementDetails.map((achievement, index) => (
                <article
                  className={`achievement ${index < 2 ? 'achievement--gallery' : ''}`}
                  key={achievement.number}
                >
                  <div className="achievement__content">
                    <div className="achievement__top">
                      <span className="achievement__badge">Medal {achievement.badge}</span>
                      <span className="achievement__number">{achievement.number}</span>
                    </div>
                    <h3>{achievement.title}</h3>
                    <p className="achievement__meta">{achievement.meta}</p>
                    <p className="achievement__summary">{achievement.summary}</p>
                  </div>

                  {index === 0 ? (
                    <AchievementCarousel
                      photos={achievementOnePhotos}
                      activePhoto={achievementPhoto}
                      onChange={setAchievementPhoto}
                    />
                  ) : index === 1 ? (
                    <AchievementCarousel
                      photos={genesysPhotos}
                      activePhoto={genesysPhoto}
                      onChange={setGenesysPhoto}
                      variant="genesys"
                    />
                  ) : index === 2 ? (
                    <AchievementCarousel
                      photos={achievementThreePhotos}
                      activePhoto={achievementThreePhoto}
                      onChange={setAchievementThreePhoto}
                      variant="achievement-three"
                    />
                  ) : index === 3 ? (
                    <AchievementCarousel
                      photos={achievementFourPhotos}
                      activePhoto={achievementFourPhoto}
                      onChange={setAchievementFourPhoto}
                      variant="achievement-four"
                    />
                  ) : index === 4 ? (
                    <AchievementCarousel
                      photos={achievementFivePhotos}
                      activePhoto={achievementFivePhoto}
                      onChange={setAchievementFivePhoto}
                      variant="achievement-five"
                    />
                  ) : (
                    <div className="achievement__media">
                      <span>Achievement photo</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="section-wrap section--light journey-section" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="grid">
            <div className="section-heading" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 'var(--s4)' }}>
              <span className="section-no">05</span>
              <span className="label" style={{ marginBottom: 0 }}>Recognition</span>
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--s8)', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s4)' }}>
              <h2 className="projects__title">JOURNEY OF<br /><em>EXCELLENCE</em></h2>
            </div>

            <div className="journey-section__copy">
              <span className="label">A team moment</span>
              <h2>Recognised<br /><em>together.</em></h2>
              <p>
                Our team was recognised by the Correspondent Sir for our achievement,
                celebrating the collaboration, persistence, and engineering work behind the result.
              </p>
            </div>

            <div className="journey-section__media">
              <AchievementCarousel
                photos={recognitionPhotos}
                activePhoto={recognitionPhoto}
                onChange={setRecognitionPhoto}
                variant="journey"
              />
            </div>
          </div>
        </section>

        {/* ══ 06 CERTIFICATIONS ════════════════════════════════════ */}
        <section id="certifications" className="section-wrap section--light" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="grid">
            <div className="section-heading">
              <span className="section-no">06</span>
              <span className="label" style={{ marginBottom: 0 }}>Certifications</span>
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--s8)', borderBottom: '1px solid var(--line)', paddingBottom: 'var(--s4)' }}>
              <h2 className="projects__title">CERTIFICATIONS</h2>
            </div>

            <div className="certification-main">
              <span className="label">AWS</span>
              <h2>SKILL<br /><em>BUILDER.</em></h2>

              <div className="certification-showcase">
                <a
                  className="certification-showcase__brand"
                  href="https://www.credly.com/users/praveen-kumar-t.f5fd3fb1/edit/badges/credly"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Praveen Kumar's Credly profile"
                >
                  <img src="/credly-logo.png" alt="Credly by Pearson" loading="lazy" decoding="async" />
                </a>
                <div className="certification-showcase__count">
                  <strong>16</strong>
                  <span>Skill Builder</span>
                </div>
              </div>

            </div>

            <div className="certifications__summary">
              <span className="label">Skills</span>
              <div className="skills-builder-list">
                <div className="skills-builder-row">
                  <strong>Languages</strong>
                  <span>Python, Java, C++, Dart</span>
                </div>
                <div className="skills-builder-row">
                  <strong>Tools/Frameworks</strong>
                  <span>Flutter, REST APIs, Git, MQTT</span>
                </div>
                <div className="skills-builder-row">
                  <strong>Databases</strong>
                  <span>PostgreSQL, MySQL</span>
                </div>
                <div className="skills-builder-row">
                  <strong>Other Skills</strong>
                  <span>Machine Learning, IoT, Power Electronics, Data Analysis, Japanese (N5)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 07 MENTOR & RECOGNITION ══════════════════════════════ */}
        <section className="section-wrap section--light mentor-section" id="mentor">
          <div className="grid">
            <div className="section-heading mentor-section__heading-row">
            <span className="section-no">07</span>
              <h2 className="mentor-section__heading">Mentor &amp; Recognition</h2>
            </div>

            <div className="mentor-section__body">
            <div className="mentor-section__details">
              <span className="label">Mentor</span>
              <p className="mentor-section__name">Dr. T.S. GEETHA</p>
              <p className="mentor-section__role">Professor at S.A. Engineering College</p>
            </div>
            <div className="mentor-section__copy-block">
              <span className="label">Mentorship</span>
              <p className="mentor-section__copy">
                Her <span className="mentor-highlight">continuous guidance</span>, <span className="mentor-highlight">valuable feedback</span>, and encouragement helped me strengthen my <span className="mentor-highlight">technical knowledge</span>, improve my <span className="mentor-highlight">research skills</span>, and confidently participate in <span className="mentor-highlight">projects, hackathons, and competitions</span>.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* ══ 08 CONTACT ═══════════════════════════════════════════ */}
        <section id="contact" className="section-wrap section--light" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="grid">
            <div className="section-heading">
              <span className="section-no">08</span>
              <span className="label contact-section__title" style={{ marginBottom: 0 }}>Contact</span>
            </div>

            <div className="contact__body">
              <h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2>
              <a className="contact__email" href="mailto:kumarpraveen63263@gmail.com">
                kumarpraveen63263@gmail.com <Arrow />
              </a>
              <p>
                Chennai — +91 9884470371<br />
                <a href="https://www.linkedin.com/in/prvn" target="_blank" rel="noreferrer">
                  linkedin.com/in/prvn
                </a>
              </p>
            </div>

            <form className="contact__form" onSubmit={handleContactSubmit}>
              <div className="contact__form-intro">
                <span className="label">Start a conversation</span>
                <p>Tell me your email, what you need, and how I can help.</p>
              </div>
              <label className="contact__field">
                <span className="label">Your email</span>
                <input type="email" name="visitorEmail" placeholder="you@example.com" required />
              </label>
              <label className="contact__field">
                <span className="label">What do you need?</span>
                <input type="text" name="request" required />
              </label>
              <label className="contact__field">
                <span className="label">Message</span>
                <textarea name="message" rows="4" placeholder="Share the details of your request." required />
              </label>
              <button className="project-button contact__submit" type="submit">Send request <Arrow /></button>
            </form>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <span>© 2026 Praveen Kumar T</span>
        <span>AI × ECE / Portfolio</span>
        <div className="footer__links" aria-label="Professional links">
          <a href="/resume.pdf" download>Download Resume</a>
          <a href="https://www.linkedin.com/in/prvn" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/kumarpraveen63263-rgb" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://leetcode.com/u/praveen89/" target="_blank" rel="noreferrer">LeetCode</a>
          <a href="https://www.credly.com/users/praveen-kumar-t.f5fd3fb1/edit/badges/credly" target="_blank" rel="noreferrer">Credly</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
