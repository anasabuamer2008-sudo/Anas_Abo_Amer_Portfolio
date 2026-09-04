// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SectionFX from "./motion/SectionFX";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="section section--alt">
      <SectionFX variant="testimonials" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-num">05</span>
          <span>{t("test_title")}</span>
        </motion.div>

        <motion.div
          className="testimonial"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="test-quote-mark">
            <Quote size={96} />
          </div>
          <p className="test-text">{t("test1_text")}</p>
          <motion.div
            className="test-author"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="author-avatar">AZ</div>
            <div>
              <cite>{t("test1_author")}</cite>
              <span>{t("test1_role")}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
