"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (each = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

type RevealProps = { children: ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" | "section" };

/** Fades content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Numbered editorial section heading: "01 — Leistungen" + title. */
export function SectionHead({
  index,
  kicker,
  title,
  lead,
  light = false,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  light?: boolean;
  align?: "left" | "split";
}) {
  return (
    <motion.header
      className={`shead shead--${align}${light ? " shead--light" : ""}`}
      variants={stagger(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p className="kicker" variants={fadeUp}>
        <span className="kicker__num">{index}</span>
        <motion.span
          className="kicker__rule"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease } } }}
        />
        <span>{kicker}</span>
      </motion.p>
      <motion.h2 className="shead__title" variants={fadeUp}>
        {title}
      </motion.h2>
      {lead && (
        <motion.p className="shead__lead" variants={fadeUp}>
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
