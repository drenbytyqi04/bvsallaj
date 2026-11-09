"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const stagger = (delay = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

/** Fades + slides its content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: x ? 0 : 32, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading block with staggered children. */
export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <motion.header
      className="section__head"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p className="eyebrow" variants={fadeUp}>
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
      {children && <motion.div variants={fadeUp}>{children}</motion.div>}
    </motion.header>
  );
}
