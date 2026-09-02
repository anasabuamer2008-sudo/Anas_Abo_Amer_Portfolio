import { useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact({ showToast }) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

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
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name.trim()}`);
    const body = encodeURIComponent(`Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`);
    window.location.href = `mailto:anasabuamer2008@gmail.com?subject=${subject}&body=${body}`;
    const msg = lang === "ar" ? "جاري فتح البريد..." : lang === "he" ? 'פותח דוא"ל...' : "Opening email client...";
    showToast(msg);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("anasabuamer2008@gmail.com").then(() => {
      setCopied(true);
      showToast(`${t("copied")} anasabuamer2008@gmail.com`);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [t, showToast]);

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
                <label>{t("form_name")}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                <span className="form-err">{errors.name}</span>
              </div>
              <div className="form-group">
                <label>{t("form_email")}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                <span className="form-err">{errors.email}</span>
              </div>
            </div>
            <div className="form-group">
              <label>{t("form_message")}</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
              />
              <span className="form-err">{errors.message}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              {t("form_submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
