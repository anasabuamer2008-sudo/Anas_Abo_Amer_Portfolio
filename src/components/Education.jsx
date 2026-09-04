// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { GraduationCap, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./motion/Reveal";
import CountTo from "./motion/CountTo";
import SectionFX from "./motion/SectionFX";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="section">
      <SectionFX variant="education" />
      <div className="container">
        <Reveal as="div" className="section-label">
          <span className="label-num">03</span>
          <span>{t("education_title")}</span>
        </Reveal>

        <div className="edu-grid">
          <Reveal as="div" className="edu-card current" y={30}>
            <span className="edu-badge">{t("edu_badge_current")}</span>
            <time>{t("edu_date1")}</time>
            <h3>{t("edu_title1")}</h3>
            <p className="edu-degree">{t("edu_subtitle1")}</p>
            <p className="edu-desc">{t("edu_desc1")}</p>
            <div className="edu-underline">
              <GraduationCap size={18} />
            </div>
          </Reveal>

          <Reveal as="div" className="edu-card" y={30} delay={0.12}>
            <span className="edu-badge distinction">
              <Award size={11} style={{ verticalAlign: "-2px", marginInlineEnd: 4 }} />
              {t("edu_badge_distinction")}
            </span>
            <time>{t("edu_date2")}</time>
            <h3>{t("edu_title2")}</h3>
            <p className="edu-degree">{t("edu_subtitle2")}</p>
            <div className="grade-badge">
              <CountTo value={97.2} decimals={1} className="grade-count" />
              <small>{t("edu_grade")}</small>
            </div>
            <p className="edu-desc">{t("edu_desc2")}</p>
            <div className="edu-underline">
              <GraduationCap size={18} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
