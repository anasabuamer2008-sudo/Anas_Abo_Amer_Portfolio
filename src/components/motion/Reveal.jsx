// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { motion } from "motion/react";

export function Reveal({
  as,
  children,
  delay = 0,
  y = 36,
  once = true,
  amount = 0.2,
  className,
  ...rest
}) {
  const Tag = motion[as || "div"];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  container,
  item,
  children,
  delayChild = 0.08,
  y = 24,
  once = true,
  amount = 0.2,
  className,
  ...rest
}) {
  const list = { hidden: {}, show: { transition: { staggerChildren: delayChild } } };
  const itemAnim = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  const C = motion[container];
  const I = motion[item];
  return (
    <C
      className={className}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...rest}
    >
      {children(I, itemAnim)}
    </C>
  );
}
