// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, BadgeCheck } from "lucide-react";
import { animate } from "animejs";
import { useLanguage } from "../context/LanguageContext";
import SectionFX from "../components/motion/SectionFX";
import CellularParticles from "../components/motion/CellularParticles";
import CountTo from "../components/motion/CountTo";
import MicroscopeZoom from "../components/motion/MicroscopeZoom";

const Hero3D = lazy(() => import("../components/three/Hero3D"));

gsap.registerPlugin(ScrollTrigger);

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Hero({ scrollTo }) {
  const { t, lang, isRTL } = useLanguage();
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const [enable3D, setEnable3D] = useState(false);

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const nameChars = el.querySelectorAll(".hero-name .char");
      animate(nameChars, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
        delay: (t, i) => 250 + i * 40,
        ease: "outCubic",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.from(".hero-badge", { y: 20, opacity: 0 }, 0.1)
        .from(".hero-eyebrow", { y: 20, opacity: 0 }, 0.2)
        .from(".hero-title", { y: 20, opacity: 0 }, 0.55)
        .from(".hero-subtitle", { y: 20, opacity: 0 }, 0.65)
        .from(".hero-cta", { y: 20, opacity: 0 }, 0.75)
        .from(".hero-metrics", { y: 20, opacity: 0 }, 0.85);

      gsap.utils.toArray(".hero-bg-word").forEach((word) => {
        gsap.to(word, {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Progressive enhancement: enable the 3D layer only on capable devices
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnable3D(true);
  }, []);

  const handleAbout = (e) => {
    e.preventDefault();
    scrollTo?.(document.querySelector("#about"), { offset: -80 });
  };
  const handleContact = (e) => {
    e.preventDefault();
    scrollTo?.(document.querySelector("#contact"), { offset: -80 });
  };

  const nameLinesByLang = {
    en: [
      ["Anas"],
      ["Abu", "Amer"],
    ],
    ar: [
      ["انس"],
      ["ابو", "عامر"],
    ],
    he: [
      ["אנס"],
      ["אבו", "עאמר"],
    ],
  };
  const nameLines = nameLinesByLang[lang] || nameLinesByLang.en;

  return (
    <section className="hero" ref={heroRef}>
      <SectionFX variant="hero" />
      <CellularParticles />
      {enable3D && (
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      )}
      <span className="hero-bg-word hero-bg-word-1">Biology</span>
      <span className="hero-bg-word hero-bg-word-2">Medicine</span>
      <span className="hero-bg-word hero-bg-word-3">Leadership</span>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>{t("hero_status")}</span>
            </div>
            <p className="hero-eyebrow">{t("hero_greeting")}</p>
            <h1 className="hero-name">
              {nameLines.map((line, li) => (
                <span className="line" key={li}>
                  {line.map((word, wi) => (
                    <span className={`word${li === 1 && wi === 1 ? " accent" : ""}`} key={wi}>
                      {isRTL ? (
                        <span className="char">{word}</span>
                      ) : (
                        word.split("").map((ch, ci) => (
                          <span className="char" key={ci} style={{ display: "inline-block" }}>
                            {ch}
                          </span>
                        ))
                      )}
                      {wi < line.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <h2 className="hero-title">{t("hero_title")}</h2>
            <p className="hero-subtitle">{t("hero_subtitle")}</p>

            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary" onClick={handleContact}>
                <BadgeCheck size={16} />
                {t("hero_cta")}
              </a>
              <a href="#about" className="btn btn-outline" onClick={handleAbout}>
                {t("hero_about")}
              </a>
            </div>

            <div className="hero-metrics">
              <div className="metric">
                <CountTo value={3.7} decimals={1} className="metric-value" />
                <span className="metric-label">{t("stat_grade")}</span>
              </div>
              <div className="metric-sep" />
              <div className="metric">
                <CountTo value={4} className="metric-value" />
                <span className="metric-label">{t("stat_volunteer")}</span>
              </div>
              <div className="metric-sep" />
              <div className="metric">
                <CountTo value={3} className="metric-value" />
                <span className="metric-label">{t("stat_languages")}</span>
              </div>
            </div>

            <div className="hero-mobile-socials">
              <a href="mailto:anasabuamer2008@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>

          <div className="hero-visual" ref={visualRef}>
            <motion.div
              className="profile-card"
              style={{ y: cardY, rotate: cardRotate }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <div className="card-avatar">
                <MicroscopeZoom src="/profile.webp" alt="Anas Abu Amer" />
              </div>
              <h3 className="card-name">Anas Abu Amer</h3>
              <p className="card-role">{t("hero_role")}</p>
              <div className="card-location">
                <MapPin size={12} />
                {t("hero_location")}
              </div>
              <div className="card-tags">
                <span>{t("tag_biology")}</span>
                <span>{t("tag_medicine")}</span>
                <span>{t("tag_leadership")}</span>
              </div>
              <div className="card-links">
                <a href="mailto:anasabuamer2008@gmail.com" aria-label="Email">
                  <Mail size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
