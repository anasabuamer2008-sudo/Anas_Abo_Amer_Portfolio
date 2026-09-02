import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  const [openCard, setOpenCard] = useState(null);

  const toggle = (key) => setOpenCard((prev) => (prev === key ? null : key));

  const ChevronIcon = ({ isOpen }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tl-chevron${isOpen ? " open" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const DetailPanel = ({ prefix }) => {
    const responsibilities = t(`${prefix}_responsibilities`);
    const skills = t(`${prefix}_skills_acquired`);
    const gave = t(`${prefix}_gave`);
    const received = t(`${prefix}_received`);
    const about = t(`${prefix}_about`);
    const role = t(`${prefix}_role`);

    const hasResp = Array.isArray(responsibilities) && responsibilities.length > 0;
    const hasSkills = Array.isArray(skills) && skills.length > 0;

    return (
      <div className="tl-expand-content">
        {role && <p className="tl-role">{role}</p>}
        {about && <p className="tl-about">{about}</p>}

        <div className="tl-detail-grid">
          {hasResp && (
            <div className="tl-detail-card">
              <div className="tl-detail-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h4>Responsibilities</h4>
              <ul>
                {responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {hasSkills && (
            <div className="tl-detail-card">
              <div className="tl-detail-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h4>Skills Acquired</h4>
              <ul>
                {skills.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(gave || received) && (
          <div className="tl-gr-row">
            {gave && (
              <div className="tl-gr-card tl-gr-gave">
                <h4>What I Gave</h4>
                <p>{gave}</p>
              </div>
            )}
            {received && (
              <div className="tl-gr-card tl-gr-received">
                <h4>What I Received</h4>
                <p>{received}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="experience" className="section section--dark">
      <div className="container">
        <div className="section-label">
          <span className="label-num">04</span>
          <span>{t("exp_title")}</span>
        </div>
        <div className="timeline">
          <div className="timeline-track" />

          <div className="tl-item">
            <div className="tl-dot active" />
            <div className="tl-body">
              <span className="tl-badge">{t("exp_badge_active")}</span>
              <h3>{t("exp1_title")}</h3>
              <time>{t("exp1_period")}</time>
              <p>{t("exp1_desc")}</p>
            </div>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className={`tl-body tl-body--expandable${openCard === "exp2" ? " expanded" : ""}`}>
              <span className="tl-badge tl-badge--volunteer">{t("exp_badge_volunteer")}</span>
              <button className="tl-expand-trigger" onClick={() => toggle("exp2")} aria-expanded={openCard === "exp2"}>
                <div>
                  <h3>{t("exp2_title")}</h3>
                  <time>{t("exp2_period")}</time>
                </div>
                <ChevronIcon isOpen={openCard === "exp2"} />
              </button>
              <div className="tl-quote">{t("exp2_quote")}</div>
              <div className={`tl-expand-wrapper${openCard === "exp2" ? " open" : ""}`}>
                <DetailPanel prefix="exp2" />
              </div>
            </div>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className={`tl-body tl-body--expandable${openCard === "exp3" ? " expanded" : ""}`}>
              <span className="tl-badge tl-badge--volunteer">{t("exp_badge_volunteer")}</span>
              <button className="tl-expand-trigger" onClick={() => toggle("exp3")} aria-expanded={openCard === "exp3"}>
                <div>
                  <h3>{t("exp3_title")}</h3>
                  <time>{t("exp3_period")}</time>
                </div>
                <ChevronIcon isOpen={openCard === "exp3"} />
              </button>
              <div className={`tl-expand-wrapper${openCard === "exp3" ? " open" : ""}`}>
                <DetailPanel prefix="exp3" />
              </div>
            </div>
          </div>

          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-body">
              <h3>{t("exp4_title")}</h3>
              <time>{t("exp4_period")}</time>
              <p>{t("exp4_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
