// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionFX from "./motion/SectionFX";

export default function Footer() {
  const { t } = useLanguage();
  const [time, setTime] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          `Tel Aviv: ${new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Jerusalem",
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      } catch {
        /* empty */
      }
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <SectionFX variant="footer" />
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">Anas Abu Amer</div>
            <p>{t("footer_tagline")}</p>
          </div>
          <div className="footer-right">
            <div className="footer-time">{time}</div>
            <p className="footer-update">{t("footer_update")}</p>
          </div>
        </div>
        <div className="footer-copy">
          © {year} Anas Abu Amer · Built by{" "}
          <a
            href="https://github.com/AbdullahZaid-ggg"
            target="_blank"
            rel="noopener noreferrer"
          >
            AbdullahZaid-ggg
          </a>
          · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
