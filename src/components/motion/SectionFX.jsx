// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/**
 * SectionFX — professional, biology-themed animated backgrounds (light/dark, RTL, responsive).
 * Each section gets a scientifically meaningful motif:
 *  - hero        : luminous DNA double helix + soft cell halos
 *  - about       : clustered cells with nuclei (breathing)
 *  - skills      : atomic orbital model (nucleus + orbiting electrons)
 *  - education   : dotted lab grid + horizontal DNA strand
 *  - experience  : neural/synaptic network with traveling pulses
 *  - testimonials: radiant membrane bokeh
 *  - contact     : cell-signaling concentric pulses
 *  - footer      : horizontal DNA rung line
 */
export default function SectionFX({ variant }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Breathing cells
      gsap.utils.toArray(".fx-cell").forEach((c, i) => {
        gsap.to(c, {
          scale: () => gsap.utils.random(1.05, 1.18),
          y: () => gsap.utils.random(-8, 6),
          x: () => gsap.utils.random(-10, 10),
          duration: () => gsap.utils.random(6, 10),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.6,
        });
      });
      // Nucleus subtle pulse inside cells
      gsap.utils.toArray(".fx-nucleus").forEach((n, i) => {
        gsap.to(n, {
          opacity: () => gsap.utils.random(0.4, 0.8),
          scale: () => gsap.utils.random(0.9, 1.15),
          duration: () => gsap.utils.random(4, 7),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });
      // Orbiting electrons
      gsap.utils.toArray(".fx-electron").forEach((e, i) => {
        gsap.to(e, {
          rotation: 360,
          transformOrigin: "center",
          duration: () => gsap.utils.random(7, 12),
          ease: "none",
          repeat: -1,
          delay: i * 0.5,
        });
      });
      // DNA helix gentle sway + vertical drift
      const dna = el.querySelector(".fx-dna");
      if (dna) {
        gsap.to(dna, {
          y: -14,
          rotation: 2.5,
          duration: 13,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        const highlight = el.querySelector(".fx-dna-light");
        if (highlight) {
          gsap.to(highlight, {
            cy: 92,
            opacity: 0.2,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }
      // Neural network: pulse traveling along links
      gsap.utils.toArray(".fx-link").forEach((l) => {
        const set = l.getAttribute("data-dash") || "6 6";
        gsap.fromTo(
          l,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -40,
            duration: () => gsap.utils.random(2.5, 4),
            ease: "none",
            repeat: -1,
          }
        );
      });
      gsap.utils.toArray(".fx-node").forEach((n, i) => {
        gsap.to(n, {
          opacity: () => gsap.utils.random(0.5, 1),
          r: () => gsap.utils.random(2, 4),
          duration: () => gsap.utils.random(2, 5),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
      // Cell-signaling rings expanding outward (contact)
      gsap.utils.toArray(".fx-signal").forEach((s, i) => {
        gsap.fromTo(
          s,
          { r: 6, opacity: 0.6 },
          {
            r: () => 150 + i * 60,
            opacity: 0,
            duration: () => gsap.utils.random(4, 7),
            ease: "power1.out",
            repeat: -1,
            delay: i * 1.4,
            repeatDelay: 0.8,
          }
        );
      });
      // Horizontal DNA (education / footer) drift
      gsap.utils.toArray(".fx-dna-h").forEach((d, i) => {
        gsap.to(d, {
          xPercent: i % 2 ? -6 : 6,
          duration: () => gsap.utils.random(14, 20),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      // Bokeh membranes
      gsap.utils.toArray(".fx-bokeh").forEach((b, i) => {
        gsap.to(b, {
          y: () => gsap.utils.random(-24, 24),
          x: () => gsap.utils.random(-18, 18),
          opacity: () => gsap.utils.random(0.06, 0.16),
          duration: () => gsap.utils.random(9, 14),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5,
        });
      });
      // Background halos
      gsap.utils.toArray(".fx-halo").forEach((h, i) => {
        gsap.to(h, {
          scale: () => gsap.utils.random(1.05, 1.22),
          opacity: () => gsap.utils.random(0.12, 0.3),
          duration: () => gsap.utils.random(10, 16),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`sfx sfx-${variant}`} ref={rootRef} aria-hidden="true">
      {variant === "hero" && (
        <>
          <Halo className="fx-halo" style={{ animationDelay: "0s" }} />
          <div className="fx-blob fx-blob-1" />
          <div className="fx-blob fx-blob-2" />
          <DnaHelix />
        </>
      )}
      {variant === "about" && <CellCluster count={6} />}
      {variant === "skills" && <Orbits />}
      {variant === "education" && (
        <>
          <div className="fx-grid fx-grid-dots" />
          <HorizontalDna small />
        </>
      )}
      {variant === "experience" && <NeuralNet />}
      {variant === "testimonials" && <Bokeh count={6} />}
      {variant === "contact" && <SignalRings />}
      {variant === "footer" && <HorizontalDna />}
    </div>
  );
}

function Halo({ className, style }) {
  return <span className={`fx-halo ${className || ""}`} style={style} />;
}

/* ── Hero: elegant DNA double helix ── */
function DnaHelix() {
  const W = 320;
  const H = 430;
  const amp = 34;
  const steps = 40;
  const freq = 4.2;
  const pulseColor = "var(--accent)";

  const points = useMemo(() => {
    const a = [];
    const b = [];
    const rungs = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = 14 + t * (H - 28);
      const x = W / 2 + amp * Math.sin(freq * t * Math.PI * 2);
      a.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      const xb = W / 2 + amp * Math.sin(freq * t * Math.PI * 2 + Math.PI);
      b.push(`${xb.toFixed(1)},${y.toFixed(1)}`);
      if (i % 3 === 0) {
        rungs.push(
          <line key={i} x1={x.toFixed(1)} y1={y.toFixed(1)} x2={xb.toFixed(1)} y2={y.toFixed(1)} className="fx-rung" />
        );
      }
    }
    return { a: a.join(" "), b: b.join(" "), rungs };
  }, []);

  return (
    <svg
      className="fx-dna"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="fxDnaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary-2)" stopOpacity="0.55" />
          <stop offset="1" stopColor={pulseColor} stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="fxDnaLight">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {points.rungs}
      <polyline points={points.a} className="fx-strand fx-strand-a" stroke="url(#fxDnaGrad)" />
      <polyline points={points.b} className="fx-strand fx-strand-b" stroke="url(#fxDnaGrad)" />
      <circle className="fx-dna-light" cx={W / 2} cy={14} r={30} fill="url(#fxDnaLight)" />
    </svg>
  );
}

/* ── About: clustered cells with nuclei ── */
function CellCluster({ count }) {
  const seeds = [
    { x: 8, y: 18, r: 34 }, { x: 30, y: 52, r: 24 }, { x: 60, y: 30, r: 40 },
    { x: 78, y: 66, r: 28 }, { x: 48, y: 74, r: 20 }, { x: 14, y: 80, r: 26 },
  ];
  return (
    <svg className="fx-cells" viewBox="0 0 100 100" preserveAspectRatio="none">
      {seeds.slice(0, count).map((s, i) => (
        <g key={i} className="fx-cell" style={{ transformOrigin: `${s.x}% ${s.y}%` }}>
          <circle cx={s.x} cy={s.y} r={s.r} className="fx-cell-mem" />
          <circle cx={s.x} cy={s.y} r={s.r * 0.34} className="fx-nucleus" />
        </g>
      ))}
    </svg>
  );
}

/* ── Skills: atomic orbital model ── */
function Orbits() {
  const rings = [
    { r: 30, ell: 2 }, { r: 48, ell: 3 }, { r: 66, ell: 4 },
  ];
  return (
    <svg className="fx-orbits" viewBox="0 0 160 160" fill="none" preserveAspectRatio="xMidYMid meet">
      <circle cx="80" cy="80" r="16" className="fx-orb-nucleus" />
      {rings.map((ring, i) => (
        <g key={i}>
          <ellipse cx="80" cy="80" rx={ring.r} ry={ring.r * 0.4} className="fx-orb-ring" />
          <g className="fx-electron" style={{ transformOrigin: "80px 80px" }}>
            <circle cx={80} cy={80 - ring.r} r={4} className="fx-orb-pt" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ── Experience: neural / synaptic network ── */
function NeuralNet() {
  const nodes = [
    [14, 30], [36, 12], [62, 26], [86, 10], [12, 62], [34, 84], [64, 66], [88, 84], [50, 48],
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [6, 7], [2, 6], [4, 8], [8, 2],
  ];
  return (
    <svg className="fx-neural" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          className="fx-link"
          strokeDasharray="3 5"
          data-dash="3 5"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" className="fx-node" />
      ))}
    </svg>
  );
}

/* ── Contact: cell-signaling concentric pulses ── */
function SignalRings() {
  const [cx, cy] = [50, 50];
  return (
    <svg className="fx-signals" viewBox="0 0 100 100" fill="none">
      <circle cx={cx} cy={cy} r={6} className="fx-signal-core" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={cx} cy={cy} r={6} className="fx-signal" />
      ))}
    </svg>
  );
}

/* ── Education / Footer: horizontal DNA strand ── */
function HorizontalDna({ small }) {
  const W = 900;
  const H = small ? 60 : 90;
  const amp = small ? 10 : 20;
  const steps = 60;
  const freq = 6;

  const points = useMemo(() => {
    const a = [];
    const b = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t * W;
      const y = H / 2 + amp * Math.sin(freq * t * Math.PI * 2);
      a.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      const yb = H / 2 + amp * Math.sin(freq * t * Math.PI * 2 + Math.PI);
      b.push(`${x.toFixed(1)},${yb.toFixed(1)}`);
    }
    return { a: a.join(" "), b: b.join(" ") };
  }, [W, H, amp, freq]);

  return (
    <svg className="fx-dna-h" viewBox={`0 0 ${W} ${H}`} fill="none" preserveAspectRatio="xMidYMid meet">
      <polyline points={points.a} className="fx-strand fx-strand-a" />
      <polyline points={points.b} className="fx-strand fx-strand-b" />
    </svg>
  );
}

/* ── Testimonials: radiant membrane bokeh ── */
function Bokeh({ count }) {
  const spots = [
    [12, 20, 60], [78, 16, 44], [30, 78, 70], [86, 68, 56], [55, 40, 34], [8, 82, 40],
  ];
  return (
    <>
      {spots.slice(0, count).map(([x, y, s], i) => (
        <span
          key={i}
          className="fx-bokeh"
          style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
        />
      ))}
    </>
  );
}
