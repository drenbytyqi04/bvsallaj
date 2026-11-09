"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Img } from "@/lib/images";
import Photo from "./Photo";

type Props = {
  before: Img;
  after: Img;
  labels: { before: string; after: string; slider: string; pending: string };
};

/** Accessible before/after comparison: native range input drives the clip position. */
export default function BeforeAfter({ before, after, labels }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba" style={{ ["--pos" as string]: `${pos}%` }}>
      <div className="ba__layer">
        <Photo img={after} alt={labels.after} pendingLabel={labels.pending} />
      </div>
      <div className="ba__layer ba__before" aria-hidden="false">
        <Photo img={before} alt={labels.before} pendingLabel={labels.pending} />
      </div>
      <span className="ba__tag ba__tag--l">{labels.before}</span>
      <span className="ba__tag ba__tag--r">{labels.after}</span>
      <div className="ba__handle" aria-hidden="true">
        <motion.span
          className="ba__knob"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: 2, delay: 1 }}
        >
          ‹ ›
        </motion.span>
      </div>
      <input
        className="ba__range"
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={labels.slider}
        aria-valuetext={`${pos}%`}
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  );
}
