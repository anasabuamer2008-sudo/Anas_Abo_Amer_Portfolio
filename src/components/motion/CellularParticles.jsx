// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useRef } from "react";

/**
 * CellularParticles — a canvas of "microorganisms"/cells that drift slowly
 * and swim away from the mouse (microscopic-laboratory feel).
 * Theme-aware (reads --accent / --primary-2), responsive count, honors reduced-motion.
 */
export default function CellularParticles({ count = 26 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let raf;
    let particles = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = coarse ? Math.floor(count * 0.4) : count;
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2.5 + Math.random() * 5,
        nr: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const cssVar = (name) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || "rgba(31,157,107,1)";
    };

    const pulse = (p) => {
      p.vx += (Math.random() - 0.5) * 0.006;
      p.vy += (Math.random() - 0.5) * 0.006;
      // gentle damp toward a max speed
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 0.4) {
        p.vx *= 0.94;
        p.vy *= 0.94;
      }
    };

    const repel = (p) => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      const R = 110;
      if (d < R && d > 0.01) {
        const f = ((R - d) / R) * 0.6;
        p.x += (dx / d) * f;
        p.y += (dy / d) * f;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const accent = cssVar("--accent");
      const navy = cssVar("--primary-2");
      const t = performance.now() / 1000;

      for (const p of particles) {
        if (!reduced) {
          pulse(p);
          repel(p);
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
        const wob = reduced ? 0 : Math.sin(t * 1.2 + p.phase) * 0.4;
        ctx.globalAlpha = 0.5 + Math.sin(t * 1.5 + p.phase) * 0.12;
        // membrane
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        // nucleus
        ctx.beginPath();
        ctx.arc(p.x + wob, p.y - wob * 0.4, p.nr, 0, Math.PI * 2);
        ctx.fillStyle = navy;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    if (reduced) {
      // draw one frame, no loop
      const accent = cssVar("--accent");
      const navy = cssVar("--primary-2");
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.nr, 0, Math.PI * 2);
        ctx.fillStyle = navy;
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="cellular-particles"
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
