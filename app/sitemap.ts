import type { MetadataRoute } from "next";
import { HREFLANG, LOCALES } from "@/lib/i18n";
import { site, SERVICE_SLUGS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...SERVICE_SLUGS.map((s) => `leistungen/${s}/`)];
  return paths.flatMap((p) =>
    LOCALES.map((l) => ({
      url: `${site.url}/${l}/${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? (l === "de" ? 1 : 0.8) : 0.7,
      alternates: { languages: Object.fromEntries(LOCALES.map((x) => [HREFLANG[x], `${site.url}/${x}/${p}`])) },
    })),
  );
}
