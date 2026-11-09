import fs from "node:fs";
import path from "node:path";
import type { ServiceSlug } from "./site";

export type Tone = "oak" | "tile" | "paint" | "dry" | "linen";

export type Img = {
  src: string;
  width: number;
  height: number;
  /** true once the real photo exists in /public – otherwise a styled placeholder is rendered */
  exists: boolean;
  tone: Tone;
};

/** Build-time check (static export) whether a photo was added to /public. */
function img(src: string, width: number, height: number, tone: Tone): Img {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  return { src, width, height, exists, tone };
}

const SERVICE_TONE: Record<ServiceSlug, Tone> = {
  bodenbelaege: "oak",
  fliesen: "tile",
  malerarbeiten: "paint",
  trockenbau: "dry",
  renovierung: "linen",
};

export const images = {
  hero: () => img("/images/hero.jpg", 1200, 1500, "oak"),
  team: () => img("/images/team.jpg", 1200, 1500, "linen"),
  service: (slug: ServiceSlug) => img(`/images/leistungen/${slug}.jpg`, 1500, 1000, SERVICE_TONE[slug]),
  project: (n: number, tone: Tone) => img(`/images/projekte/projekt-${n}.jpg`, 900, 1200, tone),
  before: () => img("/images/vorher-nachher/vorher.jpg", 1800, 1200, "dry"),
  after: () => img("/images/vorher-nachher/nachher.jpg", 1800, 1200, "oak"),
};
