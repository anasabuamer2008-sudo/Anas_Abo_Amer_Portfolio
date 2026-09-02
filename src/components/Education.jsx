import { useLanguage } from "../context/LanguageContext";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-label">
          <span className="label-num">03</span>
          <span>{t("education_title")}</span>
        </div>
        <div className="edu-grid">
          <div className="edu-card current">
            <span className="edu-badge">{t("edu_badge_current")}</span>
            <time>{t("edu_date1")}</time>
            <h3>{t("edu_title1")}</h3>
            <p className="edu-degree">{t("edu_subtitle1")}</p>
            <p className="edu-desc">{t("edu_desc1")}</p>
          </div>
          <div className="edu-card">
            <span className="edu-badge distinction">{t("edu_badge_distinction")}</span>
            <time>{t("edu_date2")}</time>
            <h3>{t("edu_title2")}</h3>
            <p className="edu-degree">{t("edu_subtitle2")}</p>
            <div className="grade-badge">
              <strong>97.2</strong>
              <small>{t("edu_grade")}</small>
            </div>
            <p className="edu-desc">{t("edu_desc2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
