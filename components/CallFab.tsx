"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { site } from "@/lib/site";
import { Phone } from "./Icons";

/** Sticky call button on small screens – appears after the first screen. */
export default function CallFab({ label }: { label: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 420));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.phoneHref}
          className="fab"
          aria-label={`${label}: ${site.phone}`}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <Phone />
          <span>{label}</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
