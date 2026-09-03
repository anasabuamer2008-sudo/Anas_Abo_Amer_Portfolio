import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Icons = {
  biology: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a5 5 0 0 1 5 5c0 2-1 3-1 4s1 2 1 4a5 5 0 0 1-10 0c0-2 2-3 2-4s-2-2-2-4a5 5 0 0 1 5-5z" />
      <path d="M8 11h8M9 16h6M10 7h4" />
    </svg>
  ),
  research: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12h3M19 12h3M12 2v3M12 19v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  ),
  medicine: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M10 13h4M12 11v4" />
    </svg>
  ),
  leadership: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 6.5a3.5 3.5 0 0 1 0 6.8M18.5 20a6.5 6.5 0 0 0-4-6" />
    </svg>
  ),
  communication: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  ),
  adaptability: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M21 3v6h-6M12 12l4-4" />
    </svg>
  ),
  media: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  firstaid: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="4" height="12" rx="1" />
      <rect x="18" y="7" width="4" height="12" rx="1" />
      <rect x="6" y="9" width="12" height="9" rx="1" />
      <path d="M9 5h6a1 1 0 0 1 1 1v1H8V6a1 1 0 0 1 1-1zM12 12v4M10 14h4" />
    </svg>
  ),
};

const TABS = [
  { id: "life-sciences", key: "tab_life_sciences", icon: "biology" },
  { id: "leadership", key: "tab_leadership", icon: "leadership" },
  { id: "media", key: "tab_media", icon: "media" },
];

const SKILLS = {
  "life-sciences": [
    { icon: "biology", nameKey: "skill_biology", descKey: "skill_biology_desc" },
    { icon: "research", nameKey: "skill_research", descKey: "skill_research_desc" },
    { icon: "medicine", nameKey: "skill_medicine", descKey: "skill_medicine_desc" },
  ],
  leadership: [
    { icon: "leadership", nameKey: "skill_leadership", descKey: "skill_leadership_desc" },
    { icon: "communication", nameKey: "skill_communication", descKey: "skill_communication_desc" },
    { icon: "adaptability", nameKey: "skill_adaptability", descKey: "skill_adaptability_desc" },
  ],
  media: [
    { icon: "media", nameKey: "skill_media", descKey: "skill_media_desc" },
    { icon: "firstaid", nameKey: "skill_firstaid", descKey: "skill_firstaid_desc" },
  ],
};

const LANGUAGES_DATA = [
  { script: "\u0639", nameKey: "lang_arabic", levelKey: "lang_arabic_level", dots: 5 },
  { script: "\u05E2\u05D1", nameKey: "lang_hebrew", levelKey: "lang_hebrew_level", dots: 4 },
  { script: "En", nameKey: "lang_english", levelKey: "lang_english_level", dots: 2 },
];

export default function Skills() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("life-sciences");

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <div className="section-label">
          <span className="label-num">02</span>
          <span>{t("skills_title")}</span>
        </div>

        <div className="skills-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`skills-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="skills-tab-icon">{Icons[tab.icon]}</span>
              <span>{t(tab.key)}</span>
            </button>
          ))}
        </div>

        <div className="skills-panel-wrapper">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              className={`skills-panel${activeTab === tab.id ? " active" : ""}`}
            >
              <div className="skills-grid">
                {SKILLS[tab.id].map((skill, i) => (
                  <div
                    key={skill.nameKey}
                    className="skill-card-v2"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="skill-card-v2-header">
                      <div className="skill-card-v2-icon">{Icons[skill.icon]}</div>
                      <h3>{t(skill.nameKey)}</h3>
                    </div>
                    <p>{t(skill.descKey)}</p>
                    <div className="skill-card-v2-bar">
                      <div
                        className="skill-card-v2-bar-fill"
                        style={{ width: `${90 - i * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="languages-section">
          <h3 className="sub-heading">{t("languages_title")}</h3>
          <div className="lang-cards">
            {LANGUAGES_DATA.map((lang) => (
              <div key={lang.nameKey} className="lang-card">
                <div className="lang-script">{lang.script}</div>
                <h4>{t(lang.nameKey)}</h4>
                <p className="lang-level">{t(lang.levelKey)}</p>
                <div className="dots">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} style={i <= lang.dots ? { background: "var(--accent)" } : {}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
