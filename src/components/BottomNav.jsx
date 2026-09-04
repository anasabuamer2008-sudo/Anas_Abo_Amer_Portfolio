// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useLanguage } from "../context/LanguageContext";
import { useLenis } from "../hooks/useLenis";

const ITEMS = [
  { key: "nav_about", id: "about", icon: "M3 11l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" },
  { key: "nav_skills", id: "skills", icon: "M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.6h7.6z" },
  { key: "nav_education", id: "education", icon: "M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 2 6 2s6-1 6-2v-5" },
  { key: "nav_experience", id: "experience", icon: "M9 21h6M12 17v4M7 4h10v4a5 5 0 0 1-10 0z" },
  { key: "nav_contact", id: "contact", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" },
];

export default function BottomNav() {
  const { t } = useLanguage();
  const { scrollTo } = useLenis();

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (navigator.vibrate) navigator.vibrate(10);
    scrollTo(el, { offset: -80 });
  };

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className="bottom-nav-item"
          onClick={() => handleNav(item.id)}
          aria-label={t(item.key)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={item.icon} />
          </svg>
          <span className="bn-label">{t(item.key)}</span>
        </button>
      ))}
    </nav>
  );
}
