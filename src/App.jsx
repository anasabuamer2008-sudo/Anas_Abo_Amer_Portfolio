import { useState, useCallback, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Profile card tilt (desktop only)
  useEffect(() => {
    const card = document.querySelector(".profile-card");
    if (!card || !window.matchMedia("(hover: hover)").matches) return;

    const handleMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };
    const handleLeave = () => {
      card.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      <Navbar scrollTo={scrollTo} />
      <main id="main">
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Testimonials />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      <ToastBox toasts={toasts} />
    </>
  );
}
