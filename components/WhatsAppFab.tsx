"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { WhatsappLogo } from "./Icons";

/** Always-visible WhatsApp button (all screen sizes). */
export default function WhatsAppFab({ label, message }: { label: string; message: string }) {
  if (!site.whatsapp) return null;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener"
      className="wa-fab"
      aria-label={label}
      title={label}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        className="wa-fab__ring"
        aria-hidden="true"
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 1.5 }}
      />
      <WhatsappLogo />
      <span className="wa-fab__label">{label}</span>
    </motion.a>
  );
}
