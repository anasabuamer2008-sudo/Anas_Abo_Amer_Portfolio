import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { key: "nav_about", href: "#about" },
  { key: "nav_skills", href: "#skills" },
  { key: "nav_education", href: "#education" },
  { key: "nav_experience", href: "#experience" },
  { key: "nav_testimonials", href: "#testimonials" },
  { key: "nav_contact", href: "#contact" },
];

export default function Navbar({ scrollTo }) {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (scrollTo && href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) scrollTo(el, { offset: -80 });
    }
  };

  const langs = ["en", "ar", "he"];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="scroll-progress" />

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <img src="/profile.webp" alt="A" width="40" height="40" />
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>

            <div className="lang-switcher">
              {langs.map((l) => (
                <button
                  key={l}
                  className={`lang-btn${lang === l ? " active" : ""}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              className={`mobile-menu-btn${mobileOpen ? " active" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {t(item.key)}
            </a>
          ))}
          <div className="mobile-actions">
            <div className="mobile-lang-switcher">
              {langs.map((l) => (
                <button
                  key={l}
                  className={`lang-btn${lang === l ? " active" : ""}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
