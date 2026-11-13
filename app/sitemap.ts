import type { MetadataRoute } from "next";
import { HREFLANG, LOCALES } from "@/lib/i18n";
import { CITIES, site, SERVICE_SLUGS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...SERVICE_SLUGS.map((s) => `leistungen/${s}/`), ...CITIES.map((c) => `bodenleger/${c.slug}/`)];
  const lastModified = new Date();
  return paths.flatMap((p) =>
    LOCALES.map((l) => ({
      url: `${site.url}/${l}/${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "" ? (l === "de" ? 1 : 0.8) : 0.7,
      alternates: { languages: Object.fromEntries(LOCALES.map((x) => [HREFLANG[x], `${site.url}/${x}/${p}`])) },
    })),
  );
}
