// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useRef } from "react";
import { animate, cubicBezier } from "animejs";

export default function CountTo({ value, decimals = 0, duration = 1500, className }) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (v) => {
      if (decimals > 0) return v.toFixed(decimals);
      return Math.round(v).toString();
    };

    const run = () => {
      if (started.current) return;
      started.current = true;
      animate(
        { val: 0 },
        {
          val: value,
          duration,
          ease: cubicBezier(0.22, 1, 0.36, 1),
          onUpdate: (self) => {
            el.textContent = format(value * self.progress);
          },
        }
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run();
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
