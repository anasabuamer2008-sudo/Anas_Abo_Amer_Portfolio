// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll progress bar + gentle top-level section blur reveal.
// Per-element entrance animations are handled by their components.
export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
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
