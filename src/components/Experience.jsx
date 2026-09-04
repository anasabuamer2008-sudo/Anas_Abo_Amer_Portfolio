// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Pencil, Activity } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./motion/Reveal";
import SectionFX from "./motion/SectionFX";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { t } = useLanguage();
  const [openCard, setOpenCard] = useState(null);
  const sectionRef = useRef(null);

  const toggle = (key) => setOpenCard((prev) => (prev === key ? null : key));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const track = el.querySelector(".timeline-track");
      const dots = el.querySelectorAll(".tl-dot");
      if (track) {
        gsap.fromTo(
          track,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector(".timeline"),
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
        gsap.utils.toArray(".tl-item").forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          });
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

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
      <motion.div
        className="tl-expand-content"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="tl-expand-inner">
          {role && <p className="tl-role">{role}</p>}
          {about && <p className="tl-about">{about}</p>}

          <div className="tl-detail-grid">
            {hasResp && (
              <div className="tl-detail-card">
                <div className="tl-detail-icon">
                  <Pencil size={18} />
                </div>
                <h4>{t("label_responsibilities")}</h4>
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
                  <Activity size={18} />
                </div>
                <h4>{t("label_skills_acquired")}</h4>
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
                  <h4>{t("label_gave")}</h4>
                  <p>{gave}</p>
                </div>
              )}
              {received && (
                <div className="tl-gr-card tl-gr-received">
                  <h4>{t("label_received")}</h4>
                  <p>{received}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const items = [
    { id: "exp1", active: true, volunteer: false, expandable: false },
    { id: "exp2", active: false, volunteer: true, expandable: true, quote: true },
    { id: "exp3", active: false, volunteer: true, expandable: true, quote: false },
    { id: "exp4", active: false, volunteer: false, expandable: false },
  ];

  return (
    <section id="experience" className="section section--dark" ref={sectionRef}>
      <SectionFX variant="experience" />
      <div className="container">
        <Reveal as="div" className="section-label">
          <span className="label-num">04</span>
          <span>{t("exp_title")}</span>
        </Reveal>

        <div className="timeline">
          <div className="timeline-track" />

          {items.map((item) => (
            <div className="tl-item" key={item.id}>
              <div className={`tl-dot${item.active ? " active" : ""}`} />
              <div
                className={`tl-body${item.volunteer ? " tl-body--expandable" : ""}${
                  item.expandable && openCard === item.id ? " expanded" : ""
                }`}
              >
                {item.volunteer && (
                  <span className="tl-badge tl-badge--volunteer">{t("exp_badge_volunteer")}</span>
                )}
                {item.active && <span className="tl-badge">{t("exp_badge_active")}</span>}

                {item.expandable ? (
                  <>
                    <button
                      className="tl-expand-trigger"
                      onClick={() => toggle(item.id)}
                      aria-expanded={openCard === item.id}
                    >
                      <div>
                        <h3>{t(`${item.id}_title`)}</h3>
                        <time>{t(`${item.id}_period`)}</time>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`tl-chevron${openCard === item.id ? " open" : ""}`}
                      />
                    </button>
                    {item.quote && <div className="tl-quote">{t(`${item.id}_quote`)}</div>}
                    <div className={`tl-expand-wrapper${openCard === item.id ? " open" : ""}`}>
                      <AnimatePresence>
                        {openCard === item.id && <DetailPanel prefix={item.id} />}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{t(`${item.id}_title`)}</h3>
                    <time>{t(`${item.id}_period`)}</time>
                    <p>{t(`${item.id}_desc`)}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
