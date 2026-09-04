// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin, Copy, Check, Send, Share2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useHaptic } from "../hooks/useHaptic";
import { Reveal, Stagger } from "./motion/Reveal";
import SectionFX from "./motion/SectionFX";

export default function Contact({ showToast }) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const vibrate = useHaptic(12);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    if (!form.message.trim()) newErrors.message = "Required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    vibrate(15);
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name.trim()}`);
    const body = encodeURIComponent(`Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`);
    window.location.href = `mailto:anasabuamer2008@gmail.com?subject=${subject}&body=${body}`;
    const msg = lang === "ar" ? "جاري فتح البريد..." : lang === "he" ? 'פותח דוא"ל...' : "Opening email client...";
    showToast(msg);
  };

  const handleCopy = useCallback(() => {
    const email = "anasabuamer2008@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      vibrate(20);
      showToast(`${t("copied")} ${email}`);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [t, showToast, vibrate]);

  const handleContactShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Anas Abu Amer", text: t("contact_share") || "", url: window.location.href });
    }
  };

  const channels = [
    {
      icon: Mail,
      label: t("contact_email_label"),
      body: (
        <>
          <a href="mailto:anasabuamer2008@gmail.com">anasabuamer2008@gmail.com</a>
          <button className={`copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
            {copied ? <Check size={11} /> : <Copy size={11} />}
            <span>{copied ? t("copied") : t("copy")}</span>
          </button>
        </>
      ),
    },
    {
      icon: Phone,
      label: t("contact_phone_label"),
      body: <p>050-214-2663</p>,
    },
    {
      icon: MessageCircle,
      label: t("contact_whatsapp_label"),
      whatsapp: true,
      body: (
        <a
          href="https://wa.me/972502142663"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="ch-whatsapp-link"
        >
          050-214-2663
        </a>
      ),
    },
    {
      icon: MapPin,
      label: t("contact_location_label"),
      body: <p>{t("contact_location")}</p>,
    },
  ];

  return (
    <section id="contact" className="section">
      <SectionFX variant="contact" />
      <div className="container">
        <Reveal as="div" className="section-label">
          <span className="label-num">06</span>
          <span>{t("contact_title")}</span>
        </Reveal>

        <div className="contact-grid">
          <Stagger container="div" item="div" className="contact-channels" amount={0.2}>
            {(Item) =>
              channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <Item key={ch.label + (ch.whatsapp ? "-wa" : "")} className={`ch-card${ch.whatsapp ? " ch-card--wa" : ""}`}>
                    <div className={`ch-icon${ch.whatsapp ? " ch-icon--whatsapp" : ""}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4>{ch.label}</h4>
                      {ch.body}
                    </div>
                  </Item>
                );
              })
            }
          </Stagger>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">{t("form_name")}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className={errors.name ? "error" : ""}
                />
                <span className="form-err">{errors.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">{t("form_email")}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  inputMode="email"
                  className={errors.email ? "error" : ""}
                />
                <span className="form-err">{errors.email}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">{t("form_message")}</label>
              <textarea
                id="contact-message"
                name="message"
                rows={isMobile ? 6 : 5}
                value={form.message}
                onChange={handleChange}
                autoComplete="off"
                className={errors.message ? "error" : ""}
              />
              <span className="form-err">{errors.message}</span>
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary btn-full contact-submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={15} />
              {t("form_submit")}
            </motion.button>
            {navigator.share && (
              <motion.button
                type="button"
                className="btn btn-outline btn-full contact-share"
                onClick={handleContactShare}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 size={15} />
                {t("form_share")}
              </motion.button>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
