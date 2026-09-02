import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-label">
          <span className="label-num">01</span>
          <span>{t("about_title")}</span>
        </div>
        <div className="about-grid">
          <div>
            <p className="about-lead">{t("about_text")}</p>
            <p className="about-body">{t("about_text2")}</p>
            <div className="value-chips">
              <span className="chip">{t("value_empathy")}</span>
              <span className="chip">{t("value_leadership")}</span>
              <span className="chip">{t("value_perseverance")}</span>
              <span className="chip">{t("value_inclusion")}</span>
            </div>
          </div>
          <div className="quote-card">
            <span className="quote-label">{t("why_medicine_title")}</span>
            <blockquote>{t("why_medicine_text")}</blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
