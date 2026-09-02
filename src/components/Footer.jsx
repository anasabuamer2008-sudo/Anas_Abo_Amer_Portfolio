import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [time, setTime] = useState("");

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
      </div>
    </footer>
  );
}
