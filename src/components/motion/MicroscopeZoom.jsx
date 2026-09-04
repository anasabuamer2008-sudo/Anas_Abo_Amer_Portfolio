// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useRef, useState } from "react";

/**
 * MicroscopeZoom — wraps an image and magnifies it through a circular "lens"
 * that follows the cursor (like viewing a specimen under a microscope).
 * Only activates on fine (mouse) pointers; ignored on touch.
 */
export default function MicroscopeZoom({
  src,
  alt = "",
  zoom = 2.4,
  lensSize = 132,
  className = "",
}) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dim, setDim] = useState({ w: 1, h: 1 });
  const enabled = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const enter = () => {
    const el = wrapRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setDim({ w: r.width, h: r.height });
    }
    setActive(true);
  };
  const move = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const leave = () => setActive(false);

  const scale = zoom; // magnifier scale
  const bgSize = `${dim.w * scale}px ${dim.h * scale}px`;
  const bgPos = `${-(pos.x * scale - lensSize / 2)}px ${-(pos.y * scale - lensSize / 2)}px`;

  return (
    <div
      ref={wrapRef}
      className={`microscope-zoom${className ? ` ${className}` : ""}`}
      onMouseEnter={enabled ? enter : undefined}
      onMouseMove={enabled ? move : undefined}
      onMouseLeave={enabled ? leave : undefined}
    >
      <img src={src} alt={alt} className="microscope-zoom-img" />
      {enabled && active && (
        <div
          className="microscope-lens"
          style={{
            width: lensSize,
            height: lensSize,
            left: pos.x,
            top: pos.y,
            backgroundImage: `url("${src}")`,
            backgroundSize: bgSize,
            backgroundPosition: bgPos,
          }}
        />
      )}
    </div>
  );
}
