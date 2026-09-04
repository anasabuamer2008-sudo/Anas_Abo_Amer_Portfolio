// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dividing, setDividing] = useState(false);
  const timer = useRef(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const supports = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supports) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest("a, button, [role='button'], .skill-card-v2, .ch-card, input, textarea");
      setHovering(Boolean(t));
    };
    // Mitosis: click "splits" the cell cursor like a biological cell dividing
    const down = () => {
      setDividing(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDividing(false), 540);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      clearTimeout(timer.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Cell membrane ring */}
      <motion.div
        className={`custom-cursor custom-cursor--ring${dividing ? " is-dividing" : ""}${hovering ? " is-hovering" : ""}`}
        style={{ x: sx, y: sy }}
        animate={
          dividing
            ? { scaleX: 1.35, scaleY: 0.72, opacity: 0.85, borderColor: "var(--accent-2)" }
            : { scaleX: 1, scaleY: 1, opacity: hovering ? 0.3 : 0.65, borderColor: "var(--accent)" }
        }
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Cell nucleus (splits on click) */}
      <motion.div
        className={`custom-cursor custom-cursor--dot${dividing ? " is-dividing" : ""}`}
        style={{ x, y }}
      >
        <span className="cc-nucleus" />
        <span className="cc-nucleus cc-da" />
        <span className="cc-nucleus cc-db" />
      </motion.div>
    </>
  );
}
