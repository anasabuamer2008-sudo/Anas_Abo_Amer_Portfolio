import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TABS = [
  { id: "life-sciences", key: "tab_life_sciences", icon: "🧬" },
  { id: "leadership", key: "tab_leadership", icon: "👥" },
  { id: "media", key: "tab_media", icon: "📸" },
];

const SKILLS = {
  "life-sciences": [
    { icon: "🧬", nameKey: "skill_biology", descKey: "skill_biology_desc" },
    { icon: "🔬", nameKey: "skill_research", descKey: "skill_research_desc" },
    { icon: "🏥", nameKey: "skill_medicine", descKey: "skill_medicine_desc" },
  ],
  leadership: [
    { icon: "👥", nameKey: "skill_leadership", descKey: "skill_leadership_desc" },
    { icon: "🤝", nameKey: "skill_communication", descKey: "skill_communication_desc" },
    { icon: "🔄", nameKey: "skill_adaptability", descKey: "skill_adaptability_desc" },
  ],
  media: [
    { icon: "📸", nameKey: "skill_media", descKey: "skill_media_desc" },
    { icon: "🩹", nameKey: "skill_firstaid", descKey: "skill_firstaid_desc" },
  ],
};

const LANGUAGES_DATA = [
  { script: "ع", nameKey: "lang_arabic", levelKey: "lang_arabic_level", dots: 5 },
  { script: "עב", nameKey: "lang_hebrew", levelKey: "lang_hebrew_level", dots: 4 },
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

        <div className="skills-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`skills-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="skills-tab-icon">{tab.icon}</span>
              <span>{t(tab.key)}</span>
              {activeTab === tab.id && <span className="skills-tab-indicator" />}
            </button>
          ))}
        </div>

        <div className="skills-panel-wrapper">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              className={`skills-panel${activeTab === tab.id ? " active" : ""}`}
            >
              <div className="skills-grid">
                {SKILLS[tab.id].map((skill, i) => (
                  <div key={skill.nameKey} className="skill-card-v2" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="skill-card-v2-header">
                      <div className="skill-card-v2-icon">{skill.icon}</div>
                      <h3>{t(skill.nameKey)}</h3>
                    </div>
                    <p>{t(skill.descKey)}</p>
                    <div className="skill-card-v2-bar">
                      <div className="skill-card-v2-bar-fill" style={{ width: `${90 - i * 10}%` }} />
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
