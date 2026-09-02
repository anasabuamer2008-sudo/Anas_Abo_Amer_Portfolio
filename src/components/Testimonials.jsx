import { useLanguage } from "../context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="section-label">
          <span className="label-num">05</span>
          <span>{t("test_title")}</span>
        </div>
        <div className="testimonial">
          <div className="test-quote-mark">"</div>
          <p className="test-text">{t("test1_text")}</p>
          <div className="test-author">
            <div className="author-avatar">AZ</div>
            <div>
              <cite>{t("test1_author")}</cite>
              <span>{t("test1_role")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
