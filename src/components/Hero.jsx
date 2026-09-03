import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";

export default function Hero({ scrollTo }) {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.from(".hero-badge", { y: 20, opacity: 0 }, 0.2)
        .from(".hero-eyebrow", { y: 20, opacity: 0 }, 0.3)
        .from(".hero-name .line", { y: 40, opacity: 0, stagger: 0.12 }, 0.35)
        .from(".hero-title", { y: 20, opacity: 0 }, 0.6)
        .from(".hero-subtitle", { y: 20, opacity: 0 }, 0.7)
        .from(".hero-cta", { y: 20, opacity: 0 }, 0.8)
        .from(".hero-metrics", { y: 20, opacity: 0 }, 0.9)
        .from(".profile-card", { x: 40, opacity: 0, duration: 1, ease: "power3.out" }, 0.4);

      const counterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll("[data-count]").forEach((cEl) => {
                if (!cEl.dataset.done) {
                  cEl.dataset.done = "1";
                  const target = parseInt(cEl.dataset.count);
                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: target,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => { cEl.textContent = Math.round(obj.val); },
                  });
                }
              });
            }
          });
        },
        { threshold: 0.5 }
      );
      const metricsEl = el.querySelector(".hero-metrics");
      if (metricsEl) counterObs.observe(metricsEl);
    }, el);
    return () => ctx.revert();
  }, []);

  const handleAbout = (e) => {
    e.preventDefault();
    if (scrollTo) {
      const aboutEl = document.querySelector("#about");
      if (aboutEl) scrollTo(aboutEl, { offset: -80 });
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    if (scrollTo) {
      const contactEl = document.querySelector("#contact");
      if (contactEl) scrollTo(contactEl, { offset: -80 });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>{t("hero_status")}</span>
            </div>
            <p className="hero-eyebrow">{t("hero_greeting")}</p>
            <h1 className="hero-name">
              <span className="line">Anas</span>
              <span className="line">
                Abu <span className="accent">Amer</span>
              </span>
            </h1>
            <h2 className="hero-title">{t("hero_title")}</h2>
            <p className="hero-subtitle">{t("hero_subtitle")}</p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary" onClick={handleContact}>
                {t("hero_cta")}
              </a>
              <a href="#about" className="btn btn-outline" onClick={handleAbout}>
                {t("hero_about")}
              </a>
            </div>
            <div className="hero-metrics">
              <div className="metric">
                <span className="metric-value" data-count="3.7" data-decimal="true">0</span>
                <span className="metric-label">{t("stat_grade")}</span>
              </div>
              <div className="metric-sep" />
              <div className="metric">
                <span className="metric-value" data-count="4">0</span>
                <span className="metric-label">{t("stat_volunteer")}</span>
              </div>
              <div className="metric-sep" />
              <div className="metric">
                <span className="metric-value" data-count="3">0</span>
                <span className="metric-label">{t("stat_languages")}</span>
              </div>
            </div>
            <div className="hero-mobile-socials">
              <a href="mailto:anasabuamer2008@gmail.com" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-card">
              <div className="card-avatar">
                <img src="/profile.webp" alt="Anas Abu Amer" />
              </div>
              <h3 className="card-name">Anas Abu Amer</h3>
              <p className="card-role">{t("hero_role")}</p>
              <div className="card-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t("hero_location")}
              </div>
              <div className="card-tags">
                <span>{t("tag_biology")}</span>
                <span>{t("tag_medicine")}</span>
                <span>{t("tag_leadership")}</span>
              </div>
              <div className="card-links">
                <a href="mailto:anasabuamer2008@gmail.com" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
