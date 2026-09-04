// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useState, useCallback, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import BottomNav from "./components/BottomNav";
import CustomCursor from "./components/motion/CustomCursor";
import DnaScrollRail from "./components/motion/DnaScrollRail";

function ToastBox({ toasts }) {
  return (
    <div className="toast-box">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">{toast.msg}</div>
      ))}
    </div>
  );
}

export default function App() {
  const { scrollTo } = useLenis();
  useScrollReveal();
  const isOnline = useNetworkStatus();
  const { t } = useLanguage();

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Enable custom cursor on precise pointers
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.body.classList.add("has-custom-cursor");
    return () => document.body.classList.remove("has-custom-cursor");
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="offline-banner" role="status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
          </svg>
          {t("offline_text")}
        </div>
      )}
      <Navbar scrollTo={scrollTo} />
      <main id="main" className="no-bottom-nav">
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Testimonials />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      <BackToTop />
      <BottomNav />
      <CustomCursor />
      <DnaScrollRail />
      <ToastBox toasts={toasts} />
    </>
  );
}
