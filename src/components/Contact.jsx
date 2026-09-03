import { useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useHaptic } from "../hooks/useHaptic";

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

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-label">
          <span className="label-num">06</span>
          <span>{t("contact_title")}</span>
        </div>
        <div className="contact-grid">
          <div className="contact-channels">
            <div className="ch-card">
              <div className="ch-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4>{t("contact_email_label")}</h4>
                <a href="mailto:anasabuamer2008@gmail.com">anasabuamer2008@gmail.com</a>
                <button className={`copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
                  <span>{copied ? t("copied") : t("copy")}</span>
                </button>
              </div>
            </div>
            <div className="ch-card">
              <div className="ch-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4>{t("contact_phone_label")}</h4>
                <p>050-214-2663</p>
              </div>
            </div>
            <div className="ch-card">
              <div className="ch-icon ch-icon--whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h4>{t("contact_whatsapp_label")}</h4>
                <a
                  href="https://wa.me/972502142663"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="ch-whatsapp-link"
                >
                  050-214-2663
                </a>
              </div>
            </div>
            <div className="ch-card">
              <div className="ch-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>{t("contact_location_label")}</h4>
                <p>{t("contact_location")}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary btn-full contact-submit">
              {t("form_submit")}
            </button>
            {navigator.share && (
              <button type="button" className="btn btn-outline btn-full contact-share" onClick={handleContactShare}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                {t("form_share")}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
