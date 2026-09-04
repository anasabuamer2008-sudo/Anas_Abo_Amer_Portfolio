// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Stethoscope } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, Stagger } from "./motion/Reveal";
import SectionFX from "./motion/SectionFX";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { key: "value_empathy", icon: "Heart" },
  { key: "value_leadership", icon: "Users" },
  { key: "value_perseverance", icon: "Flame" },
  { key: "value_inclusion", icon: "HandHeart" },
];

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".chip").forEach((chip, i) => {
        gsap.from(chip, {
          opacity: 0,
          scale: 0.6,
          y: 10,
          duration: 0.5,
          ease: "back.out(2)",
          delay: i * 0.1,
          scrollTrigger: { trigger: ".value-chips", start: "top 88%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <SectionFX variant="about" />
      <div className="container">
        <Reveal as="div" className="section-label">
          <span className="label-num">01</span>
          <span>{t("about_title")}</span>
        </Reveal>

        <div className="about-grid">
          <div>
            <Reveal y={30} as="p" className="about-lead">
              {t("about_text")}
            </Reveal>
            <Reveal y={30} delay={0.1} as="p" className="about-body">
              {t("about_text2")}
            </Reveal>
            <Stagger container="div" item="span" className="value-chips" delayChild={0.08}>
              {(Item) =>
                VALUES.map((v) => (
                  <Item key={v.key} className="chip">
                    {t(v.key)}
                  </Item>
                ))
              }
            </Stagger>
          </div>

          <motion.div
            className="quote-card"
            ref={quoteRef}
            style={{ y: quoteY, opacity: quoteOpacity }}
          >
            <span className="quote-label">
              <Stethoscope size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              {t("why_medicine_title")}
            </span>
            <blockquote>{t("why_medicine_text")}</blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
