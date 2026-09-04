// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useRef } from "react";

/**
 * DnaScrollRail — a fixed vertical DNA helix on the page edge that advances with
 * scrolling. Each nucleotide (base-pair rung) "lights up" as you pass sections.
 */
export default function DnaScrollRail() {
  const shellRef = useRef(null);
  const strandRef = useRef(null);
  const markerRef = useRef(null);
  const rungRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return; // hidden on touch

    const strand = strandRef.current;
    const marker = markerRef.current;
    const rungs = rungRefs.current;
    if (!strand || !marker) return;

    // DNA geometry
    const W = 60;
    const H = 360;
    const amp = 17;
    const N = 8;
    const cy = (i) => 12 + (i / (N - 1)) * (H - 24);
    const sx1 = (i) => W / 2 + amp * Math.sin((i / (N - 1)) * Math.PI * 4);
    const sx2 = (i) => W / 2 + amp * Math.sin((i / (N - 1)) * Math.PI * 4 + Math.PI);

    // Build helix once
    const ns = "http://www.w3.org/2000/svg";
    let s1 = "";
    let s2 = "";
    for (let i = 0; i <= N * 4; i++) {
      const t = i / (N * 4);
      const y = 12 + t * (H - 24);
      s1 += `${(W / 2 + amp * Math.sin(t * Math.PI * 4)).toFixed(1)},${y.toFixed(1)} `;
      s2 += `${(W / 2 + amp * Math.sin(t * Math.PI * 4 + Math.PI)).toFixed(1)},${y.toFixed(1)} `;
    }
    strand.setAttribute("points", s1.trim());
    const strandB = strand.parentElement.querySelector(".dna-rail-b");
    if (strandB) strandB.setAttribute("points", s2.trim());

    // Base-pair rungs
    for (let i = 0; i < N; i++) {
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", sx1(i).toFixed(1));
      line.setAttribute("y1", cy(i).toFixed(1));
      line.setAttribute("x2", sx2(i).toFixed(1));
      line.setAttribute("y2", cy(i).toFixed(1));
      line.classList.add("dna-rail-rung");
      line.dataset.idx = i;
      strand.parentElement.appendChild(line);
      rungs.push(line);
    }

    let raf;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (!reduced) {
        strand.setAttribute("transform", `rotate(${(-30 + p * 60).toFixed(1)} ${W / 2} ${H / 2})`);
      }
      const lit = Math.round(p * N);
      rungs.forEach((r) => {
        const active = Number(r.dataset.idx) < lit;
        r.classList.toggle("lit", active);
      });
      const my = 12 + p * (H - 24);
      marker.setAttribute("cy", my.toFixed(1));
      marker.setAttribute("opacity", "1");

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="dna-rail" ref={shellRef} aria-hidden="true">
      <svg className="dna-rail-svg" viewBox="0 0 60 360" preserveAspectRatio="xMidYMid meet">
        <polyline className="dna-rail-strand dna-rail-a" ref={strandRef} />
        <polyline className="dna-rail-strand dna-rail-b" />
        <circle className="dna-rail-marker" ref={markerRef} cx="30" r="3.4" />
      </svg>
    </div>
  );
}
