import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray(".card-grid").forEach((grid) => {
        gsap.from(grid.children, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray(".tl-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
          delay: i * 0.1,
        });
      });

      const track = document.querySelector(".timeline-track");
      if (track) {
        gsap.from(track, {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 80%",
            once: true,
          },
        });
      }

      gsap.utils.toArray(".edu-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          delay: i * 0.12,
        });
      });

      gsap.utils.toArray(".lang-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
          delay: i * 0.08,
        });
      });

      gsap.from(".testimonial", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial",
          start: "top 85%",
          once: true,
        },
      });

      gsap.utils.toArray(".ch-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
          delay: i * 0.08,
        });
      });

      const progress = document.querySelector(".scroll-progress");
      if (progress) {
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);
}
