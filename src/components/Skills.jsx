// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate } from "animejs";
import {
  Dna,
  FlaskConical,
  Stethoscope,
  Users,
  MessageCircle,
  Zap,
  Camera,
  Cross,
  Languages,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SectionFX from "./motion/SectionFX";

const tabIcons = { "life-sciences": Dna, leadership: Users, media: Camera };

const SKILLS = {
  "life-sciences": [
    { icon: Dna, nameKey: "skill_biology", descKey: "skill_biology_desc", level: 95 },
    { icon: FlaskConical, nameKey: "skill_research", descKey: "skill_research_desc", level: 88 },
    { icon: Stethoscope, nameKey: "skill_medicine", descKey: "skill_medicine_desc", level: 90 },
  ],
  leadership: [
    { icon: Users, nameKey: "skill_leadership", descKey: "skill_leadership_desc", level: 92 },
    { icon: MessageCircle, nameKey: "skill_communication", descKey: "skill_communication_desc", level: 89 },
    { icon: Zap, nameKey: "skill_adaptability", descKey: "skill_adaptability_desc", level: 91 },
  ],
  media: [
    { icon: Camera, nameKey: "skill_media", descKey: "skill_media_desc", level: 84 },
    { icon: Cross, nameKey: "skill_firstaid", descKey: "skill_firstaid_desc", level: 86 },
  ],
};

const LANGUAGES_DATA = [
  { script: "\u0639", nameKey: "lang_arabic", levelKey: "lang_arabic_level", dots: 5 },
  { script: "\u05E2\u05D1", nameKey: "lang_hebrew", levelKey: "lang_hebrew_level", dots: 4 },
  { script: "En", nameKey: "lang_english", levelKey: "lang_english_level", dots: 2 },
];

export default function Skills() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("life-sciences");
  const barTargets = useRef([]);

  useEffect(() => {
    if (barTargets.current.length === 0) return;
    barTargets.current.forEach((el, i) => {
      const targetW = el.dataset.width;
      el.style.width = "0%";
      animate(el, {
        width: `${targetW}%`,
        duration: 900,
        ease: "outQuart",
        delay: 200 + i * 120,
      });
    });
  }, [activeTab]);

  const renderTab = (tabId) => {
    const skills = SKILLS[tabId];
    return (
      <div className="skills-grid">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.nameKey + tabId}
              className="skill-card-v2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <div className="skill-card-v2-header">
                <div className="skill-card-v2-icon" style={{ animationDelay: `${i * 0.32}s` }}>
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h3>{t(skill.nameKey)}</h3>
              </div>
              <p>{t(skill.descKey)}</p>
              <div className="skill-card-v2-bar">
                <div
                  className="skill-card-v2-bar-fill"
                  ref={(n) => {
                    if (n) n.dataset.width = skill.level;
                    barTargets.current[i] = n;
                  }}
                  data-width={skill.level}
                  style={isRTL ? { width: "0%", transformOrigin: "right" } : { width: "0%" }}
                >
                  <svg className="skill-bar-wave" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 12 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 T 150 6 T 180 6 T 210 6 L 240 12 Z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="skills" className="section section--alt">
      <SectionFX variant="skills" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-num">02</span>
          <span>{t("skills_title")}</span>
        </motion.div>

        <div className="skills-tabs" role="tablist">
          {Object.keys(tabIcons).map((id) => {
            const Icon = tabIcons[id];
            const tab = { id, key: `tab_${id}` };
            return (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                className={`skills-tab${activeTab === id ? " active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <span className="skills-tab-icon">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span>{t(id === "life-sciences" ? "tab_life_sciences" : id === "leadership" ? "tab_leadership" : "tab_media")}</span>
              </button>
            );
          })}
        </div>

        <div className="skills-panel-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTab(activeTab)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="languages-section">
          <motion.h3
            className="sub-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Languages size={16} style={{ verticalAlign: "-3px", marginInlineEnd: 8 }} />
            {t("languages_title")}
          </motion.h3>
          <div className="lang-cards">
            {LANGUAGES_DATA.map((lang, i) => (
              <motion.div
                key={lang.nameKey}
                className="lang-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="lang-script">{lang.script}</div>
                <h4>{t(lang.nameKey)}</h4>
                <p className="lang-level">{t(lang.levelKey)}</p>
                <div className="dots">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <i key={d} style={d <= lang.dots ? { background: "var(--accent)" } : {}} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
